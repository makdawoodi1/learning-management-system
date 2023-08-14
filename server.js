import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import "./passport.js";

// Routes
import {
  authRoutes,
  assignmentRoutes,
  courseRoutes,
  discussionRoutes,
  enrollmentRoutes,
  quizRoutes,
  submissionRoutes,
} from "./routes/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const whitelist = ["*"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use("/api/auth/", authRoutes);
app.use("/api/courses/", courseRoutes);
app.use("/api/assignments/", assignmentRoutes);
app.use("/api/enrollments/", enrollmentRoutes);
app.use("/api/quizzes/", quizRoutes);
app.use("/api/discussions/", discussionRoutes);
app.use("/api/submissions/", submissionRoutes);

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => console.log(`Server listening to port ${port}`));
