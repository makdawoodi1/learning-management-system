import express from "express";
import {
  forgotPasswordRouteHandler,
  fetchUserHandler,
  updateProfilePictureHandler,
  loginRouteHandler,
  logoutRouteHandler,
  refreshTokenHandler,
  registerRouteHandler,
  updateRouteHandler,
  resetPasswordRouteHandler,
} from "../controllers/authController.js";
import {
  presignURLHandler,
  delteObjectHandler
} from "../controllers/utils/userS3.js"
import { verifyToken } from "../controllers/utils/jwt-config.js";

export const router = express.Router();

router.get("/refresh", async (req, res, next) => {
  await refreshTokenHandler(req, res);
});

router.post("/get-presign-url", async (req, res, next) => {
  await presignURLHandler(req, res);
});

router.delete("/delete-object", async (req, res, next) => {
  await delteObjectHandler(req, res);
});

router.get("/fetch-user", async (req, res, next) => {
  await fetchUserHandler(req, res);
})

router.put("/update-profile-picture", async (req, res, next) => {
  const { username, file } = req.body.data.attributes;
  await updateProfilePictureHandler(req, res, username, file);
})

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body.data.attributes;
  await loginRouteHandler(req, res, email, password);
});

router.post("/logout", async (req, res) => {
  await logoutRouteHandler(req, res);
});

router.post("/register", async (req, res) => {
  const { username, email, password, role, firstname, lastname } =
    req.body.data.attributes;
  await registerRouteHandler(
    req,
    res,
    username,
    email,
    password,
    role,
    firstname,
    lastname
  );
});

router.put("/update-user", async (req, res) => {
  const { firstname, lastname, email } = req.body.data.attributes;
  await updateRouteHandler(req, res, firstname, lastname, email);
});

router.post("/forgot-password", async (req, res, next) => {
  const { email } = req.body.data.attributes;
  await forgotPasswordRouteHandler(req, res, email);
});

router.post("/reset-password", async (req, res) => {
  const { email, password, confirm_password } = req.body.data.attributes;
  const { token } = req.params;
  await resetPasswordRouteHandler(
    req,
    res,
    token,
    email,
    password,
    confirm_password
  );
});

export default router;
