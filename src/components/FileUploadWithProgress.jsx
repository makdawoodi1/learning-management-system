import { Progress } from "antd";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { RiImageLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";

const FileUploadWithProgress = ({ fileWrapper, fn, removeFile, onUpload }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function upload() {
      const url = await uploadFile(fileWrapper.file, setProgress);
      console.log("url", url);
    }

    upload();
  }, []);

  return (
    <Card className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
      <div className="p-2">
        <Row className="align-items-center">
          <Col className="col-auto">
            <Link
              onClick={() => fn?.handlePreview(fileWrapper.file ?? fileWrapper)}
            >
              {fileWrapper.file?.type.includes("image") ??
              fileWrapper.type?.includes("image") ? (
                <img
                  data-dz-thumbnail=""
                  height="80"
                  className="avatar-sm rounded bg-light"
                  alt={fileWrapper.file?.name ?? fileWrapper.name}
                  src={fileWrapper.preview}
                />
              ) : (
                <RiImageLine size={24} />
              )}
            </Link>
          </Col>
          <Col className="d-flex align-items-center justify-content-between">
            <div className="text-center">
              <p className="text-muted fw-bold font-size-12 m-0">
                {fileWrapper.file?.name ?? fileWrapper.name}
              </p>
              <p className="m-0 font-size-14">
                <strong>{fileWrapper.formattedSize}</strong>
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                removeFile(fileWrapper.file);
                fn?.handleRemoveFile(fileWrapper.file ?? fileWrapper);
              }}
            >
              <FaTimes />
            </button>
          </Col>
          <Progress percent={progress} size="small" />
        </Row>
      </div>
    </Card>
  );
};

function uploadFile(file, onProgress) {
  const url = "https://api.cloudinary.com/v1_1/demo/image/upload";
  const key = "docs_upload_example_us_preset";

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.onload = () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response.secure_url);
    };

    xhr.onerror = (evt) => reject(evt);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;

        onProgress(Math.round(percentage));
      }
    };
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", key);

    xhr.send();
  });
}

export default FileUploadWithProgress;
