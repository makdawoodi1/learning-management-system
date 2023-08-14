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
        errors: [{ detail: "Credentials don't match any existing users" }],
      });
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, "token", {
          expiresIn: "24h",
        });

        return res.json({
          token_type: "Bearer",
          expires_in: "24h",
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
          errors: [{ detail: "Invalid password" }],
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
    let newUser = null;
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
        .json({ message: "Password must be at least 8 characters long." });
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

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, "token", {
      expiresIn: "24h",
    });

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
    const prisma = new PrismaClient();
    let user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // check if user does not exist
    if (user === null) {
      return res.status(400).json({
        errors: { email: ["The email does not match any existing user."] },
      });
    } else {
      const token = crypto
        .createHash("md5")
        .update(new Date().toISOString())
        .digest("hex");

      // send mail with defined transport object
      await forgotPasswordMail(email, user.username, token, email);

      return res.status(200).json({
        data: "forgot-password",
        attributes: {
          redirect_url: `${process.env.APP_URL_CLIENT}/auth/reset-password`,
          email: email,
        },
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
        errors: { email: ["The email does not match any existing user."] },
      });
    } else {
      // validate password
      if (password.length < 8) {
        return res.status(400).json({
          errors: {
            password: ["The password should have at lest 8 characters."],
          },
        });
      }

      if (password !== confirm_password) {
        return res.status(400).json({
          errors: {
            password: ["The password and password confirmation must match."],
          },
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
        data: "reset-password",
        attributes: {
          redirect_url: `${process.env.APP_URL_CLIENT}/auth/login`,
          email: email,
        },
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
