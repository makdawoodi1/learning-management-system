import React, { useState, useRef, useContext } from "react";
import { Row, Col, Card, CardHeader, CardBody, Collapse } from "reactstrap";
import { Input, Button, Popconfirm, Select } from "antd";
import Dropzone from "@/components/Dropzone";
import AuthContext from "@/context/context";

// Import Icons
import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { MdArrowDropDown } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  RiEdit2Line,
  RiDeleteBinLine,
  RiUploadCloudLine,
} from "react-icons/ri";

const LessonDetails = ({ Form, form }) => {
  const { courseState, setCourseState } = useContext(AuthContext);
  const getState = () =>
    Object.values(form.getFieldsValue()).some((value) => value !== "");
  const [state, setState] = useState({
    mode: "add",
    selectedModule: null,
    selectedLesson: null,
    selectedFile: null,
    selectedAttachment: "Images",
    active: getState(),
  });
  const [lessons, setLessons] = useState([]);

  // Refs
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  // Functions
  // Handle File preview
  const handlePreview = (file) => {
    console.log(file);
    setState({ ...state, selectedFile: file });
  };

  // Handle Remove File
  const handleRemoveFile = (file) => {
    const removedFile =
      JSON.stringify(state.selectedFile) === JSON.stringify(file)
        ? null
        : state.selectedFile;
    setState({ ...state, selectedFile: removedFile });
  };

  // Clear State
  const clearState = () => {
    form.setFieldValue("title", "");
    form.setFieldValue("description", "");
    setState({
      ...state,
      mode: "add",
      active: getState(),
    });
  };

  // Submit module handler
  const handleLessonSubmit = (values) => {
    const updatedLessons = [...lessons];
    const index =
      updatedLessons.length &&
      updatedLessons?.findIndex(
        (module) =>
          JSON.stringify(module) === JSON.stringify(state.selectedLesson)
      );

    if (state.mode === "add") {
      updatedLessons.push({
        id: lessons.length,
        title: values.title,
        description: values.description,
        collapsed: true,
      });
    } else if (index >= 0 && index < updatedLessons.length)
      updatedLessons[index] = {
        ...updatedLessons[index],
        title: values.title,
        description: values.description,
      };
    setLessons(updatedLessons);
    clearState();
  };

  // Edit module

  const editModule = (lesson) => {
    titleRef.current.input?.focus();
    form.setFieldValue("title", lesson.title);
    form.setFieldValue("description", lesson.description);
    setState({
      ...state,
      mode: "edit",
      selectedLesson: { ...lesson },
      active: getState(),
    });
  };

  // Delete Module
  const deleteModule = (lesson) => {
    const updatedLessons = [...lessons];
    const index = updatedLessons.findIndex(
      (currentLesson) => currentLesson === lesson
    );

    if (index >= 0 && index < updatedLessons.length) {
      updatedLessons.splice(index, 1);
      setLessons(updatedLessons);
    }
  };

  const toggleCollapse = ({ id, collapsed }) => {
    const updatedLessons = lessons.map((lesson) => {
      if (lesson.id === id) {
        return { ...lesson, collapsed: !collapsed };
      } else {
        return { ...lesson, collapsed: true };
      }
    });

    setLessons([...updatedLessons]);
  };

  console.log(courseState)

  return (
    <>
      <Row>
        <Col xs={12} lg={6}>
          <Row>
            <Col xs={12}>
              <Form.Item
                label="Select Module"
                name="module"
                rules={[
                  {
                    required: true,
                    message: "Please select the course module",
                  },
                ]}
              >
                <Select
                  className="w-full"
                  showSearch
                  bordered
                  placeholder="Search Attachments"
                  onChange={(value) =>
                    setState({ ...state, selectedModule: value })
                  }
                  options={courseState?.modules?.map(module => { return { value: module.title, label: module.title } })}
                />
              </Form.Item>
              <Form.Item
                label="Lesson Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input the module title!",
                  },
                ]}
              >
                <Input
                  ref={titleRef}
                  onChange={() =>
                    setState({
                      ...state,
                      active: getState(),
                    })
                  }
                  size="large"
                  className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 "
                  placeholder="Lesson Title"
                />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item
                label="Lesson Description"
                title="Description"
                name="description"
              >
                <Input.TextArea
                  ref={descriptionRef}
                  onChange={() =>
                    setState({
                      ...state,
                      active: getState(),
                    })
                  }
                  size="large"
                  rows={8}
                  className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 "
                  placeholder="Lesson Description"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={state.active ? 10 : 12}>
              <Form.Item>
                <Button
                  type="dashed"
                  className="d-flex align-items-center justify-content-center mx-auto"
                  htmlType="submit"
                  style={{
                    width: "100%",
                  }}
                  icon={
                    state.mode === "add" ? <PlusOutlined /> : <RiEdit2Line />
                  }
                >
                  {state.mode === "add" ? "Add Lesson" : "Edit Lesson"}
                </Button>
              </Form.Item>
            </Col>
            {state.active && (
              <Col xs={12} lg={2}>
                <Form.Item>
                  <Button
                    type="dashed"
                    className="d-flex align-items-center justify-content-center mx-auto btn-danger-custom"
                    onClick={clearState}
                    style={{
                      width: "100%",
                    }}
                  >
                    Cancel
                  </Button>
                </Form.Item>
              </Col>
            )}
          </Row>
        </Col>
        <Col
          xs={12}
          lg={6}
          className="text-center d-flex flex-column justify-content-center"
        >
          <Button
            type="dashed"
            className="d-flex align-items-center justify-content-center btn-primary-border mx-auto w-full my-8"
            // htmlType="submit"
            style={{
              width: "80%",
            }}
            icon={<PlusOutlined />}
          >
            Upload Lesson Attachments
          </Button>
          <h6 className="text-secondary font-weight-normal">
            Total Lessons ({lessons.length})
          </h6>
          {lessons.length > 0 && (
            <Card
              className="mx-auto my-8 "
              style={{
                width: "80%",
                maxHeight: "500px",
                overflow: "auto",
              }}
            >
              <CardBody>
                {lessons?.map((currentLesson) => (
                  <>
                    <div
                      key={currentLesson.id}
                      className="accordion ecommerce my-2"
                    >
                      <div className="accordion-item">
                        <h2
                          className="accordion-header d-flex align-items-center justify-content-between"
                          id={`heading${currentLesson.id}`}
                        >
                          <button
                            className={`accordion-button${
                              currentLesson.collapsed ? " collapsed" : ""
                            }`}
                            onClick={() => toggleCollapse(currentLesson)}
                            type="button"
                          >
                            {currentLesson.title}
                          </button>
                          <div className="d-flex gap-2 px-2 cursor-pointer font-size-20 text-muted ">
                            <RiEdit2Line
                              color="#62A2B8"
                              onClick={() => editModule(currentLesson)}
                            />
                            <Popconfirm
                              title="Delete Module"
                              description="Are you sure to delete this module?"
                              okButtonProps={{
                                danger: true,
                              }}
                              icon={
                                <QuestionCircleOutlined className="text-danger" />
                              }
                              onConfirm={() => deleteModule(currentLesson)}
                            >
                              <RiDeleteBinLine color="#DE3545" />
                            </Popconfirm>
                          </div>
                        </h2>
                        <Collapse
                          isOpen={!currentLesson.collapsed}
                          className="accordion-collapse"
                        >
                          <div className="accordion-body font-size-14 text-left p-2">
                            {currentLesson.description}
                          </div>
                        </Collapse>
                      </div>
                    </div>
                  </>
                ))}
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
      <Row>
        <Col
          xs={12}
          className="text-center d-flex flex-column justify-content-center mt-4"
        >
          <hr />
          <h6 className="text-secondary font-weight-normal">Course Content</h6>
          <Col xs={12}>
            <Input.TextArea
              // ref={descriptionRef}
              // onChange={() =>
              //   setState({
              //     ...state,
              //     active: getState(),
              //   })
              // }
              size="large"
              rows={8}
              className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 "
              placeholder="Course Content"
            />
          </Col>
        </Col>
      </Row>
      <Row className="gap-y-8 d-flex align-items-center">
        <Col
          xs={12}
          className="text-center d-flex flex-column justify-content-center mt-4"
        >
          <hr />
          <h6 className="text-secondary font-weight-normal">Attachments</h6>
        </Col>
        <Col
          xs={12}
          lg={5}
          className="d-flex flex-column justify-content-center gap-y-8"
        >
          <div className="d-flex gap-x-6 gap-y-8">
            <Select
              className="w-full"
              showSearch
              bordered
              placeholder="Search Attachments"
              onChange={(value) =>
                setState({ ...state, selectedAttachment: value })
              }
              options={[
                { value: "Images", label: "Images" },
                { value: "Videos", label: "Videos" },
              ]}
            />
            <Button
              type="dashed"
              className="d-flex align-items-center justify-content-center mx-auto w-auto"
              // htmlType="submit"
              style={{
                width: "100%",
              }}
              icon={<PlusOutlined />}
            >
              Upload Attachments
            </Button>
          </div>
          <Dropzone
            name="attachment"
            Form={Form}
            title={`Upload ${state.selectedAttachment}`}
            fn={{ handlePreview, handleRemoveFile }}
          />
        </Col>
        <Col xs={12} lg={7} className="text-center">
          {!state?.selectedFile ? (
            <h6 className="text-secondary font-weight-normal">Preview</h6>
          ) : (
            <>
              <Card className="image-preview-container">
                {state.selectedAttachment === "Images" ? (
                  <img
                    src={state.selectedFile?.preview}
                    alt={state.selectedFile?.name}
                    className="image-preview"
                  />
                ) : (
                  <video src={state.selectedFile?.preview} controls></video>
                )}
              </Card>
              <Button
                type="dashed"
                className="my-3 btn-danger-custom"
                onClick={() => setState({ ...state, selectedFile: null })}
              >
                Close
              </Button>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default LessonDetails;
