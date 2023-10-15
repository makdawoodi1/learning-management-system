import React, { useCallback, useEffect, useRef, useState } from "react";

//Import Breadcrumb
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Card, CardBody, CardImg, Col, Container, Row } from "reactstrap";
import { Button, Form, Input } from "antd";
import useAuth from "@/hooks/useAuth";
import useLogout from "@/hooks/useLogout";
import axios from "@/services/axios";
import { API_URL, AWS_CLOUDFRONT_DOMAIN } from "@/config/config";
import { Spin } from "antd";
import Dropzone from "react-dropzone";
import toast from "react-hot-toast";
import {
  RiUploadCloudFill,
  RiUploadCloudLine,
  RiVideoFill,
} from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import UploadError from "@/components/UploadError";
import FileUploadWithProgress from "@/components/FileUploadWithProgress";

const Profile = () => {
  const [breadcrumbItems] = useState([
    { title: "Dashboard", link: "/auth/dashboard" },
    { title: "Profile", link: "/auth/profile" },
  ]);
  const { auth, setAuth } = useAuth();
  const logout = useLogout();
  const [form] = Form.useForm();
  const [editState, setEditState] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});

  // Dropzone
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileUploading, setFileUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState({});
  const [uploadError, setUploadError] = useState(false);
  const uploadProgressRef = useRef(null);

  // File Type Validator
  const acceptedFilesTypes = ["image/jpeg", "image/png"];
  const maxFileSize = 1000 * 1024 * 1024;
  const typeValidator = (file) => {
    if (auth.profileImage) {
      setUploadError(true);
      return toast.error("Can upload only 1 profile picture");
    }

    if (!acceptedFilesTypes.includes(file.type)) {
      return {
        code: "invalid-file-type",
        message: "Invalid file type",
      };
    }

    if (file.type.startsWith("image/")) {
      if (file.size > maxFileSize) {
        // 100MB limit
        return {
          code: "size-too-large",
          message: `Image file is larger than ${formatBytes(maxFileSize)}`,
        };
      }
    }
    return null;
  };

  // Handle File Drop
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
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

  //   Removes Files
  const removeFile = (file) => {
    const selectedFile = file?.file ?? file;
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

  // Handle File Upload
  const onUpload = async () => {
    setFileUploading(true);
    const fileName = encodeURIComponent(selectedFiles[0].name);
    const fileType = encodeURIComponent(selectedFiles[0].type);

    try {
      axios
        .post(
          `${API_URL}/auth/get-presign-url?username=${user.username}&fileName=${fileName}&fileType=${fileType}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then(async (response) => {
          if (response.data?.success) {
            const {
              s3: { uploadUrl, key },
            } = response.data;

            const uploadResponse = await uploadProgressRef?.current.startUpload(
              selectedFiles[0],
              uploadUrl,
              key
            );
            if (uploadResponse.secureURL) {
              setUploadedFile(uploadResponse);
              setSelectedFiles([]);

              try {
                axios
                  .put(
                    `${API_URL}/auth/update-profile-picture`,
                    JSON.stringify({
                      data: {
                        attributes: {
                          username: user.username,
                          file: uploadResponse,
                        },
                      },
                    }),
                    {
                      headers: { "Content-Type": "application/json" },
                      withCredentials: true,
                    }
                  )
                  .then(async (response) => {
                    if (response.data?.success) {
                      const userProfilePicture =
                        response.data?.userProfilePicture;
                      setUser((prev) => ({
                        ...prev,
                        profile_picture: userProfilePicture,
                      }));
                      setAuth((prev) => ({
                        ...prev,
                        profileImage: userProfilePicture,
                      }));
                      toast.success("File has been uploaded successfully");
                      return setEditState(false);
                    }
                    toast.error(response?.data.message);
                  });
              } catch (error) {
                if (error.response?.data?.message) {
                  return toast.error(error.response.data?.message);
                }
                console.error("Error Uploading file!:", error.message);
                toast.error(error.message);
              }
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
    try {
      axios
        .delete(`${API_URL}/auth/delete-object?objectKey=${file.objectKey}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then(async (response) => {
          if (response.data?.success) {
            // setUser((prev) => ({ ...prev, profile_picture: null }));
            // setUploadedFile({});
            // setAuth((prev) => ({ ...prev, profileImage: null }))
            // toast.success("File deleted successfully");
            try {
              axios
                .put(
                  `${API_URL}/auth/update-profile-picture`,
                  JSON.stringify({
                    data: {
                      attributes: { username: user.username, file: null },
                    },
                  }),
                  {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                  }
                )
                .then(async (response) => {
                  if (response.data?.success) {
                    setUser((prev) => ({ ...prev, profile_picture: null }));
                    setUploadedFile({});
                    setAuth((prev) => ({ ...prev, profileImage: null }));
                    toast.success("File deleted successfully");
                    return setEditState(false);
                  }
                  toast.error(response?.data.message);
                });
            } catch (error) {
              if (error.response?.data?.message) {
                return toast.error(error.response.data?.message);
              }
              console.error("Error Uploading file!:", error.message);
              toast.error(error.message);
            }
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

  //   Formats the size
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const updateUser = () => {
    if (!editState) return setEditState(!editState);
    const values = form.getFieldsValue();

    try {
      setProcessing(true);
      setIsLoading(true);
      axios
        .put(
          `${API_URL}/auth/update-user?username=${auth?.username}`,
          JSON.stringify({
            data: {
              attributes: {
                ...values,
              },
            },
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then(async (response) => {
          if (response.data?.success) {
            const user = response.data?.user;
            form.setFieldValue("firstname", user.firstname);
            form.setFieldValue("lastname", user.lastname);
            form.setFieldValue("email", user.email);
            setUser(user);
            toast.success("User information has been updated successfully");
            return setEditState(false);
          }
          toast.error(response?.data.message);
        })
        .catch((error) => {
          if (error.response?.data?.message) {
            return toast.error(error.response.data?.message);
          }
          console.error("Error updating user information!:", error.message);
          toast.error(error.message);
        })
        .finally(() => {
          setProcessing(false);
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occured!");
      setProcessing(false);
    }
  };

  useEffect(() => {
    const fetchUser = async (req, res) => {
      try {
        setIsLoading(true);
        axios
          .get(`${API_URL}/auth/fetch-user?username=${auth?.username}`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          })
          .then((response) => {
            if (response.data?.success) {
              const user = response.data?.user;
              form.setFieldValue("firstname", user.firstname);
              form.setFieldValue("lastname", user.lastname);
              form.setFieldValue("email", user.email);
              setUser(user);
            }
            toast.success("Successfully fetched the user");
          })
          .catch((error) => {
            if (error.response?.status === 403) logout();

            if (error.response?.data?.message) {
              return toast.error(error.response.data?.message);
            }
            console.error("Error Fetching user!:", error.message);
          })
          .finally(() => setIsLoading(false));
      } catch (error) {
        console.error(error);
        toast.error("Unexpected error occured!");
      }
    };

    fetchUser();
  }, [auth]);

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Profile" breadcrumbItems={breadcrumbItems} />

        {isLoading ? (
          <div id="backdrop">
            <div class="text-custom-center loading">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        ) : (
          <Row>
            <Col xs={12}>
              <Card>
                <h6 className="text-secondary font-weight-bold d-flex align-items-center pl-8 mt-4">
                  Profile Settings
                </h6>
                <hr />
                <Form
                  form={form}
                  onFinish={updateUser}
                  name="profile-form"
                  layout="vertical"
                  className="pt-0 mt-0 px-12 gap-8"
                >
                  {editState ? (
                    <div className="w-50 mx-auto">
                      <Dropzone
                        onDrop={onDrop}
                        validator={typeValidator}
                        multiple={false}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div className="dropzone cursor-pointer">
                            <div
                              className="dz-message needsclick"
                              {...getRootProps()}
                            >
                              <Form.Item
                                rules={[
                                  ({ getFieldValue }) => ({
                                    validator(_, value) {
                                      if (!user.profile_picture) {
                                        return Promise.reject(
                                          new Error(
                                            `Please upload profile picture`
                                          )
                                        );
                                      }
                                      return Promise.resolve();
                                    },
                                  }),
                                ]}
                              >
                                <input {...getInputProps()} />
                              </Form.Item>
                              <div className="mb-3 d-flex align-items-center justify-content-center">
                                <RiUploadCloudFill className="display-3 text-muted" />
                              </div>
                              <h4 className="text-muted">
                                {"Drop file here or click to upload."}
                              </h4>
                            </div>
                          </div>
                        )}
                      </Dropzone>
                      <div
                        className="dropzone-previews mt-3"
                        id="file-previews"
                      >
                        {selectedFiles.map((fileWrapper, index) => (
                          <div key={index}>
                            <Card className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
                              <div className="p-2">
                                <Row className="align-items-center">
                                  <Col className="col-auto">
                                    <Link>
                                      <img
                                        data-dz-thumbnail=""
                                        height="80"
                                        className="avatar-sm rounded bg-light"
                                        alt={
                                          fileWrapper.file?.name ??
                                          fileWrapper.name
                                        }
                                        src={fileWrapper.preview}
                                      />
                                    </Link>
                                  </Col>
                                  <Col className="d-flex align-items-center justify-content-between">
                                    <div className="text-center">
                                      <p className="text-muted fw-bold font-size-12 m-0">
                                        {fileWrapper.file?.name ??
                                          fileWrapper.name}
                                      </p>
                                      <p className="m-0 font-size-14">
                                        <strong>
                                          {fileWrapper.formattedSize}
                                        </strong>
                                      </p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        removeFile(
                                          fileWrapper.file ?? fileWrapper
                                        );
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
                                removeFile={removeFile}
                              />
                            ) : (
                              <FileUploadWithProgress
                                key={index + "-file"}
                                ref={uploadProgressRef}
                                fileWrapper={fileWrapper}
                                removeFile={removeFile}
                                setFileUploading={setFileUploading}
                              />
                            )}
                          </div>
                        ))}
                        {auth.profileImage && (
                          <div className="uploaded-file-thumbnail">
                            <img
                              data-dz-thumbnail=""
                              height="80"
                              className="avatar-sm rounded bg-light"
                              alt={auth.profileImage.name}
                              src={auth.profileImage.objectKey}
                            />
                            <FaTimes
                              size={12}
                              className="cursor-pointer"
                              onClick={() => onRemove(auth.profileImage)}
                            />
                          </div>
                        )}
                      </div>
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
                            selectedFiles.some((file) => file.errors.length > 0)
                          }
                          style={{
                            width: "100%",
                          }}
                          icon={<RiUploadCloudLine />}
                        >
                          {!fileUploading ? (
                            <span>Upload</span>
                          ) : (
                            <span>Progressing...</span>
                          )}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <CardImg
                      src={
                        auth.profileImage
                          ? auth.profileImage.objectKey
                          : "/author.jpg"
                      }
                      alt="Profile Picture"
                      className="rounded-circle border-8 avatar-lg profile-picture"
                    />
                  )}
                  <CardBody className="p-6 mt-2 d-flex flex-column">
                    <Row className="place-items-center">
                      <Col xs={12} lg={6}>
                        <Form.Item label="First Name" name="firstname">
                          <Input
                            disabled={!editState}
                            size="large"
                            className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 "
                            placeholder="First Name"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={12} lg={6}>
                        <Form.Item label="Last Name" name="lastname">
                          <Input
                            disabled={!editState}
                            size="large"
                            className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 "
                            placeholder="Last Name"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row className="place-items-center">
                      <Col xs={12}>
                        <Form.Item label="Email" name="email">
                          <Input
                            disabled={!editState}
                            size="large"
                            className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 "
                            placeholder="Email"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <div className="d-flex align-items-center justify-content-center gap-8">
                      <button
                        type="button"
                        className="btn-primary-custom mt-4 px-4 w-fit align-self-center"
                        onClick={updateUser}
                        disabled={processing}
                      >
                        {processing
                          ? "Processing..."
                          : editState
                          ? "Submit"
                          : "Edit User Details"}
                      </button>
                      {editState && (
                        <button
                          type="button"
                          className="btn btn-secondary mt-4 px-4 w-fit align-self-center"
                          disabled={processing}
                          onClick={() => setEditState(!editState)}
                        >
                          Revert
                        </button>
                      )}
                    </div>
                  </CardBody>
                </Form>
                <hr />
                <h6 className="text-secondary font-weight-bold d-flex align-items-center pl-8 mt-2 mb-4">
                  Payment Settings
                </h6>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Profile;
