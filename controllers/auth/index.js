import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import {
  forgotPasswordMail,
  resetPassordMail,
  registerUserMail,
} from "../../mail/mail.js";

dotenv.config();

export const loginRouteHandler = async (req, res, email, password) => {
  const prisma = new PrismaClient();
  let user = await prisma.user.findUnique({
    where: {
      email: email,
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

      // send mail with defined transport object
      await registerUserMail(email, user.username);

      return res.json({
        token_type: "Bearer",
        expires_in: "24h",
        access_token: token,
        refresh_token: token,
      });
    } else {
      return res.status(400).json({
        errors: [{ detail: "Invalid password" }],
      });
    }
  }
};

export const registerRouteHandler = async (
  req,
  res,
  name,
  email,
  password,
  role
) => {
  const prisma = new PrismaClient();
  let user = await prisma.user.findUnique.findUnique({
    where: {
      email: email,
    },
  });

  // check if user already exists
  if (user) {
    return res.status(400).json({ message: "Email is already in use" });
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
    const newUser = await stripe.customers.create({
      username,
      email,
      password: hashPassword,
      role,
    });
  } else {
    // Creating Admin Account
    const newUser = await stripe.customers.create({
      username,
      email,
      password: hashPassword,
    });
  }

  // Generate JWT token
  const token = jwt.sign({ id: newUser.id, email: newUser.email }, "token", {
    expiresIn: "24h",
  });

  return res.status(200).json({
    token_type: "Bearer",
    expires_in: "24h",
    access_token: token,
    refresh_token: token,
  });
};

export const forgotPasswordRouteHandler = async (req, res) => {
  const { email } = req.body.data.attributes;

  const prisma = new PrismaClient();
  let user = await prisma.user.findUnique({ email: email });

  // check if user does not exist
  if (!user) {
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

    const dataSent = {
      data: "password-forgot",
      attributes: {
        redirect_url: `${process.env.APP_URL_API}/auth/password-reset`,
        email: email,
      },
    };
    return res.status(204).json(dataSent);
  }
};

export const resetPasswordRouteHandler = async (req, res) => {
  const { email, password, password_confirmation } = req.body.data.attributes;
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    email: email,
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

    if (password !== password_confirmation) {
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
    await resetPassordMail(email, token, email);

    const dataSent = {
      data: "reset-password",
      attributes: {
        redirect_url: `${process.env.APP_URL_API}/auth/login`,
        email: email,
      },
    };
    return res.status(204).json(dataSent);
  }
};
