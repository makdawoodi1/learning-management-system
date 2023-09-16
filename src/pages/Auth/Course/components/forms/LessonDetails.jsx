import React, { useState, useRef, useContext } from "react";
import { Row, Col, Card, CardHeader, CardBody, Collapse } from "reactstrap";
import { Input, Button, Popconfirm, Select } from "antd";
import Dropzone from "@/components/Dropzone";
import AuthContext from "@/context/context";
import { generateUniqueID } from "@/helpers/helper";

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
    lessons: [],
    active: getState(),
  });

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
    form.setFieldValue("lesson-title", "");
    form.setFieldValue("lesson-description", "");
    setState({
      ...state,
      mode: "add",
      active: getState(),
    });
  };

  // Submit lesson handler
  const handleLessonSubmit = () => {
    const values = form.getFieldsValue();
    if (values['lesson-title'] === '' || values['lesson-description'] === '') return
    
    const currentModule = courseState.modules?.find(module => module.id === state.selectedModule)
    const currentLesson = currentModule.lessons?.find(lesson => lesson.id === state.selectedLesson?.id)
    const moduleIndex = courseState.modules?.indexOf(currentModule)
    const lessonIndex = currentModule.lessons?.indexOf(currentLesson)
    
    const addLesson = () => {
      currentModule.lessons.push({
        id: generateUniqueID(),
        moduleID: currentModule.id,
        lessonFolderKey: null,
        title: values["lesson-title"],
        description: values["lesson-description"],
        lessonFiles: [],
        collapsed: true,
        completed: false,
      })
    }

    const editLesson = index => {
      currentLesson.title = values['lesson-title']
      currentLesson.description = values['lesson-description']

      return setCourseState((prev) => ({
        ...prev,
        modules: [
          ...prev.modules.slice(0, moduleIndex),
          {
            ...prev.modules[moduleIndex],
            lessons: [
              ...prev.modules[moduleIndex].lessons.slice(0, lessonIndex),
              { ...currentLesson },
              ...prev.modules[moduleIndex].lessons.slice(lessonIndex + 1),
            ],
          },
          ...prev.modules.slice(moduleIndex + 1),
        ],
      }));
    }

    switch(state.mode) {
      case "add":
        addLesson();
        break;
      
      case "edit":
        editLesson(moduleIndex, lessonIndex);
        break;
    }

    // setCourseState((prev) => ({ ...prev, lessons: [...prev.lessons, currentLesson] }))
    setState({
      ...state,
      mode: "add",
      lessons: courseState.lessons,
    });
    form.setFieldValue("lesson-title", "");
    form.setFieldValue("lesson-description", "");
  }

  // Submit module handler
  // const handleLessonSubmit = () => {
  //   const values = form.getFieldsValue();
  //   if (values["lesson-title"] === "" || values["lesson-description"] === "")
  //     return;

  //   const updatedLessons = [...state.lessons];
  //   const index =
  //     updatedLessons.length &&
  //     updatedLessons?.findIndex(
  //       (lesson) =>
  //         JSON.stringify(lesson) === JSON.stringify(state.selectedLesson)
  //     );

  //   if (state.mode === "add") {
  //     updatedLessons.push({
  //       id: state.lessons?.length + 1,
  //       title: values["lesson-title"],
  //       description: values["lesson-description"],
  //       collapsed: true,
  //     });
  //   } else if (index >= 0 && index < updatedLessons.length)
  //     updatedLessons[index] = {
  //       ...updatedLessons[index],
  //       title: values["lesson-title"],
  //       description: values["lesson-description"],
  //     };

  //   const currentModule = courseState.modules?.find(
  //     (module) => state.selectedModule === module.id
  //   );
  //   const moduleIndex = courseState.modules?.indexOf(currentModule);
  //   if (currentModule) {
  //     currentModule.lessons = [...updatedLessons];

  //     setCourseState((prev) => {
  //       const updatedModules = [...prev.modules]; // Create a copy of the modules array

  //       if (moduleIndex !== -1) updatedModules[moduleIndex] = currentModule;
  //       else updatedModules[moduleIndex].lessons.push(currentModule);

  //       return { ...prev, modules: updatedModules };
  //     });

  //     setState({
  //       ...state,
  //       mode: "add",
  //       lessons: updatedLessons,
  //     });

  //     form.setFieldValue("lesson-title", "");
  //     form.setFieldValue("lesson-description", "");
  //   }
  // };

  // Edit module

  const editModule = (lesson) => {
    titleRef.current.input?.focus();
    form.setFieldValue("lesson-title", lesson.title);
    form.setFieldValue("lesson-description", lesson.description);
    setState({
      ...state,
      mode: "edit",
      selectedLesson: { ...lesson },
      active: getState(),
    });
  };

  // Delete Module
  const deleteModule = (lesson) => {
    const updatedLessons = [...state.lessons];
    const index = updatedLessons.findIndex(
      (currentLesson) => currentLesson === lesson
    );

    if (index >= 0 && index < updatedLessons.length) {
      updatedLessons.splice(index, 1);
      setState({
        ...state,
        lessons: updatedLessons,
      });
    }
  };

  const toggleCollapse = ({ id, collapsed }) => {
    const updatedLessons = courseState.modules
      .find((module) => module.id === state?.selectedModule)
      .lessons?.map((lesson) => {
        if (lesson.id === id) {
          return { ...lesson, collapsed: !collapsed };
        } else {
          return { ...lesson, collapsed: true };
        }
      });

    setState({ ...state, lessons: updatedLessons });
  };

  console.log(courseState);

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
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (courseState.modules?.length === 0 && !value) {
                        return Promise.reject(new Error("Please add module"));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Select
                  className="w-full"
                  showSearch
                  bordered
                  placeholder="Search Module"
                  onChange={(value) =>
                    setState({ ...state, selectedModule: value })
                  }
                  options={courseState.modules?.map((module) => {
                    return { value: module.id, label: module.title };
                  })}
                />
              </Form.Item>
              <Form.Item
                label="Lesson Title"
                name="lesson-title"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (courseState.modules?.length === 0 && !value) {
                        return Promise.reject(new Error("Please add module!"));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input
                  ref={titleRef}
                  disabled={!state.selectedModule}
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
                name="lesson-description"
              >
                <Input.TextArea
                  ref={descriptionRef}
                  disabled={!state.selectedModule}
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
                  onClick={handleLessonSubmit}
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
          <h6 className="text-secondary font-weight-normal">
            Total Lessons (
            {courseState.modules?.find(
              (module) => module.id === state?.selectedModule
            )?.lessons.length ?? 0}
            )
          </h6>
          {courseState.modules?.find(
            (module) => module.id === state?.selectedModule
          )?.lessons?.length > 0 && (
            <Card
              className="mx-auto my-8 "
              style={{
                width: "80%",
                maxHeight: "500px",
                overflow: "auto",
              }}
            >
              <CardBody>
                {courseState.modules
                  .find((module) => module.id === state?.selectedModule)
                  .lessons?.map((currentLesson) => (
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
          className="d-flex flex-column justify-content-center"
        >
          <Row>
            <Col xs={12} lg={6}>
              <Form.Item
                name="lesson"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (courseState.modules?.length === 0 && !value)
                        return Promise.reject(new Error("Please add module"));
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Select
                  className="w-full"
                  disabled={!form.getFieldValue('module')}
                  showSearch
                  bordered
                  placeholder="Select Lesson"
                  onChange={(value) =>
                    setState({ ...state, selectedLesson: value })
                  }
                  options={courseState.modules
                    .find((module) => module.id === state.selectedModule)
                    ?.lessons?.map(lesson => ({ value: lesson.id, label: lesson.title }))}
                />
              </Form.Item>
            </Col>
            <Col xs={12} lg={6}>
              <Form.Item
                name="attachment"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (courseState.modules?.length === 0 && !value)
                        return Promise.reject(new Error("Please add module"));
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Select
                  className="w-full"
                  disabled={!form.getFieldValue('lesson')}
                  showSearch
                  bordered
                  placeholder="Select Attachments"
                  onChange={(value) =>
                    setState({ ...state, selectedAttachment: value })
                  }
                  options={[
                    { value: "Images", label: "Images" },
                    { value: "Videos", label: "Videos" },
                    { value: "Zip", label: "Zip" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          {form.getFieldValue('lesson') && form.getFieldValue('attachment') && 
            <>
              {courseState.modules
                .find((module) => module.id === state.selectedModule)
                ?.lessons?.filter(lesson => lesson.id === state.selectedLesson)
                ?.map((lesson) => (
                  <Dropzone
                  name="lesson-files"
                  selectedLesson={lesson}
                  buttonText="Upload"
                  acceptedFileTypes={
                    state.selectedAttachment === "Images"
                      ? ["image/jpeg", "image/png"]
                      : state.selectedAttachment === "Videos"
                      ? ["video/mp4"]
                      : ["application/zip"]
                  }
                  maxFileSize={100 * 1024 * 1024}
                  multiple={false}
                  title={`Upload ${state.selectedAttachment}`}
                  fn={{ handlePreview, handleRemoveFile }}
                />))
              }
            </>
          }
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
