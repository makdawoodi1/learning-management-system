import { PrismaClient } from "@prisma/client";

export const getLessonContent = async (req, res, lessonID, moduleID) => {
  try {
    const prisma = new PrismaClient();
    const { username, courseID } = req.query;

    const user = await prisma.user.findUnique({
      where: { username: username }
    })

    const enrolledCourse = await prisma.enrollment.findFirst({
      where: {
        user_id: user.id,
        course_id: parseInt(courseID)
      },
      include: {
        course: {
          include: {
            course_modules: {
              include: {
                module_lessons: true,
                quizzes: true
              }
            }
          }
        }
      }
    });
    const modules = enrolledCourse.progress ? JSON.parse(enrolledCourse.progress) : enrolledCourse.course.course_modules;
    const lessonCompleted = modules
      .map(module => module.module_lessons.find(lesson => lesson.id === parseInt(lessonID)))[0]?.completed;

    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonID,
      },
      include: {
        lesson_files: true,
      },
    });
    if (lesson) {
      // Calculate the count of completed lessons and completed quizzes
      const completedLessonsCount = getCompletedLessonCountForModules(modules);
      const completedQuizCount = getCompletedQuizForUser(modules);

      res.json({
        success: true,
        message: "Lesson content has been fetched successfully!",
        modules,
        totalLessons: modules.reduce((count, module) => {
          return (
            count + (module.module_lessons ? module.module_lessons.length : 0)
          );
        }, 0),
        totalQuizzes: modules.reduce((count, module) => {
          return count + (module.quizzes ? module.quizzes.length : 0);
        }, 0),
        content: {
          id: lesson.id,
          title: lesson.title,
          description: lesson.description,
          content: lesson.content,
          completed: lessonCompleted,
          lessonFiles: lesson.lesson_files,
        },
        completedLessons: completedLessonsCount,
        completedQuizzes: completedQuizCount
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
};

export const handleLessonContent = async (req, res, username, courseID, lessonID) => {
  try {
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

    const lesson = await prisma.lesson.findUnique({
      where: { id: parseInt(lessonID) },
      include: {
        lesson_files: true
      }
    })

    const { modules } = req.body.data.attributes;

    if (enrolledCourse) {
      const updatedModules = modules.map(module => ({
        ...module,
        module_lessons: module.module_lessons.map(lesson => {
          if (lesson.id === lessonID) {
            return { ...lesson, completed: true };
          }
          return lesson;
        }),
      }));
      const completedLessonsCount = getCompletedLessonCountForModules(updatedModules);
      const completedQuizzesCount = getCompletedQuizCountForModules(updatedModules);

      await prisma.enrollment.update({
        where: { id: enrolledCourse.id },
        data: {
          progress: JSON.stringify(updatedModules)
        }
      })

      res.json({
        success: true,
        message: "Quiz content has been fetched successfully!",
        modules: updatedModules,
        completed_lessons: completedLessonsCount,
        completed_quizzes: completedQuizzesCount,
        totalLessons: updatedModules.reduce((count, module) => {
          return (
            count + (module.module_lessons ? module.module_lessons.length : 0)
          );
        }, 0),
        totalQuizzes: updatedModules.reduce((count, module) => {
          return count + (module.quizzes ? module.quizzes.length : 0);
        }, 0),
        content: {
          id: lesson.id,
          title: lesson.title,
          description: lesson.description,
          content: lesson.content,
          completed: true,
          lessonFiles: lesson.lesson_files,
        },
      });
    } else {
      // Handle the case where updatedLesson is not found
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
};

export const getQuizContent = async (req, res, quizID, moduleID) => {
  try {
    const prisma = new PrismaClient();
    const { username, courseID } = req.query;

    const user = await prisma.user.findUnique({
      where: { username: username }
    })

    const enrolledCourse = await prisma.enrollment.findFirst({
      where: {
        user_id: user.id,
        course_id: parseInt(courseID)
      },
      include: {
        course: {
          include: {
            course_modules: {
              include: {
                module_lessons: true,
                quizzes: true
              }
            }
          }
        }
      }
    });

    const modules = enrolledCourse.progress ? JSON.parse(enrolledCourse.progress) : enrolledCourse.course.course_modules;
    const quizCompleted = modules
      .map(module => module.quizzes.find(quiz => quiz.id === parseInt(quizID)))[0]?.completed;

    const quiz = await prisma.quiz.findUnique({
      where: {
        id: quizID,
      },
      include: {
        quiz_questions: true,
      }
    });
    if (quiz) {
      // Calculate the count of completed lessons
      const attemptedQuiz = await prisma.quizAttempt.findMany({
        where: { quiz_id: parseInt(quizID), enrollment_id: enrolledCourse.id }
      });
      const completedLessonsCount = getCompletedLessonCountForModules(modules);
      const completedQuizCount = getCompletedQuizForUser(modules);

      res.json({
        success: true,
        message: "Lesson content has been fetched successfully!",
        modules,
        totalLessons: modules.reduce((count, module) => {
          return (
            count + (module.module_lessons ? module.module_lessons.length : 0)
          );
        }, 0),
        totalQuizzes: modules.reduce((count, module) => {
          return count + (module.quizzes ? module.quizzes.length : 0);
        }, 0),
        completedLessons: completedLessonsCount,
        completedQuizzes: completedQuizCount,
        content: {
          id: quiz.id,
          moduleID: quiz.courseModuleId,
          title: quiz.title,
          description: quiz.description,
          attemptNumbers: quiz.attemptNumber,
          passingMarks: quiz.passingMarks,
          timer: quiz.timer,
          timerOptions: quiz.timerOption === 'MINUTES' ? 'minutes' : 'seconds',
          questions: quiz.quiz_questions,
          completed: quizCompleted,
          attemptedQuizz: attemptedQuiz.length,
        },
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
};

export const handleQuizContent = async (req, res, quizID, moduleID) => {
  try {
    console.log("working getQuizContent");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected error occured",
      error: error.message,
    });

    console.log(error);
  }
};

export const getAssignmentContent = async (
  req,
  res,
  assignmentID,
  moduleID
) => {
  try {
    console.log("working getAssignmentContent");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected error occured",
      error: error.message,
    });

    console.log(error);
  }
};

export const handleAssignmentContent = async (
  req,
  res,
  assignmentID,
  moduleID
) => {
  try {
    console.log("working getAssignmentContent");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected error occured",
      error: error.message,
    });

    console.log(error);
  }
};

export const getCompletedLessonCountForModules = (modules) => {
  return modules.reduce((count, module) => {
    if (module.module_lessons) {
      const completedModuleLessons = module.module_lessons.filter(
        (lesson) => lesson.completed === true
      );
      return count + completedModuleLessons.length;
    }
    return count;
  }, 0);
}

export const getCompletedQuizCountForModules = (modules) => {
  return modules.reduce((count, module) => {
    if (module.quizzes) {
      const completedModuleQuizzes = module.quizzes.filter(
        (quiz) => quiz.completed === true
      );
      return count + completedModuleQuizzes.length;
    }
    return count;
  }, 0);
}

export const getCompletedQuizForUser = (modules) => {
  return modules.reduce((count, module) => {
    if (module.quizzes) {
      const attemptedModuleQuizzes = module.quizzes.filter(
        (quiz) => quiz.completed === true
      );
      return count + attemptedModuleQuizzes.length;
    }
    return count;
  }, 0);
}

export const getCompletedLessonCountForUserAndCourse = async (userID, courseID) => {
  try {
    const prisma = new PrismaClient();
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        course_id: courseID,
        user_id: userID,
      },
      include: {
        course: {
          include: {
            course_modules: {
              include: {
                module_lessons: true,
              }
            }
          }
        }
      }
    });

    if (enrollment) {
      return enrollment.course.course_modules?.reduce((count, module) => {
        if (module.module_lessons) {
          const completedModuleLessons = module.module_lessons.filter(
            (lesson) => lesson.completed === true
          );
          return count + completedModuleLessons.length;
        }
        return count;
      }, 0)
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

export const getCompletedQuizCountForUserAndCourse = async (userID, courseID) => {
  try {
    const prisma = new PrismaClient();
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        course_id: courseID,
        user_id: userID,
      },
      include: {
        course: {
          include: {
            course_modules: {
              include: {
                quizzes: true
              }
            }
          }
        }
      }
    });

    if (enrollment) {
      return enrollment.course.course_modules?.reduce((count, module) => {
        if (module.quizzes) {
          const completedModuleQuizzes = module.quizzes.filter(
            (lesson) => lesson.completed === true
          );
          return count + completedModuleQuizzes.length;
        }
        return count;
      }, 0)
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