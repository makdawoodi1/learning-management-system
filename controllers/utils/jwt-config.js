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

export const verifyRefreshToken = (req, res, prisma, refreshToken) => {
  try {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.sendStatus(403);
        console.log("attempted refresh token reuse!");

        await prisma.user.update({
          where: {
            username: decoded.username,
          },
          data: {
            refreshToken: [],
          },
        });
      }
    );

    return res.sendStatus(403); //Forbidden
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Verifying Refreshing Token",
      error: error.message,
    });

    console.log(error);
  }
};

export const evaluateRefreshToken = async (
  req,
  res,
  prisma,
  user,
  refreshTokenArray
) => {
  try {
    jwt.verify(
      req.cookies.jwt,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          console.log("expired refresh token");
          // Saving refreshToken with current user
          await prisma.user.update({
            where: { email: user.email },
            data: { refreshToken: [...refreshTokenArray] },
          });
        }

        if (err || user.email !== decoded.email) return res.sendStatus(403);

        // Refresh token is still valid
        const accessToken = jwt.sign(
          { id: user.id, email: user.email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
          }
        );

        const newRefreshToken = jwt.sign(
          { id: user.id, email: user.email },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );
        // Saving refreshToken with current user
        await prisma.user.update({
          where: { email: user.email },
          data: { refreshToken: [...refreshTokenArray, newRefreshToken] },
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
          access_token: accessToken,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            profile_info: user.profile_info,
          },
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Evaluating Refreshing Token",
      error: error.message,
    });

    console.log(error);
  }
};

export const createSignToken = (req, res, user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

export const createRefreshToken = (req, res, user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};
