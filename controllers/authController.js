import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Prisma, PrismaClient } from "@prisma/client";
import {
  forgotPasswordMail,
  resetPassordMail,
  registerUserMail,
} from "../mail/mail.js";
import Stripe from "stripe";
import { createStripeCustomer } from "./utils/stripe.js";
import { 
  createSignToken, 
  createRefreshToken, 
  verifyRefreshToken, 
  evaluateRefreshToken,
  createResetPasswordToken
} from "./utils/jwt-config.js";

dotenv.config();

export const refreshTokenHandler = async (req, res) => {
  try {
    const prisma = new PrismaClient();
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

    const user = await prisma.user.findUnique({
      where: {
        refreshToken: [refreshToken]
      },
    })

    // Detected refresh token reuse!
    if (!user) verifyRefreshToken(req, res, prisma, user.refreshToken)

    const newRefreshTokenArray = user.refreshToken.filter(
      (rt) => rt !== refreshToken
    );

    // evaluate jwt
    evaluateRefreshToken(req, res, prisma, user, newRefreshTokenArray)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected error occured",
      error: error.message,
    });

    console.log(error);
  }
};

export const loginRouteHandler = async (req, res, email, password) => {
  const cookies = req.cookies;
  console.log(`cookie available at login: ${JSON.stringify(cookies)}`);
  try {
    const prisma = new PrismaClient();
    let user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        enrollments: true,
        submissions: true,
        quiz_attempts: true,
        discussion_posts: true,
      },
    });

    //Check If User Exists
    if (user === null) {
      return res.status(400).json({
        message: "Credentials don't match any existing users",
      });
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        // Generate JWT token
        const token = createSignToken(req, res, user);
        const newRefreshToken = createRefreshToken(req, res, user);

        let newRefreshTokenArray = !cookies?.jwt
          ? user.refreshToken
          : user.refreshToken.filter((rt) => rt !== cookies.jwt);

        if (cookies?.jwt) {
          /* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
          const refreshToken = cookies.jwt;
          const foundToken = await prisma.user.findUnique({
            where: {
              refreshToken: [refreshToken],
            },
            select: {
              refreshToken: true,
            },
          });

          // Detected refresh token reuse!
          if (!foundToken) {
            console.log("attempted refresh token reuse at login!");
            // clear out ALL previous refresh tokens
            newRefreshTokenArray = [];
          }

          res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
          });
        }

        // Saving refreshToken with current user
        await prisma.user.update({
          where: { email: user.email },
          data: { refreshToken: [...newRefreshTokenArray, newRefreshToken] },
        });

        // Creates Secure Cookie with refresh token
        res.cookie("jwt", newRefreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 24 * 60 * 60 * 1000,
        });

        return res.json({
          success: true,
          token_type: "Bearer",
          expires_in: process.env.SIGN_EXPIRY,
          access_token: token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            profile_info: user.profile_info,
          },
        });
      } else {
        return res.status(400).json({
          message: "Invalid Credentials",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message,
    });

    console.log(error);
  }
};

export const logoutRouteHandler = async (req, res) => {
  try {
    // On client, also delete the accessToken
    const prisma = new PrismaClient();

    const cookies = req.cookies;
    if (!cookies?.jwt ) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const user = await prisma.user.findUnique({
      where: {
        refreshToken: refreshToken,
      },
      select: {
        refreshToken: true,
      },
    });

    if (user === null) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(204);
    }

    // Delete refreshToken in db
    await prisma.user.update({
      where: { refreshToken: refreshToken },
      data: { refreshToken: [] },
    });

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging out user",
      error: error.message,
    });

    console.log(error);
  }
};

export const registerRouteHandler = async (
  req,
  res,
  username,
  email,
  password,
  role,
  firstname,
  lastname
) => {
  try {
    const prisma = new PrismaClient();
    let newUser = null,
      customer = null;

    let user = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    // check if user already exists
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email or Username is already in use"
      });
    }

    // check password to exist and be at least 8 characters long
    if (!password || password.length < 8) {
      return res.status(500).json({
        success: false,
        message: "Password must be at least 8 characters long."
      });
    }

    // hash password to save in db
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role) {
      // Creating Student Account
      newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashPassword,
          role,
          firstname,
          lastname,
          verified: false,
        },
      });
    } else {
      // Creating Admin Account
      newUser = await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: hashPassword,
          firstname,
          lastname,
          verified: false,
        },
      });
    }

    // // Creating Stripe Account
    // const stripe = new Stripe(process.env.STRIPE_KEY);

    // if (user.stripe_customer_id) {
    //   customer = await stripe.customers.retrieve(user.stripe_customer_id, {
    //     apiKey: process.env.STRIPE_KEY,
    //   });
    // } else
    //   customer = await createStripeCustomer(
    //     res,
    //     firstname,
    //     lastname,
    //     email,
    //     payment_method_id,
    //     link_token,
    //     prisma,
    //     stripe
    //   );

    // Generate JWT token
    const token = createSignToken(req, res, newUser);
    const newRefreshToken = createRefreshToken(req, res, newUser);

    // Saving refreshToken with current user
    await prisma.user.update({
      where: { email: newUser.email },
      data: { refreshToken: [newRefreshToken] },
    });

    // Clears Secure Cookie
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // send mail with defined transport object
    await registerUserMail(email, newUser.username);

    return res.json({
      success: true,
      token_type: "Bearer",
      expires_in: process.env.SIGN_EXPIRY,
      access_token: token,
      refresh_token: newRefreshToken,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        profile_info: newUser.profile_info,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
};

export const updateRouteHandler = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error resetting password",
      error: error.message,
    });

    console.log(error);
  }
};

export const forgotPasswordRouteHandler = async (req, res, email) => {
  try {
    const prisma = new PrismaClient();
    let user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // check if user already exists
    if (user === null) {
      return res.status(400).json({
        message: "The email does not match any existing user.",
      });
    } else {
      // Generate JWT token
      const token = createResetPasswordToken(req, res, user);

      // send mail with defined transport object
      await forgotPasswordMail(email, user.username, token, email);

      return res.status(200).json({
        success: true,
        message: "An email has been sent to you!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error resetting password",
      error: error.message,
    });

    console.log(error);
  }
};

export const resetPasswordRouteHandler = async (
  req,
  res,
  token,
  email,
  password,
  confirm_password
) => {
  try {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user === null) {
      return res.status(400).json({
        error: "The email does not match any existing user.",
      });
    } else {
      // validate password
      if (password.length < 8) {
        return res.status(400).json({
          error: "The password should have at lest 8 characters.",
        });
      }

      if (password !== confirm_password) {
        return res.status(400).json({
          error: "The password and password confirmation must match.",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      await prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          password: hashPassword,
        },
      });

      // send mail with defined transport object
      await resetPassordMail(email);

      return res.status(200).json({
        success: true,
        message: "Password is succesfully reset",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error resetting password",
      error: error.message,
    });

    console.log(error);
  }
};
