import React from "react";
import { FaTimes } from "react-icons/fa";
import { RiImageLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";
import { Progress } from 'antd';

const UploadError = ({fileWrapper, fn, removeFile}) => {
  return (
    <Card
      className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
    >
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
          <Progress percent={100} size="small" status="exception" />
          {fileWrapper.errors?.map(error => (
            <ore>{error.message}</ore>
          ))}
        </Row>
      </div>
    </Card>
  );
};

export default UploadError;
