import { ExtractJwt } from "passport-jwt";
import passportJWT from "passport-jwt";
import dotenv from "dotenv";
import passport from "passport";
import { PrismaClient } from "@prisma/client";

const JWTStrategy = passportJWT.Strategy;
const prisma = new PrismaClient();
dotenv.config();

// Local Strategy from Auth Bearer Token
passport.use(
  'jwt-bearer',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY,
    },
    async function (jwtPayload, done) {
      return prisma.user
        .findFirstOrThrow({ id: jwtPayload.id })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

// Session Storage for passport
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  return prisma.user
    .findFirstOrThrow({ id: userId })
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      return done(err);
    });
});

// Local Strategy from Query params
passport.use(
  'jwt-query-params',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter("token"),
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

export { passport }