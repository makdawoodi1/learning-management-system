import { Progress } from "antd";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Row } from "reactstrap";
import axios from "axios";

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
        if (file && file.cancel) {
          file.cancel();
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

const uploadFile = async (uploadFile, uploadUrl, uploadKey, onProgress) => {
  return new Promise((resolve, reject) => {
    const CancelToken = axios.CancelToken;
    const cancelTokenSource = CancelToken.source();

    const request = axios.put(uploadUrl, uploadFile, {
      onUploadProgress: (progressEvent) => {
        // if (progressEvent.lengthComputable) {
          const percentage = (progressEvent.loaded / progressEvent.total) * 100;
          onProgress(Math.round(percentage));
        // }
      },
      cancelToken: cancelTokenSource.token,
    });

    request
      .then((response) => {
        if (response.status === 200) {
          const secureURL = response.request.responseURL;
          uploadFile.secureURL = secureURL;
          resolve(uploadFile);
        } else if (response.status === 403) {
          reject({ message: "Connection Timeout Error" });
        } else {
          reject({ message: "Upload failed with status " + response.status });
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          reject({ message: "Upload aborted by user" });
        } else {
          reject(error);
        }
      });

    uploadFile.objectKey = uploadKey;
    uploadFile.cancel = () => {
      cancelTokenSource.cancel("Upload aborted by user");
    };
  });
};

  // return new Promise((resolve, reject) => {
  //   const formData = new FormData();
    // formData.append("file", uploadFile);
    // formData.append("upload_preset", uploadKey);

    // const config = {
    //   onUploadProgress: (progressEvent) => {
    //     if (progressEvent.lengthComputable) {
    //       const percentage = (progressEvent.loaded / progressEvent.total) * 100;
    //       onProgress(Math.round(percentage));
    //     }
    //   },
    // };

    // axios
    //   .put(uploadUrl, formData, config)
    //   .then((response) => {
    //     if (response.status === 200) {
    //       const secureURL = response.request.responseURL;
    //       uploadFile.secureURL = secureURL;
    //       resolve(uploadFile);
    //     } else if (response.status === 403) {
    //       reject({ message: "Connection Timeout Error" });
    //     } else {
    //       reject({ message: "Upload failed with status " + response.status });
    //     }
    //   })
    //   .catch((error) => {
    //     reject(error);
    //   });
  // });
// };

// Function to upload a file and store its XHR object
// const uploadAndStoreXHR = (file, onProgress) => {
//   const promise = uploadFile(file, onProgress);
//   xhrs[file.name] = { xhr: promise };
//   return promise;
// };

export default FileUploadWithProgress;
