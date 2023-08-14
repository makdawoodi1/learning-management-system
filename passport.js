import { ExtractJwt } from "passport-jwt";
import passportJWT from "passport-jwt";
import dotenv from "dotenv";
import passport from "passport";
import { PrismaClient } from "@prisma/client";

const JWTStrategy = passportJWT.Strategy;
const prisma = new PrismaClient();
dotenv.config();

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY,
    },
    async function (jwtPayload, done) {
      return prisma.user
        .findFirstOrThrow({ _id: jwtPayload.id })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);
