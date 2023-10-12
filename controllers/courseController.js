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
  getCompletedQuizCountForUserAndCourse,
  getCompletedLessonCountForModules,
  getCompletedQuizCountForModules,
} from "./courseContentController.js";
import { generateCertificate2 } from "../services/certificateGenerator.js"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs, { createReadStream } from "fs";
import path from "path";

import PDFDocument from 'pdfkit';
import blobStream from 'blob-stream';

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
        User: true,
      },
    });

    courses = courses.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description,
      price: course.price,
      thumbnail: JSON.parse(course.thumbnail),
      introductoryVideo: JSON.parse(course.introductoryVideo),
      profileImage: JSON.parse(course.User?.profile_picture),
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
        User: true,
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
          profileImage: JSON.parse(user.profile_picture),
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
          profileImage: JSON.parse(course.User?.profile_picture),
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

export const getEditCourseHandler = async (req, res, username, courseID) => {
  try {
    const prisma = new PrismaClient();
    const course = await prisma.course.findUnique({
      where: {
        id: parseInt(courseID),
      },
      include: {
        course_modules: {
          include: {
            module_lessons: {
              include: {
                lesson_files: true,
                lesson_content_files: true,
              },
            },
            quizzes: {
              include: {
                quiz_attempts: true,
                quiz_questions: true,
              },
            },
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
          courseTitle: course.title,
          courseDescription: course.description,
          courseFolderKey: course.s3_folder_key,
          introductoryVideo: JSON.parse(course.introductoryVideo),
          thumbnail: JSON.parse(course.thumbnail),
          price: course.price,
          published: course.published,
          modules: course.course_modules.map((module) => ({
            id: module.id,
            title: module.title,
            description: module.description,
            moduleFolderKey: module.s3_folder_key,
            collapsed: true,
            completed: false,
            lessons: module.module_lessons.map((lesson) => ({
              id: lesson.id,
              moduleID: module.id,
              title: lesson.title,
              description: lesson.description,
              lessonFolderKey: lesson.s3_folder_key,
              content: lesson.content,
              collapsed: true,
              completed: lesson.completed,
              lessonFiles: lesson.lesson_files.map((file) => {
                const { url, ...parsedData } = JSON.parse(file.url);
                return { ...file, ...parsedData };
              }),
              lessonContentFiles: lesson.lesson_content_files.map((file) => {
                const { url, ...parsedData } = JSON.parse(file.url);
                return { ...file, ...parsedData };
              }),
            })),
            quizzes: module.quizzes.map((quiz) => ({
              id: quiz.id,
              moduleID: module.id,
              quizTitle: quiz.title,
              quizDescription: quiz.description,
              quizTimer: quiz.timer,
              quizTimerOptions:
                quiz.timerOption === "MINUTES" ? "minutes" : "seconds",
              quizAttemptNumbers: quiz.attemptNumber,
              quizPassingMarks: quiz.passingMarks,
              collapsed: true,
              completed: quiz.completed,
              questions: quiz.quiz_questions?.map((question) => ({
                id: question.id,
                moduleID: module.id,
                question: question.question,
                questionType:
                  question.question_type === "TRUE_FALSE"
                    ? "true_false"
                      ? question.question_type === "SINGLE_CHOICE"
                      : "single_choice"
                    : "multiple_choice",
                correctAnswer:
                  question.correct_answer?.length === 1
                    ? question.correct_answer.toString()
                    : question.correct_answer,
                options: question.quiz_options,
                collapsed: true,
                completed: false,
              })),
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
    const username = req.query.username;
    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    // Creating Course Account
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
        userId: user.id,
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
                  create: lesson.lessonFiles.map((file) => ({
                    name: file.path,
                    url: JSON.stringify({
                      ...file,
                      objectKey: `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${file.objectKey}`,
                    }),
                    fileType:
                      file.type === "application/zip"
                        ? "ZIP"
                        : file.type === "video/mp4"
                        ? "VIDEO"
                        : "IMAGE",
                  })),
                },
                lesson_content_files: {
                  create: lesson.lessonContentFiles.map((file) => ({
                    name: file.path,
                    url: JSON.stringify({
                      ...file,
                      objectKey: `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${file.objectKey}`,
                    }),
                    fileType: file.type === "audio/mpeg" ? "AUDIO" : "IMAGE",
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
    let {
      courseTitle,
      courseDescription,
      courseFolderKey,
      price,
      thumbnail,
      introductoryVideo,
      modules,
    } = req.body.data.attributes;
    const username = req.query.username;
    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    // Check if the course exists
    const existingCourse = await prisma.course.findUnique({
      where: { id: parseInt(courseID) },
    });

    if (!existingCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const thumbnailObjectKey = thumbnail.objectKey
      .split(process.env.AWS_CLOUDFRONT_DOMAIN)[1]
      .replace(/^\//, "");
    const introductoryVideoObjectKey = introductoryVideo.objectKey
      .split(process.env.AWS_CLOUDFRONT_DOMAIN)[1]
      .replace(/^\//, "");

    const updatedCourse = await prisma.course.update({
      where: { id: parseInt(courseID) },
      data: {
        title: courseTitle,
        description: courseDescription,
        s3_folder_key: courseFolderKey,
        price,
        thumbnail: {
          ...thumbnail,
          objectKey: thumbnailObjectKey,
        },
        introductoryVideo: {
          ...introductoryVideo,
          objectKey: introductoryVideoObjectKey,
        },
        published: true,
        course_modules: {
          upsert: modules.map((module) => ({
            where: { id: module.id },
            update: {
              title: module.title,
              description: module.description,
              s3_folder_key: module.moduleFolderKey ?? "",
              module_lessons: {
                upsert: module.module_lessons.map((lesson) => ({
                  where: { id: lesson.id },
                  update: {
                    title: lesson.title,
                    description: lesson.description,
                    content: lesson.content,
                    completed: lesson.completed,
                    s3_folder_key: lesson.lessonFolderKey ?? "",
                    lesson_files: {
                      upsert: lesson.lessonFiles.map((file) => ({
                        where: { id: file.id },
                        update: {
                          name: file.path,
                          url: JSON.stringify({
                            ...file,
                            objectKey: `https://${
                              process.env.AWS_CLOUDFRONT_DOMAIN
                            }/${file.objectKey
                              .split(process.env.AWS_CLOUDFRONT_DOMAIN)[1]
                              .replace(/^\//, "")}`,
                          }),
                          fileType:
                            file.type === "application/zip"
                              ? "ZIP"
                              : file.type === "video/mp4"
                              ? "VIDEO"
                              : "IMAGE",
                        },
                        create: {
                          name: file.path,
                          url: JSON.stringify({
                            ...file,
                            objectKey: `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${file.objectKey}`,
                          }),
                          fileType:
                            file.type === "application/zip"
                              ? "ZIP"
                              : file.type === "video/mp4"
                              ? "VIDEO"
                              : "IMAGE",
                        },
                      })),
                    },
                    lesson_content_files: {
                      upsert: lesson.lessonContentFiles.map((file) => ({
                        where: { id: file.id },
                        update: {
                          name: file.path,
                          url: JSON.stringify({
                            ...file,
                            objectKey: `https://${
                              process.env.AWS_CLOUDFRONT_DOMAIN
                            }/${file.objectKey
                              .split(process.env.AWS_CLOUDFRONT_DOMAIN)[1]
                              .replace(/^\//, "")}`,
                          }),
                          fileType:
                            file.type === "audio/mpeg" ? "AUDIO" : "IMAGE",
                        },
                        create: {
                          name: file.path,
                          url: JSON.stringify({
                            ...file,
                            objectKey: `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${file.objectKey}`,
                          }),
                          fileType:
                            file.type === "audio/mpeg" ? "AUDIO" : "IMAGE",
                        },
                      })),
                    },
                  },
                  create: {
                    title: lesson.title,
                    description: lesson.description,
                    content: lesson.content,
                    completed: false,
                    s3_folder_key: lesson.lessonFolderKey ?? "",
                    lesson_files: {
                      create: lesson.lessonFiles.map((file) => ({
                        name: file.path,
                        url: JSON.stringify({
                          ...file,
                          objectKey: `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${file.objectKey}`,
                        }),
                        fileType:
                          file.type === "application/zip"
                            ? "ZIP"
                            : file.type === "video/mp4"
                            ? "VIDEO"
                            : "IMAGE",
                      })),
                    },
                    lesson_content_files: {
                      create: lesson.lessonContentFiles.map((file) => ({
                        name: file.path,
                        url: JSON.stringify({
                          ...file,
                          objectKey: `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${file.objectKey}`,
                        }),
                        fileType:
                          file.type === "audio/mpeg" ? "AUDIO" : "IMAGE",
                      })),
                    },
                  },
                })),
              },
            },
            create: {
              title: module.title,
              description: module.description,
              s3_folder_key: module.moduleFolderKey ?? "",
              module_lessons: {
                create: module.module_lessons.map((lesson) => ({
                  title: lesson.title,
                  description: lesson.description,
                  content: lesson.content,
                  completed: false,
                  s3_folder_key: lesson.lessonFolderKey ?? "",
                  lesson_files: {
                    create: lesson.lessonFiles.map((file) => ({
                      name: file.path,
                      url: JSON.stringify({
                        ...file,
                        objectKey: `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${file.objectKey}`,
                      }),
                      fileType:
                        file.type === "application/zip"
                          ? "ZIP"
                          : file.type === "video/mp4"
                          ? "VIDEO"
                          : "IMAGE",
                    })),
                  },
                  lesson_content_files: {
                    create: lesson.lessonContentFiles.map((file) => ({
                      name: file.path,
                      url: JSON.stringify({
                        ...file,
                        objectKey: `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${file.objectKey}`,
                      }),
                      fileType: file.type === "audio/mpeg" ? "AUDIO" : "IMAGE",
                    })),
                  },
                })),
              },
            },
          })),
        },
      },
      include: {
        course_modules: true,
      },
    });

    if (updatedCourse) {
      return res.json({
        success: true,
        message: "The Course has been updated successfully",
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
                    quizzes: true,
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
      const completedLessonCount = enrollment.progress
        ? await getCompletedLessonCountForModules(
            JSON.parse(enrollment.progress)
          )
        : 0;

      const completedQuizCount = enrollment.progress
        ? await getCompletedQuizCountForModules(JSON.parse(enrollment.progress))
        : 0;

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
        totalQuizCount: enrollment.course.course_modules
          ? enrollment.course.course_modules.reduce(
              (totalQuizCount, module) =>
                totalQuizCount + (module.quizzes ? module.quizzes.length : 0),
              0
            )
          : 0,
        completedLessonCount: completedLessonCount,
        completedQuizCount: completedQuizCount,
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

export const getEnrolledCourseHandler = async (
  req,
  res,
  username,
  courseID
) => {
  try {
    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    const course = await prisma.course.findUnique({
      where: {
        id: parseInt(courseID),
      },
      include: {
        course_modules: {
          include: {
            module_lessons: true,
            quizzes: true,
          },
        },
      },
    });

    const enrolledCourse = await prisma.enrollment.findFirst({
      where: {
        user_id: user.id,
        course_id: parseInt(courseID),
      },
    });

    const modules = enrolledCourse.progress
      ? JSON.parse(enrolledCourse.progress)
      : course.course_modules;

    if (course && enrolledCourse) {
      res.json({
        success: true,
        message: "Course have been successfully fetched!",
        course: {
          id: course.id,
          title: course.title,
          description: course.description,
          modules: modules.map((module) => ({
            id: module.id,
            title: module.title,
            description: module.description,
            lessons: module.module_lessons.map((lesson) => ({
              id: lesson.id,
              title: lesson.title,
              description: lesson.description,
            })),
            quizzes: module.quizzes.map((quiz) => ({
              id: quiz.id,
              title: quiz.title,
              description: quiz.description,
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

export const getEnrolledCourseProgress = async (
  req,
  res,
  username,
  courseID
) => {
  try {
    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    const course = await prisma.course.findUnique({
      where: {
        id: parseInt(courseID),
      },
      include: {
        course_modules: {
          include: {
            module_lessons: true,
            quizzes: true,
          },
        },
      },
    });

    const enrolledCourse = await prisma.enrollment.findFirst({
      where: {
        user_id: user.id,
        course_id: parseInt(courseID),
      },
    });
    const modules = enrolledCourse.progress
      ? JSON.parse(enrolledCourse.progress)
      : course.course_modules;

    if (course && enrolledCourse) {
      const completedLessonsCount = getCompletedLessonCountForModules(modules);
      const completedQuizCount = getCompletedQuizCountForModules(modules);

      res.json({
        success: true,
        message: "Course progress have been successfully fetched!",
        progress: {
          completed_lessons: completedLessonsCount,
          completed_quizzes: completedQuizCount,
          total_lessons: modules.reduce((count, module) => {
            return (
              count + (module.module_lessons ? module.module_lessons.length : 0)
            );
          }, 0),
          total_quizzes: modules.reduce((count, module) => {
            return count + (module.quizzes ? module.quizzes.length : 0);
          }, 0),
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

export const contentHandler = async (
  req,
  res,
  username,
  courseID,
  contentObject
) => {
  try {
    const requestedContent = JSON.parse(contentObject);

    switch (requestedContent.type) {
      case "lesson":
        return await handleLessonContent(
          req,
          res,
          username,
          courseID,
          requestedContent.lessonID
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

export const generateCertificateHandler = async (req, res) => {
  try {
    const { username, courseID } = req.query;
    const prisma = new PrismaClient();
    
    // const doc = new PDFDocument({
      //   layout: "landscape",
      //   size: "A4",
      // });
      // const stream = doc.pipe(blobStream());
      
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });
      
      const course = await prisma.course.findUnique({
        where: { 
          id: parseInt(courseID)
        }
      })

    const studentName = `${user.firstname.toUpperCase()} ${user.lastname.toUpperCase()}`
    const courseName = course.title.toUpperCase()
    const pdfDocument = await generateCertificate2(req, res, { studentName, courseName })
    const pdfStream = fs.createReadStream(path.join(process.cwd(), 'services', 'certificate.pdf'))

    // const data = fs.readFileSync(pdfPath)
    
    // Send the PDF as a response
    // res.setHeader("Content-Type", "application/pdf");
    // res.setHeader("Content-Disposition", `attachment; filename=course-certificate.pdf`);

    const chunks = []
    for await (let chunk of pdfStream) {
      chunks.push(chunk)
    }

    const client = new S3Client({});
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: `${course.s3_folder_key}certificate.pdf`,
      Body: Buffer.concat(chunks)
    });
    const uploadResponse = await client.send(command);

    if (uploadResponse) {
      res.json({
        success: true,
        message: "Course Certificate uploaded successfully!",
        uploadUrl: `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${course.s3_folder_key}certificate.pdf`,
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
