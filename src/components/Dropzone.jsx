import React, { useState } from "react";
import { Row, Col, Card } from "reactstrap";
import { Button } from "antd";
import Dropzone from "react-dropzone";

// Import Icons
import {
  RiUploadCloudFill,
  RiUploadCloudLine,
  RiImageLine,
} from "react-icons/ri";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const DropItemZone = ({ name, Form, buttonText, title, fn }) => {
  // Hooks
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Functions
  //   Handles Accepted Files
  const handleAcceptedFiles = (files) => {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );

    setSelectedFiles(files);
  };

  //   Removes Files
  const removeFile = (index) => {
    const updatedFiles = selectedFiles.filter(
      (_, fileIndex) => fileIndex !== index
    );
    setSelectedFiles(updatedFiles);
  };

  //   Formats the size
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  return (
    <>
      <Dropzone onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone">
            <div className="dz-message needsclick" {...getRootProps()}>
              <Form.Item
                name={name?.replaceAll('-', ' ')}
                rules={[
                  {
                    required: true,
                    message: `Please upload ${name.replaceAll('-', ' ')}!`,
                  },
                ]}
              >
                <input {...getInputProps()} />
              </Form.Item>
              <div className="mb-3 d-flex align-items-center justify-content-center">
                <RiUploadCloudFill className="display-3 text-muted" />
              </div>
              <h4 className="text-muted">
                {title ?? "Drop files here or click to upload."}
              </h4>
            </div>
          </div>
        )}
      </Dropzone>
      <div className="dropzone-previews mt-3" id="file-previews">
        {selectedFiles.map((file, index) => {
          return (
            <Card
              className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
              key={index + "-file"}
            >
              <div className="p-2">
                <Row className="align-items-center">
                  <Col className="col-auto">
                    <Link onClick={() => fn?.handlePreview(file)}>
                      {file?.type.includes("image") ? (
                        <img
                          data-dz-thumbnail=""
                          height="80"
                          className="avatar-sm rounded bg-light"
                          alt={file.name}
                          src={file.preview}
                        />
                      ) : (
                        <RiImageLine size={24} />
                      )}
                    </Link>
                  </Col>
                  <Col className="d-flex align-items-center justify-content-between">
                    <div className="text-center">
                      <p className="text-muted fw-bold font-size-12 m-0">
                        {file.name}
                      </p>
                      <p className="m-0 font-size-14">
                        <strong>{file.formattedSize}</strong>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        removeFile(index);
                        fn?.handleRemoveFile(file);
                      }}
                    >
                      <FaTimes />
                    </button>
                  </Col>
                </Row>
              </div>
            </Card>
          );
        })}
      </div>

      {buttonText && (
        <div className="text-center mt-4">
          <Button
            type="dashed"
            className="d-flex align-items-center justify-content-center mx-auto btn-danger-custom"
            style={{
              width: "100%",
            }}
            icon={<RiUploadCloudLine />}
          >
            Upload
          </Button>
        </div>
      )}
    </>
  );
};

export default DropItemZone;
