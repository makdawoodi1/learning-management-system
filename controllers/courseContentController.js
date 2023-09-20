import { PrismaClient } from "@prisma/client";

export const getLessonContent = async (req, res, lessonID, moduleID) => {
  try {
    const prisma = new PrismaClient();

    const modules = await prisma.courseModule.findMany({
      include: {
        module_lessons: {
          include: true,
        },
        quizzes: {
          include: true,
        },
      },
    });

    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonID,
      },
      include: {
        lesson_files: true,
      },
    });
    if (lesson) {
      // Calculate the count of completed lessons
      const completedLessonsCount = getCompletedLessonCountForModules(modules);

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
        lessonContent: {
          id: lesson.id,
          title: lesson.title,
          description: lesson.description,
          content: lesson.content,
          completed: lesson.completed,
          lessonFiles: lesson.lesson_files,
        },
        completedLessons: completedLessonsCount,
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

export const handleLessonContent = async (req, res, lessonID, moduleID) => {
  try {
    const prisma = new PrismaClient();

    const modules = await prisma.courseModule.findMany({
      include: {
        module_lessons: {
          include: true,
        },
        quizzes: {
          include: true,
        },
      },
    });

    const updatedLesson = await prisma.lesson.update({
      where: {
        id: lessonID,
      },
      data: {
        completed: true,
      },
      include: {
        lesson_files: true,
      },
    });

    if (updatedLesson) {
      // Filter lessons that are completed
      const completedLessonsCount = getCompletedLessonCountForModules(modules);

      res.json({
        success: true,
        message: "Lesson content has been fetched successfully!",
        modules,
        completedLessons: completedLessonsCount,
        totalLessons: modules.reduce((count, module) => {
          return (
            count + (module.module_lessons ? module.module_lessons.length : 0)
          );
        }, 0),
        totalQuizzes: modules.reduce((count, module) => {
          return count + (module.quizzes ? module.quizzes.length : 0);
        }, 0),
        lessonContent: {
          id: updatedLesson.id,
          title: updatedLesson.title,
          description: updatedLesson.description,
          content: updatedLesson.content,
          completed: updatedLesson.completed,
          lessonFiles: updatedLesson.lesson_files,
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

export const getCompletedLessonCountForUserAndCourse = async (userID, courseID) => {
  try {
    const prisma = new PrismaClient();
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        course_id: courseID,
        user_id: userID,
      },
    });

    if (enrollment) {
      const course = await prisma.course.findUnique({
        where: {
          id: courseID,
        },
        include: {
          course_modules: {
            include: {
              module_lessons: true,
            },
          },
        },
      });
    
      if (course) {
        return course.course_modules.reduce((count, module) => {
          if (module.module_lessons) {
            const completedModuleLessons = module.module_lessons.filter(
              (lesson) => lesson.completed === true
            );
            return count + completedModuleLessons.length;
          }
          return count;
        }, 0);
      }
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