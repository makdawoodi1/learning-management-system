import React, { useCallback, useState } from "react";
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
import UploadError from "./UploadError";
import FileUploadWithProgress from "./FileUploadWithProgress";

const DropItemZone = ({
  name,
  Form,
  buttonText,
  title,
  fn,
  acceptedFileTypes,
  maxFileSize,
}) => {
  console.log("acceptedFileTypes", acceptedFileTypes);
  // Hooks
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Functions
  // File Type Validator
  const typeValidator = (file) => {
    if (!acceptedFileTypes.includes(file.type)) {
      return {
        code: "invalid-file-type",
        message: "Invalid file type",
      };
    }

    if (file.type.startsWith("video/  ")) {
      if (file.size > maxFileSize) {
        return {
          code: "size-too-large",
          message: "Video file is larger than 100MB",
        };
      }
    } else if (file.type.startsWith("image/")) {
      if (file.size > maxFileSize) {
        // 3MB limit
        return {
          code: "size-too-large",
          message: "Image file is larger than 3MB",
        };
      }
    }
    return null;
  };

  //   Removes Files
  const removeFile = (file) => {
    setSelectedFiles((curr) =>
      curr.filter((fileWrapper) => fileWrapper.file !== file)
    );
  };

  // Handle File Drop
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    const mapppedAccepted = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
        errors: [],
      })
    );
    const mappedRejected = rejectedFiles.map((fileWrapper) =>
      Object.assign(fileWrapper, {
        preview: URL.createObjectURL(fileWrapper?.file),
        formattedSize: formatBytes(fileWrapper?.file.size),
        errors: fileWrapper.errors,
      })
    );
    setSelectedFiles((curr) => [...curr, ...mapppedAccepted, ...mappedRejected]);
  }, []);

  // Handle File Upload
  const onUpload = async (file, url) => {
    const url = await uploadFile(fileWrapper.file, setProgress);
    console.log("url", url);
    // setFiles(curr => (curr.map(fileWrapper => {
    //     if (fileWrapper.file === file) {
    //         return { ...fileWrapper, url }
    //     }
    //     return fileWrapper;
    // })))
  }

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
      <Dropzone onDrop={onDrop} validator={typeValidator}>
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone" >
            <div className="dz-message needsclick" {...getRootProps()}>
              <Form.Item
                name={name?.replaceAll("-", " ")}
                rules={[
                  {
                    required: true,
                    message: `Please upload ${name.replaceAll("-", " ")}!`,
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
        {selectedFiles.map((fileWrapper, index) => (
          <>
            {fileWrapper.errors?.length ? (
              <UploadError key={index + "-file"} fileWrapper={fileWrapper} fn={fn} removeFile={removeFile} />
            ) : (
              <FileUploadWithProgress key={index + "-file"} fileWrapper={fileWrapper} fn={fn} removeFile={removeFile} onUpload={onUpload} />
            )}
          </>
        ))}
      </div>

      {buttonText && (
        <div className="text-center mt-4">
          <Button
            type="dashed"
            className="d-flex align-items-center justify-content-center mx-auto btn-danger-custom"
            onClick={onUpload}
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
