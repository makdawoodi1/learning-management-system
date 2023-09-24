import express from "express";

import {
    createQuizHandler
} from "../controllers/quizController.js"

const router = express.Router();

router.post("/create-quiz", async (req, res, next) => {
    await createQuizHandler(req, res);
});

export default router;