import S3 from "aws-sdk/clients/s3.js";
import { randomUUID } from "crypto";

const s3 = new S3({
  apiVersion: "2006-03-01",
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: "v4",
});

export const presignURLHandler1 = async (req, res) => {
  try {
    const extension = req.query.fileName.split("/")[1];
    const Key = `${randomUUID()}.${extension}`;
    const s3Params = {
      Bucket: process.env.AWS_BUCKET,
      Key,
      Expires: 60 * 5,
      ContentType: `image/extension`,
    };

    const uploadUrl = await s3.getSignedUrl("putObject", s3Params);

    return res.json({
      success: true,
      expires_in: s3Params.Expires,
      s3: {
        uploadUrl,
        key: Key,
      },
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

export const delteObjectHandler = async (req, res) => {
  try {
    const Key = req.query.objectKey;

    const s3Params = {
      Bucket: process.env.AWS_BUCKET,
      Key,
    };

    s3.deleteObject(s3Params, (err, data) => {
      if (err) console.log(err, err.stack);
      else {
        console.log("Delete Success", data);
        return res.json({
          success: true,
          message: "File Delete Successfully",
        });
      }
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
