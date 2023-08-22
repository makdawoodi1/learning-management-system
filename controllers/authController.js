import dotenv from "dotenv";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import {
  forgotPasswordMail,
  resetPassordMail,
  registerUserMail,
} from "../mail/mail.js";
import Stripe from "stripe";
import { createStripeCustomer } from "./utils/stripe.js";
import { createSignToken } from "./utils/jwt-config.js";

dotenv.config();

export const loginRouteHandler = async (req, res, email, password) => {
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
        error: "Credentials don't match any existing users",
      });
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        // Generate JWT token
        const token = createSignToken(req, res, user);

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
          error: "Invalid Credentials",
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

export const registerRouteHandler = async (
  req,
  res,
  username,
  email,
  password,
  role
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
      return res
        .status(400)
        .json({ message: "Email or Username is already in use" });
    }

    // check password to exist and be at least 8 characters long
    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({
          error: { message: "Password must be at least 8 characters long." },
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
        },
      });
    } else {
      // Creating Admin Account
      newUser = await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: hashPassword,
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

    // send mail with defined transport object
    await registerUserMail(email, newUser.username);

    return res.status(200).json({
      token_type: "Bearer",
      expires_in: "24h",
      access_token: token,
      refresh_token: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });

    console.log(error);
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
    if (req.token) {
      jwt.verify(req.token, 'token', (error, authData) => {
        if (error) {
          res.status(403).json({
            success: false,
            message: "Error Authenticating User",
            error: error.message,
          });
          console.log(error)
        }
      })
    }

    const prisma = new PrismaClient();
    let user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // check if user does not exist
    if (user === null) {
      return res.status(400).json({
        error: "The email does not match any existing user.",
      });
    } else {
      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email }, "token", { expiresIn: "1h" }
      );

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
