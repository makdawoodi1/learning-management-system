import { Progress } from "antd";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Row } from "reactstrap";

const FileUploadWithProgress = React.forwardRef(
  ({ fileWrapper, fn, removeFile, setFileUploading }, ref) => {
    const [progress, setProgress] = useState(0);

    // Expose a method to trigger upload externally for multipart upload
    useImperativeHandle(ref, () => ({
      startUpload: async (file, url, key) => {
        // selectedFiles.map(async file => {
        //   const url = await uploadFile(file, setProgress);
        //   console.log('url', url)
        // })
        // uploadFile(fileWrapper, setProgress)
        // .then((url) => {
        //   console.log(`File ${fileWrapper.name} uploaded: ${url}`);
        //   // Handle successful upload
        //   setIsUploading(false);
        //   setFileUploading(false);
        // })
        // .catch((error) => {
        //   console.error(`Error uploading file ${fileWrapper.name}:`, error);
        //   return setFileUploading(false);
        // });
        const uploadResponse = await uploadFile(file, url, key, setProgress);
        return uploadResponse;
      },
      endUpload: (file) => {
        if (file.xhr) {
          file.xhr.abort();
        }
      },
    }));

    return (
      <Row className="align-items-center">
        <Progress percent={progress} size="small" />
      </Row>
    );
  }
);

const uploadFile = (uploadFile, uploadUrl, uploadKey, onProgress) => {
  const url = uploadUrl;
  const key = uploadKey;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);

    xhr.onload = () => {
      if (xhr.status === 200 && xhr.statusText === "OK") {
        const secureURL = xhr.responseURL;
        uploadFile.secureURL = secureURL;
        resolve(uploadFile);
      } else if (xhr.status === 403) {
        reject({ message: "Connection Timeout Error" });
      }
    };
    xhr.onerror = (evt) => reject(evt);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        onProgress(Math.round(percentage));
      }
    };

    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("upload_preset", key);

    xhr.send(formData);
    uploadFile.xhr = xhr;
    uploadFile.url = url;
    uploadFile.objectKey = key;
  });
};

// Function to upload a file and store its XHR object
// const uploadAndStoreXHR = (file, onProgress) => {
//   const promise = uploadFile(file, onProgress);
//   xhrs[file.name] = { xhr: promise };
//   return promise;
// };

export default FileUploadWithProgress;
