import { PrismaClient } from "@prisma/client";
import {
  getCompletedQuizCountForModules
} from "./courseContentController.js";

// Create Quiz
export const createQuizHandler = async (req, res) => {
  try {
    let {
      moduleID,
      quizTitle,
      quizDescription,
      quizTimer,
      quizTimerOptions,
      quizAttemptNumbers,
      quizPassingMarks,
    } = req.body.data.attributes;
    const prisma = new PrismaClient();

    const newQuiz = await prisma.quiz.create({
      data: {
        title: quizTitle,
        description: quizDescription,
        timer: quizTimer,
        timerOption: quizTimerOptions === "minutes" ? "MINUTES" : "SECONDS",
        attemptNumber: quizAttemptNumbers,
        passingMarks: quizPassingMarks,
        completed: false,
        courseModuleId: moduleID,
      },
    });

    if (newQuiz) {
      return res.json({
        success: true,
        quiz: {
          id: newQuiz.id,
          moduleID: newQuiz.courseModuleId,
          quizTitle: quizTitle,
          quizDescription: quizDescription,
          quizTimer: quizTimer,
          quizTimerOptions: quizTimerOptions,
          quizAttemptNumbers: newQuiz.attemptNumber,
          quizPassingMarks: newQuiz.passingMarks,
          questions: [],
          collapsed: true,
          completed: false,
        },
        message: "The Quiz has been created successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected error occured",
      error: error.message,
    });

    console.log(error);
  }
};

// Edit Quiz
export const editQuizHandler = async (req, res) => {
  try {
    let {
      moduleID,
      quizTitle,
      quizDescription,
      quizTimer,
      quizTimerOptions,
      quizAttemptNumbers,
      quizPassingMarks,
    } = req.body.data.attributes;
    const prisma = new PrismaClient();
    const quizID = req.query.quizID;

    const updatedQuiz = await prisma.quiz.update({
      where: { id: parseInt(quizID), courseModuleId: moduleID },
      data: {
        title: quizTitle,
        description: quizDescription,
        timer: quizTimer,
        timerOption: quizTimerOptions === "minutes" ? "MINUTES" : "SECONDS",
        attemptNumber: quizAttemptNumbers,
        passingMarks: quizPassingMarks,
        completed: false,
        courseModuleId: moduleID,
      },
    });

    if (updatedQuiz) {
      return res.json({
        success: true,
        message: "The Quiz has been updated successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected error occured",
      error: error.message,
    });

    console.log(error);
  }
};

// Delete Quiz
export const deleteQuizHandler = async (req, res) => {
  try {
    const prisma = new PrismaClient();
    const quizID = req.query.quizID;

    const deletedQuiz = await prisma.quiz.delete({
      where: { id: parseInt(quizID) },
    });

    if (deletedQuiz) {
      return res.json({
        success: true,
        message: "The Quiz has been deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected error occured",
      error: error.message,
    });

    console.log(error);
  }
};

// Create QuizQuestion
export const createQuizQuestionHandler = async (req, res) => {
  try {
    let { quizID, question, questionType, options, correctAnswer } =
      req.body.data.attributes;
    const prisma = new PrismaClient();

    const newQuizQuestion = await prisma.quizQuestion.create({
      data: {
        question: question,
        question_type:
          questionType === "true_false"
            ? "TRUE_FALSE"
            : questionType === "single_choice"
            ? "SINGLE_CHOICE"
            : "MULTIPLE_CHOICE",
        correct_answer: !Array.isArray(correctAnswer)
          ? [correctAnswer]
          : correctAnswer,
        quiz_options: options,
        quiz_id: quizID,
      },
    });

    if (newQuizQuestion) {
      return res.json({
        success: true,
        quizQuestion: {
          id: newQuizQuestion.id,
          moduleID: newQuizQuestion.quiz_id,
          question: question,
          questionType: questionType,
          options: options,
          correctAnswer: correctAnswer,
          collapsed: true,
          completed: false,
        },
        message: "The Quiz Question has been created successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected error occured",
      error: error.message,
    });

    console.log(error);
  }
};

// Edit QuizQuestion
export const editQuizQuestionHandler = async (req, res) => {
  try {
    let { quizID, question, questionType, options, correctAnswer } =
      req.body.data.attributes;
    const prisma = new PrismaClient();
    const quizQuestionID = req.query.quizQuestionID;
    const moduleID = req.query.moduleID;

    const updatedQuestion = await prisma.quizQuestion.update({
      where: { id: parseInt(quizQuestionID) },
      data: {
        question: question,
        question_type:
          questionType === "true_false"
            ? "TRUE_FALSE"
            : questionType === "single_choice"
            ? "SINGLE_CHOICE"
            : "MULTIPLE_CHOICE",
        correct_answer: !Array.isArray(correctAnswer)
          ? [correctAnswer]
          : correctAnswer,
        quiz_options: options,
        quiz_id: quizID,
      },
    });

    if (updatedQuestion) {
      return res.json({
        success: true,
        quizQuestion: {
          id: updatedQuestion.id,
          question: updatedQuestion.question,
          questionType: questionType,
          collapsed: true,
          completed: false,
          correctAnswer: correctAnswer,
          moduleID: parseInt(moduleID),
          options: updatedQuestion.quiz_options,
        },
        message: "The Quiz Question has been updated successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected error occured",
      error: error.message,
    });

    console.log(error);
  }
};

// Delete Quiz Question
export const deleteQuizQuestionHandler = async (req, res) => {
  try {
    const prisma = new PrismaClient();
    const quizQuestionID = req.query.quizQuestionID;

    const deletedQuestion = await prisma.quizQuestion.delete({
      where: { id: parseInt(quizQuestionID) },
    });

    if (deletedQuestion) {
      return res.json({
        success: true,
        message: "The Quiz Question has been deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected error occured",
      error: error.message,
    });

    console.log(error);
  }
};

// Create Quiz Attempt
export const createQuizAttemptHandler = async (req, res) => {
  try {
    const { questionsState, quizState, quiz, modules } = req.body.data.attributes;
    const { quizID, moduleID, courseID, username } = req.query;
    const isPassed = quizState.marks;
    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
      where: { username: username }
    })

    const enrolledCourse = await prisma.enrollment.findFirst({
      where: {
        user_id: user.id,
        course_id: parseInt(courseID)
      },
    });

    const newQuizAttempt = await prisma.quizAttempt.create({
      data: {
        progress: JSON.stringify(questionsState),
        quiz_id: parseInt(quizID),
        user_id: user.id,
        enrollment_id: enrolledCourse.id
      },
    });

    if (newQuizAttempt) {
      const updatedModules = modules.map(module => ({
        ...module,
        quizzes: module.quizzes.map(quiz => {
          if (quiz.id === parseInt(quizID)) {
            return { 
              ...quiz, 
              completed: isPassed
            };
          }
          return quiz;
        }),
      }));

      await prisma.enrollment.update({
        where: { id: enrolledCourse.id },
        data: {
          progress: JSON.stringify(updatedModules)
        }
      })

      const quizAttempts = await prisma.quizAttempt.findMany({
        where: { quiz_id: parseInt(quizID), enrollment_id: enrolledCourse.id }
      })
      
      return res.json({
        success: true,
        content: {
          id: quiz.id,
          moduleID: parseInt(moduleID),
          title: quiz.title,
          description: quiz.description,
          timer: quiz.timer,
          timerOptions: quiz.timerOptions,
          attemptNumbers: quiz.attemptNumber,
          passingMarks: quiz.passingMarks,
          questions: quiz.questions,
          completed: isPassed,
          attemptedQuizz: quizAttempts.length
        },
        message: "The Quiz Attempt has been created successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected error occured",
      error: error.message,
    });

    console.log(error);
  }
};

// Edit Quiz Attempt
export const editQuizAttemptHandler = async (req, res) => {
  try {
    let { quizID, question, questionType, options, correctAnswer } =
      req.body.data.attributes;
    const prisma = new PrismaClient();
    const quizQuestionID = req.query.quizQuestionID;
    const moduleID = req.query.moduleID;

    const updatedQuestion = await prisma.quizQuestion.update({
      where: { id: parseInt(quizQuestionID) },
      data: {
        question: question,
        question_type:
          questionType === "true_false"
            ? "TRUE_FALSE"
            : questionType === "single_choice"
            ? "SINGLE_CHOICE"
            : "MULTIPLE_CHOICE",
        correct_answer: !Array.isArray(correctAnswer)
          ? [correctAnswer]
          : correctAnswer,
        quiz_options: options,
        quiz_id: quizID,
      },
    });

    if (updatedQuestion) {
      return res.json({
        success: true,
        quizQuestion: {
          id: updatedQuestion.id,
          question: updatedQuestion.question,
          questionType: questionType,
          collapsed: true,
          completed: false,
          correctAnswer: correctAnswer,
          moduleID: parseInt(moduleID),
          options: updatedQuestion.quiz_options,
        },
        message: "The Quiz Question has been updated successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected error occured",
      error: error.message,
    });

    console.log(error);
  }
};

// Delete Quiz Attempt
export const deleteQuizAttemptHandler = async (req, res) => {
  try {
    const prisma = new PrismaClient();
    const { quizID, courseID, username } = req.query;

    const user = await prisma.user.findUnique({
      where: { username: username }
    })

    const enrolledCourse = await prisma.enrollment.findFirst({
      where: {
        user_id: user.id,
        course_id: parseInt(courseID)
      },
    });

    const modules = enrolledCourse.progress ? JSON.parse(enrolledCourse.progress) : enrolledCourse.course.course_modules;

    const deletedQuizAttempt = await prisma.quizAttempt.deleteMany({
      where: { quiz_id: parseInt(quizID), enrollment_id: enrolledCourse.id },
    });

    if (deletedQuizAttempt) {
      const updatedModules = modules.map(module => ({
        ...module,
        quizzes: module.quizzes.map(quiz => {
          if (quiz.id === parseInt(quizID)) {
            return { 
              ...quiz, 
              completed: false
            };
          }
          return quiz;
        }),
      }));

      await prisma.enrollment.update({
        where: { id: enrolledCourse.id },
        data: {
          progress: JSON.stringify(updatedModules)
        }
      })

      return res.json({
        success: true,
        message: "The Quiz Attempt has been reset successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected error occured",
      error: error.message,
    });

    console.log(error);
  }
};

export const getQuizAttemptsHandler = async (req, res) => {
  try {
    const prisma = new PrismaClient();
    const { username } = req.query;
    let quizAttempts = null;

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      }
    });
    if (!user)
      return res.status(403).json({
        success: false,
        message: "Invalid credentials",
      });

    if (user.role !== 'ADMIN') {
      quizAttempts = await prisma.quizAttempt.findMany({
        where: { user_id: user.id },
        include: {
          quiz: {
            include: {
              quiz_questions: true
            }
          },
          enrollment: {
            include: {
              course: true
            }
          },
          user: true
        }
      })
    } else {
      quizAttempts = await prisma.quizAttempt.findMany({
        include: {
          quiz: {
            include: {
              quiz_questions: true
            }
          },
          enrollment: {
            include: {
              course: true
            }
          },
          user: true
        }
      })
    }

    if (quizAttempts) {
      res.json({
        success: true,
        message: "Quiz Attempt has been fetched successfully!",
        quizAttempts
      });
    } else {
      res.json({
        success: false,
        message: "Lesson content not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected error occured",
      error: error.message,
    });

    console.log(error);
  }
}