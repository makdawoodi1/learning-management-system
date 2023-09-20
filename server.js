import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
// import { passport } from "./passport.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import discussionRoutes from "./routes/discussionRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import { PrismaClient } from "@prisma/client";
// import prisma from "./services/prisma.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const PGSession = connectPgSimple(session)

const whitelistIPs = process.env.WHITELIST_IPS.split(', ');
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelistIPs.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// Serve static files (images and CSS)
app.use(express.static('public'));

// Session and Passport
app.use(session({
  store: new PGSession({
    tableName: 'Sesssion'
  }),
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 30 * 24 * 60 * 60 * 1000 }
}))
// app.use(passport.initialize());
// app.use(passport.session());

// Express Configurations
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => { 
//   req.prisma = new PrismaClient();
//   next()
// })
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/discussions", discussionRoutes);
app.use("/api/submissions", submissionRoutes);

app.listen(port, () => console.log(`Server listening to port ${process.env.APP_URL_SERVER}:${port}`));
// app.listen(port, '0.0.0.0', () => { console.log('Server is running on port 8747') });