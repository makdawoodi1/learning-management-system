import express from "express";
import {
  forgotPasswordRouteHandler,
  loginRouteHandler,
  registerRouteHandler,
  updateRouteHandler,
  resetPasswordRouteHandler,
} from "../controllers/authController.js";
import { verifyToken } from "../controllers/utils/jwt-config.js";

export const router = express.Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body.data.attributes;
  await loginRouteHandler(req, res, email, password);
});

router.post("/logout", (req, res) => {
  return res.sendStatus(204);
});

router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body.data.attributes;
  await registerRouteHandler(req, res, username, email, password, role);
});

router.post("/update-user", async (req, res) => {
  const { username, email, password, role } = req.body.data.attributes;
  await updateRouteHandler(req, res, username, email, password, role);
});

router.post("/forgot-password", verifyToken, async (req, res, next) => {
  const { email } = req.body.data.attributes;
  await forgotPasswordRouteHandler(req, res, email);
});

router.post("/reset-password", async (req, res) => {
  const { email, password, confirm_password } = req.body.data.attributes;
  const { token } = req.params
  await resetPasswordRouteHandler(req, res, token, email, password, confirm_password);
});

export default router;