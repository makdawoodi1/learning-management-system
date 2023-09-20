import React from "react";
import { Progress } from "antd";

const UploadError = ({ fileWrapper }) => {
  return (
    <>
      <Progress percent={100} size="small" status="exception" />
      {fileWrapper.errors?.map((error) => (
        <pre className="text-danger">{error.message}</pre>
      ))}
    </>
  );
};

export default UploadError;
