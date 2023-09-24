// import AWS from "aws-sdk";
import { randomUUID } from "crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});
const EXPIRY = 360000

export const presignURLHandler = async (
  req,
  res,
) => {
  try {
    // Set Contants
    let Key, uploadUrl, hasPresignedURL, ContentType = null;
    const fileName = req.query.fileName;
    const fileType = req.query.fileType;
    const username = req.query.username;

    Key = await createKey({
        Bucket: process.env.AWS_BUCKET,
        Key: `profile_pictures/${username}-${fileName}`,
        Body: "",
    });

    if (Key) {
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET,
            Key
          });
        uploadUrl = await getSignedUrl(client, command, { expiresIn: EXPIRY });
        hasPresignedURL = true
    }

    if (hasPresignedURL) {
      return res.json({
        success: true,
        expires_in: EXPIRY,
        s3: {
          uploadUrl,
          key: Key,
        },
      });
    }

    return res.json({
      success: false,
      message: "Error uploading file"
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

    const deleteCommand = new DeleteObjectCommand(s3Params);
    const response = await client.send(deleteCommand);

    console.log("Delete Success", response);

    return res.json({
      success: true,
      message: "File Delete Successfully",
    });
  } catch (error) {
    console.error("Error deleting object:", error);

    res.status(500).json({
      success: false,
      message: "Unexpected error occurred",
      error: error.message,
    });
  }
};

const createKey = async (params) => {
  try {
    const command = new PutObjectCommand(params);
    await client.send(command);
    console.log("Folder created successfully.");
    return params.Key;
  } catch (error) {
    console.error("Error creating folder:", error);
    throw error;
  }
};