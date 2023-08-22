import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== undefined) {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];

      req.token = bearerToken;
      next();
    } else
      return res.status(401).json({
        error: "Bearer Token is not provided",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected error occured",
      error: error.message,
    });
    console.log(error);
  }
};

export const createSignToken = (req, res, user) => {
  return jwt.sign({ id: user.id, email: user.email }, "token", {
    expiresIn: process.env.SIGN_EXPIRY,
  });
};
