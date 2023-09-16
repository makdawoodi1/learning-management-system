import { PrismaClient } from "@prisma/client";

export const getCoursesHandler = async (req, res) => {
  try {
    console.log("Yes Working getCoursesHandler");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected error occured",
      error: error.message,
    });

    console.log(error);
  }
};

export const getCourseHandler = async (req, res, courseID) => {
  try {
    console.log("Yes Working getCourseHandler");
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
    console.log("Yes Working createCourseHandler");
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
}
