import React, { useCallback, useState, useRef, useContext } from "react";
import { API_URL } from "@/config/config";
import { Row, Col, Card } from "reactstrap";
import { Button } from "antd";
import Dropzone from "react-dropzone";
import axios from "@/services/axios";
import toast from "react-hot-toast";
import useCourseState from "@/hooks/useCourseState";

// Import Icons
import {
  RiUploadCloudFill,
  RiUploadCloudLine,
  RiVideoFill,
  RiVideoLine,
} from "react-icons/ri";
import {
  AiOutlineFileZip
} from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import UploadError from "./UploadError";
import FileUploadWithProgress from "./FileUploadWithProgress";
import AuthContext from "@/context/context";

const DropItemZone = ({
  name,
  selectedLesson,
  buttonText,
  title,
  fn,
  acceptedFileTypes,
  maxFileSize,
  multiple,
}) => {
  // Hooks
  const { updateCourseState } = useCourseState();
  const { courseState, setCourseState } = useContext(AuthContext);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileUploading, setFileUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadError, setUploadError] = useState(false);
  const uploadProgressRef = useRef(null);

  // Functions
  // File Type Validator
  const typeValidator = (file) => {
    if (!multiple && name === 'course-thumbnail' && courseState.thumbnail) {
      setUploadError(true);
      return toast.error('Cannot upload more than one thumbnail');
    }

    if (!multiple && name === 'introductory-video' && courseState.introductoryVideo) {
      setUploadError(true);
      return toast.error('Cannot upload more than one introductory video');
    }

    if (!acceptedFileTypes.includes(file.type)) {
      return {
        code: "invalid-file-type",
        message: "Invalid file type",
      };
    }

    if (file.type.startsWith("video/  ")) {
      if (file.size > maxFileSize) {
        // 100MB limit
        return {
          code: "size-too-large",
          message: "Video file is larger than 100MB",
        };
      }
    } else if (file.type.startsWith("image/")) {
      if (file.size > maxFileSize) {
        // 100MB limit
        return {
          code: "size-too-large",
          message: "Image file is larger than 100MB",
        };
      }
    } else if (file.type.endsWith("zip")) {
      if (file.size > maxFileSize) {
        // 100MB limit
        return {
          code: "size-too-large",
          message: "Zip file is larger than 100MB",
        };
      }
    }

    return null;
  };

  //   Removes Files
  const removeFile = (file) => {
    const selectedFile = file.file ?? file;
    if (uploadProgressRef.current)
      uploadProgressRef.current.endUpload(selectedFile);
    setSelectedFiles((curr) =>
      curr.filter((fileWrapper) => {
        const selectedFile = fileWrapper.file ?? fileWrapper;
        return selectedFile !== file;
      })
    );
    setFileUploading(false);
  };

  // Handle File Drop
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (!multiple) setSelectedFiles([]);

    const mapppedAccepted = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
        errors: file.errors ?? [],
      })
    );
    const mappedRejected = rejectedFiles.map((fileWrapper) =>
      Object.assign(fileWrapper, {
        preview: URL.createObjectURL(fileWrapper?.file),
        formattedSize: formatBytes(fileWrapper?.file.size),
        errors: fileWrapper.errors,
      })
    );

    if (!uploadError) {
      setSelectedFiles((curr) => [
        ...curr,
        ...mapppedAccepted,
        ...mappedRejected,
      ]);
    }
    setUploadError(false);
  }, []);

  // Handle File Upload
  const onUpload = async () => {
    setFileUploading(true);
    const fileName = encodeURIComponent(selectedFiles[0].name)
    const fileType = encodeURIComponent(selectedFiles[0].type);
    const selectedModule = courseState.modules?.filter(module => module.id === selectedLesson.moduleID)[0];
    // const lesson = module.lessons?.find(lesson => lesson.id === selectedLesson?.id)

    // Upload Keys
    const folderKey = courseState.courseFolderKey
    const moduleKey = selectedModule?.moduleFolderKey;
    const lessonKey = selectedModule?.lessons?.filter(lesson => lesson.id === selectedLesson.id)[0].lessonFolderKey
    try {
      axios
        .post(`${API_URL}/courses/get-presign-url?fileName=${fileName}&fileType=${fileType}`,
        JSON.stringify({
          data: {
            attributes: { 
              name, 
              folderKey, 
              moduleKey,
              lessonKey
            },
          },
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then(async (response) => {
          if (response.data?.success) {
            console.log(response.data);
            const {
              s3: { uploadUrl, key, folderKey, moduleKey, lessonKey },
            } = response.data;

            updateCourseState('update-keys', { 
              name, 
              selectedModule, 
              selectedLesson, 
              keys: { folderKey, moduleKey, lessonKey },
            })

            const uploadResponse = await uploadProgressRef?.current.startUpload(
              selectedFiles[0],
              uploadUrl,
              key
            );
            if (uploadResponse.secureURL) {
              setUploadedFile(uploadResponse);
              console.log(uploadResponse);

              updateCourseState('file-upload', { 
                name, 
                selectedModule, 
                selectedLesson, 
                keys: { folderKey, moduleKey, lessonKey }, 
                uploadResponse
              })

              setSelectedFiles([]);
              toast.success('File Uploaded Successfully');
            }
          } else {
            toast.error(response?.data.message);
          }
        })
        .catch((error) => {
          if (error.response?.data?.message) {
            return toast.error(error.response.data?.message);
          }
          console.error("Error Uploading file!:", error.message);
          toast.error(error.message);
        })
        .finally(() => {
          setFileUploading(false);
        });
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occured!");
      setFileUploading(false);
    }
  };

  const onRemove = (file) => {
    setFileUploading(true);
    const key = name === 'course-thumbnail' ? 'thumbnail' : 'introductoryVideo'
    try {
      axios
        .delete(`${API_URL}/courses/delete-object?objectKey=${file.objectKey}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then(async (response) => {
          if (response.data?.success) {
            console.log(response.data);
            setUploadedFile(null);
            setCourseState((prev) => ({ ...prev, [key]: null }))
            toast.success('File deleted successfully')
          } else {
            toast.error(response?.data.message);
          }
        })
        .catch((error) => {
          if (error.response?.data?.message) {
            return toast.error(error.response.data?.message);
          }
          console.error("Error Deleting File!:", error.message);
          toast.error(error.message);
        }).finally(() => {
          setFileUploading(false);
        });
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occured!");
      setFileUploading(false);
    }
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

  console.log(
    fileUploading,
    selectedFiles.some((file) => file.errors.length > 0)
  );

  console.log('courseState', courseState, 'lesson', selectedLesson)

  return (
    <>
      <Dropzone onDrop={onDrop} validator={typeValidator} multiple={multiple}>
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone">
            <div className="dz-message needsclick" {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="mb-3 d-flex align-items-center justify-content-center">
                <RiUploadCloudFill className="display-3 text-muted" />
              </div>
              <h4 className="text-muted">
                {title ?? "Drop file here or click to upload."}
              </h4>
            </div>
          </div>
        )}
      </Dropzone>
      <div className="dropzone-previews mt-3" id="file-previews">
        {selectedFiles.map((fileWrapper, index) => (
          <>
            <Card key={index} className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
              <div className="p-2">
                <Row className="align-items-center">
                  <Col className="col-auto">
                    <Link
                      onClick={() =>
                        fn?.handlePreview(fileWrapper.file ?? fileWrapper)
                      }
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
                      ) : <>
                        {fileWrapper.file?.type.includes("video/mp4") ??
                      fileWrapper.type?.includes("video/mp4") ? (
                          <RiVideoFill size={24} />
                        ) : (
                          <AiOutlineFileZip size={24} />
                        )}
                      </>}
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
                        removeFile(fileWrapper.file ?? fileWrapper);
                        fn?.handleRemoveFile(fileWrapper.file ?? fileWrapper);
                      }}
                    >
                      <FaTimes />
                    </button>
                  </Col>
                </Row>
              </div>
            </Card>
            {fileWrapper.errors?.length ? (
              <UploadError
                key={index + "-file"}
                fileWrapper={fileWrapper}
                fn={fn}
                removeFile={removeFile}
              />
            ) : (
              <FileUploadWithProgress
                key={index + "-file"}
                ref={uploadProgressRef}
                fileWrapper={fileWrapper}
                fn={fn}
                removeFile={removeFile}
                setFileUploading={setFileUploading}
              />
            )}
          </>
        ))}
        {uploadedFile && (
          <>
            {uploadedFile.type?.includes('image') ?
            (
              <div className="uploaded-file-thumbnail">
                <img
                  data-dz-thumbnail=""
                  height="80"
                  className="avatar-sm rounded bg-light"
                  alt={uploadedFile?.name ?? uploadedFile.name}
                  src={uploadedFile.preview}
                />
                <FaTimes
                  size={12}
                  className="cursor-pointer"
                  onClick={() => onRemove(uploadedFile)}
                />
              </div>
            ) : (
              <div className="uploaded-video-thumbnail">
                <FaTimes
                  size={12}
                  className="cursor-pointer align-self-end"
                  onClick={() => onRemove(uploadedFile)}
                />
                <RiVideoLine size={40} /> 
                <p className="font-size-12">{uploadedFile.name}</p>
              </div>
            )
            }
          </>
        )}
      </div>

      {buttonText && (
        <div className="text-center mt-4 mb-2">
            <Button
            type="dashed"
            className={`d-flex align-items-center justify-content-center mx-auto btn-danger-custom ${
              fileUploading ? "pointer-events-none" : ""
            }`}
            onClick={onUpload}
            disabled={
              fileUploading ||
              selectedFiles.length === 0 ||
              selectedFiles.some((file) => file.errors.length > 0) ||
              (courseState.introductoryVideo && name === 'introductory-video') ||
              (courseState.thumbnail && name === 'course-thumbnail') 
            }
            style={{
              width: "100%",
            }}
            icon={<RiUploadCloudLine />}
          >
            {!fileUploading ? (
              <>{buttonText ?? "Upload"}</>
            ) : (
              <span>Progressing...</span>
            )}
          </Button>
        </div>
      )}
    </>
  );
};

export default DropItemZone;