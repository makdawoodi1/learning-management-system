import AWS from "aws-sdk";
import { randomUUID } from "crypto";

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: "v4",
});

const s3Params = {
  Bucket: process.env.AWS_BUCKET,
  Expires: 60 * 5,
};

export const presignURLHandler = async (
  req,
  res,
  name,
  s3_folder_key,
  s3_module_key,
  s3_lesson_key
) => {
  try {
    // Set Contants
    let Key, uploadUrl, folderKey, moduleKey, lessonKey, hasPresignedURL, ContentType = null;
    const fileName = req.query.fileName;
    const fileType = req.query.fileType;
    switch (fileType) {
      case "image/jpeg":
        ContentType = "image/jpeg";
        break;
      case "image/png":
        ContentType = "image/png";
        break;
      case "video/mp4":
        ContentType = "video/mp4";
        break;
      case "application/zip":
        ContentType = "application/zip";
        break;
      default:
        ContentType = null;
        break;
    }

    if (!ContentType) {
      return res.json({
        success: false,
        message: "Unknown File Extension",
      });
    }
    s3Params.ContentType = ContentType;

    // Folder Key
    folderKey = 
    s3_folder_key ? s3_folder_key 
    : await createKey(req, res, {
      Bucket: process.env.AWS_BUCKET,
      Key: `${randomUUID()}/`,
      Body: "",
    });

    if (folderKey && name === 'introductory-video' || name === 'course-thumbnail') {
      Key = await getUploadKey(name, fileName, folderKey);
      s3Params.Key = Key;
      uploadUrl = await s3.getSignedUrl("putObject", s3Params);
      // cloudfrontParams.url = `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${Key}`;
      // cloudfront.getSignedUrl(cloudfrontParams);
      hasPresignedURL = true
    }

    // Module & Lesson Keys
    if (folderKey && name === 'lesson-files') {
      moduleKey = 
      s3_module_key ? s3_module_key 
      : await createKey(req, res, {
        Bucket: process.env.AWS_BUCKET,
        Key: `${folderKey}${randomUUID()}/`,
        Body: "",
      });

      lessonKey = 
      s3_lesson_key ? s3_lesson_key 
      : await createKey(req, res, {
        Bucket: process.env.AWS_BUCKET,
        Key: `${moduleKey}${randomUUID()}/`,
        Body: "",
      });

      if (moduleKey && lessonKey) {
        Key = await getUploadKey(name, fileName, lessonKey);
        s3Params.Key = Key;
        uploadUrl = await s3.getSignedUrl("putObject", s3Params);
        // cloudfrontParams.url = `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${Key}`;
        // cloudfront.getSignedUrl(cloudfrontParams);
        hasPresignedURL = true
      }
      else res.json({
        success: false,
        message: "Error Uploading Lesson files"
      })
    }

    if (hasPresignedURL) {
      return res.json({
        success: true,
        expires_in: s3Params.Expires,
        s3: {
          uploadUrl,
          key: Key,
          folderKey,
          moduleKey,
          lessonKey
        },
      });
    }

    return res.json({
      success: false,
      message: "Error uploading files"
    })
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

const createKey = async (req, res, params) => {
  try {
    return new Promise((resolve, reject) => {
      s3.putObject(params, (err, data) => {
        if (err) {
          console.error("Error creating folder:", err);
          reject(err);
        } else {
          console.log("Folder created successfully.");
          resolve(params.Key);
        }
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

const getUploadKey = async (name, fileName, key) => {
  return new Promise((resolve, reject) => {
    switch (name) {
      case "introductory-video":
        return resolve(`${key}${name}-${fileName}`);

      case "course-thumbnail":
        return resolve(`${key}${name}-${fileName}`);

      case "lesson-files":
        return resolve(`${key}${name}-${fileName}`);

      default:
        reject({
          success: false,
          message: "Unknown File Extension",
        });
    }
  });
};