export const createQuizHandler = async (req, res) => {
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