import { PrismaClient } from "@prisma/client";
import aws from "aws-sdk";
import {
  getLessonContent,
  getQuizContent,
  getAssignmentContent,
  handleLessonContent,
  handleQuizContent,
  handleAssignmentContent,
  getCompletedLessonCountForUserAndCourse,
} from "./courseContentController.js";

aws.config.setPromisesDependency();
const s3 = new aws.S3({
  apiVersion: "2006-03-01",
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: "v4",
});

export const getCoursesHandler = async (req, res) => {
  try {
    const prisma = new PrismaClient();

    // Creating Admin Account
    let courses = await prisma.course.findMany({
      include: {
        course_modules: {
          include: {
            module_lessons: true,
          },
        },
      },
    });

    courses = courses.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description,
      price: course.price,
      thumbnail: JSON.parse(course.thumbnail),
      introductoryVideo: JSON.parse(course.introductoryVideo),
      lessonCount: course.course_modules
        ? course.course_modules.reduce(
            (totalLessonCount, module) =>
              totalLessonCount +
              (module.module_lessons ? module.module_lessons.length : 0),
            0
          )
        : 0,
    }));

    if (courses) {
      res.json({
        success: true,
        message: "Courses have been successfully fetched!",
        courses,
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

export const getCourseHandler = async (req, res, username, courseID) => {
  try {
    const prisma = new PrismaClient();
    const course = await prisma.course.findUnique({
      where: {
        id: parseInt(courseID),
      },
      include: {
        course_modules: {
          include: {
            module_lessons: true,
          },
        },
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        enrollments: true,
      },
    });

    if (
      user?.enrollments.filter(
        (enrollment) => enrollment.course_id === parseInt(courseID)
      ).length
    ) {
      return res.status(409).json({
        success: true,
        message: "Course already enrolled!",
        course: {
          ...course,
          thumbnail: JSON.parse(course.thumbnail),
          introductoryVideo: JSON.parse(course.introductoryVideo),
        },
      });
    }

    if (course) {
      res.json({
        success: true,
        message: "Course have been successfully fetched!",
        course: {
          ...course,
          thumbnail: JSON.parse(course.thumbnail),
          introductoryVideo: JSON.parse(course.introductoryVideo),
        },
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

export const createCourseHandler = async (req, res) => {
  try {
    let {
      courseTitle,
      courseDescription,
      courseFolderKey,
      price,
      thumbnail,
      introductoryVideo,
      modules,
    } = req.body.data.attributes;
    const prisma = new PrismaClient();

    // Creating Admin Account
    const newCourse = await prisma.course.create({
      data: {
        title: courseTitle,
        description: courseDescription,
        s3_folder_key: courseFolderKey,
        price,
        thumbnail: JSON.stringify({
          ...thumbnail,
          objectKey: `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${thumbnail.objectKey}`,
        }),
        introductoryVideo: JSON.stringify({
          ...introductoryVideo,
          objectKey: `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${introductoryVideo.objectKey}`,
        }),
        published: true,
        course_modules: {
          create: modules.map((module) => ({
            title: module.title,
            description: module.description,
            s3_folder_key: module.moduleFolderKey ?? "",
            module_lessons: {
              create: module.lessons.map((lesson) => ({
                title: lesson.title,
                description: lesson.description,
                content: lesson.content,
                completed: false,
                s3_folder_key: lesson.lessonFolderKey ?? "",
                lesson_files: {
                  create: lesson.lessonFiles.map((lessonFile) => ({
                    name: lessonFile.name,
                    url: lessonFile.url,
                    fileType:
                      lessonFile.type === "application/zip"
                        ? "ZIP"
                        : lessonFile.type === "video/mp4"
                        ? "VIDEO"
                        : "IMAGE",
                  })),
                },
              })),
            },
          })),
        },
      },
    });

    if (newCourse) {
      return res.json({
        success: true,
        message: "The Course has been created successfully",
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

export const updateCourseHandler = async (req, res, courseID) => {
  try {
    console.log("Yes Working updateCourseHandler");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected error occured",
      error: error.message,
    });

    console.log(error);
  }
};

export const getEnrolledCoursesHandler = async (req, res, username) => {
  try {
    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        enrollments: {
          include: {
            course: {
              include: {
                course_modules: {
                  include: {
                    module_lessons: true,
                  },
                },
              },
            },
          },
        },
        quiz_attempts: true,
      },
    });
    if (!user)
      return res.status(403).json({
        success: false,
        message: "Invalid credentials",
      });

    const coursePromises = user.enrollments.map(async (enrollment) => {
      const completedLessonCount =
        await getCompletedLessonCountForUserAndCourse(
          enrollment.user_id,
          enrollment.course_id
        );

      return {
        id: enrollment.course_id,
        title: enrollment.course.title,
        description: enrollment.course.description,
        price: enrollment.course.price,
        thumbnail: JSON.parse(enrollment.course.thumbnail),
        introductoryVideo: JSON.parse(enrollment.course.introductoryVideo),
        totalLessonCount: enrollment.course.course_modules
          ? enrollment.course.course_modules.reduce(
              (totalLessonCount, module) =>
                totalLessonCount +
                (module.module_lessons ? module.module_lessons.length : 0),
              0
            )
          : 0,
        completedLessonCount: completedLessonCount,
      };
    });

    Promise.all(coursePromises)
      .then((courses) => {
        return res.json({
          success: true,
          message: "Courses have been successfully fetched!",
          courses,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          message: "Error fetching courses: " + error.message,
        });
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

export const getEnrolledCourseHandler = async (req, res, courseID) => {
  try {
    const prisma = new PrismaClient();
    const courseID = req.query.courseID;
    const course = await prisma.course.findUnique({
      where: {
        id: parseInt(courseID),
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
      res.json({
        success: true,
        message: "Course have been successfully fetched!",
        course: {
          id: course.id,
          title: course.title,
          description: course.description,
          modules: course.course_modules.map((module) => ({
            id: module.id,
            title: module.title,
            description: module.description,
            lessons: module.module_lessons.map((lesson) => ({
              id: lesson.id,
              title: lesson.title,
              description: lesson.description,
            })),
          })),
        },
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

export const getCourseContent = async (req, res, contentObject) => {
  try {
    const requestedContent = JSON.parse(contentObject);

    switch (requestedContent.type) {
      case "lesson":
        return await getLessonContent(
          req,
          res,
          requestedContent.lessonID,
          requestedContent.moduleID
        );
      case "quiz":
        return await getQuizContent(
          req,
          res,
          requestedContent.quizID,
          requestedContent.moduleID
        );
      case "assignment":
        return await getAssignmentContent(
          req,
          res,
          requestedContent.assignmentID,
          requestedContent.moduleID
        );
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

export const contentHandler = async (req, res, contentObject) => {
  try {
    const requestedContent = JSON.parse(contentObject);

    switch (requestedContent.type) {
      case "lesson":
        return await handleLessonContent(
          req,
          res,
          requestedContent.lessonID,
          requestedContent.moduleID
        );
      case "quiz":
        return await handleQuizContent(
          req,
          res,
          requestedContent.quizID,
          requestedContent.moduleID
        );
      case "assignment":
        return await handleAssignmentContent(
          req,
          res,
          requestedContent.assignmentID,
          requestedContent.moduleID
        );
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

export const enrollCourseHandler = async (req, res, courseID) => {
  try {
    const prisma = new PrismaClient();
    const { username } = req.body.data.attributes;

    if (!username)
      return res.status(403).json({
        success: false,
        message: "Invalid credentials",
      });

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        enrollments: true,
        quiz_attempts: true,
      },
    });

    if (!user)
      return res.status(403).json({
        success: false,
        message: "Invalid credentials",
      });

    const course = await prisma.course.findUnique({
      where: {
        id: parseInt(courseID),
      },
      include: {
        course_modules: {
          include: {
            module_lessons: true,
          },
        },
      },
    });
    if (!course)
      return res.status(404).json({
        success: false,
        message: "Course does not exist",
      });

    const enrolled = await prisma.enrollment.create({
      data: {
        user: {
          connect: { id: user.id },
        },
        course: {
          connect: { id: course.id },
        },
      },
    });

    if (enrolled) {
      res.json({
        success: true,
        message: "Enrolled successfully!",
        course,
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
