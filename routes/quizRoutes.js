import express from "express";

import {
    getQuizAttemptsHandler,
    createQuizHandler,
    editQuizHandler,
    deleteQuizHandler,
    createQuizQuestionHandler,
    editQuizQuestionHandler,
    deleteQuizQuestionHandler,
    createQuizAttemptHandler,
    editQuizAttemptHandler,
    deleteQuizAttemptHandler
} from "../controllers/quizController.js"

const router = express.Router();

router.get("/get-user-quiz-attempts", async (req, res, next) => {
    await getQuizAttemptsHandler(req, res);
})

// Quiz Handlers
router.post("/create-quiz", async (req, res, next) => {
    await createQuizHandler(req, res);
});

router.put("/edit-quiz", async (req, res, next) => {
    await editQuizHandler(req, res);
});

router.delete("/delete-quiz", async (req, res, next) => {
    await deleteQuizHandler(req, res);
});

// Quiz Question Handlers
router.post("/create-quiz-question", async (req, res, next) => {
    await createQuizQuestionHandler(req, res);
});

router.put("/edit-quiz-question", async (req, res, next) => {
    await editQuizQuestionHandler(req, res);
});

router.delete("/delete-quiz-question", async (req, res, next) => {
    await deleteQuizQuestionHandler(req, res);
});

// Quiz Attempt Handlers
router.post("/create-quiz-attempt", async (req, res, next) => {
    await createQuizAttemptHandler(req, res);
});

router.put("/edit-quiz-attempt", async (req, res, next) => {
    await editQuizAttemptHandler(req, res);
});

router.delete("/delete-quiz-attempt", async (req, res, next) => {
    await deleteQuizAttemptHandler(req, res);
});


export default router;