import React, { useContext, useEffect, useRef, useState } from "react";
import { Card, CardBody, Col, Collapse, Row } from "reactstrap";
import { Select, Input, InputNumber, Cascader, Popconfirm, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import AuthContext from "@/context/context";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import { generateUniqueID, filterAndValidateQuiz } from "@/helpers/helper";
import { API_URL } from "@/config/config";
import toast from "react-hot-toast";
import axios from "@/services/axios";

const QuizDetails = ({ Form, form, handleSubmit, rootState, setRootState }) => {
  // Refs
  const titleRef = useRef(null);

  const { courseState, setCourseState, auth } = useContext(AuthContext);
  const [state, setState] = useState({
    mode: "add",
    selectedModule: null,
    selectedQuiz: null,
    quizzes: [],
    active: null,
  });
  const getState = () => {
    const selectedKeys = [
      "quiz-title",
      "quiz-description",
      "quiz-attempt-timer",
      "quiz-attempt-passing-marks",
      "quiz-attempt-numbers",
    ];
    const filteredObject = Object.keys(form.getFieldsValue()).reduce(
      (result, key) => {
        if (selectedKeys.includes(key)) result[key] = form.getFieldValue(key);
        return result;
      },
      {}
    );
    return Object.values(filteredObject).some((value) => value !== "");
  };

  const handleQuizSubmit = () => {
    const values = form.getFieldsValue();
    let quiz;
    if (
      !values["module"] ||
      !values["quiz-attempt-numbers"] ||
      !values["quiz-attempt-passing-marks"] ||
      !values["quiz-attempt-timer"] ||
      !values["quiz-attempt-timer-option"] ||
      !values["quiz-description"] ||
      !values["quiz-title"]
    )
      return;

    const currentModule = courseState.modules?.find(
      (module) => module.id === values["module"]
    );
    const currentQuiz = currentModule.quizzes?.find(
      (quiz) => quiz.id === state.selectedQuiz?.id
    );
    const moduleIndex = courseState.modules?.indexOf(currentModule);
    const quizIndex = currentModule.quizzes?.indexOf(currentQuiz);

    const addQuiz = () => {
      quiz = ({
        id: generateUniqueID(),
        moduleID: currentModule.id,
        quizTitle: values["quiz-title"],
        quizDescription: values["quiz-description"],
        quizTimer: values["quiz-attempt-timer"],
        quizTimerOptions: values["quiz-attempt-timer-option"],
        quizAttemptNumbers: parseInt(values["quiz-attempt-numbers"]),
        quizPassingMarks: parseInt(values["quiz-attempt-passing-marks"]),
        questions: [],
        collapsed: true,
        completed: false,
      });

      const filteredData = filterAndValidateQuiz(quiz);
      const errorKeys = Object.keys(filteredData.errors);
      if (errorKeys.length > 0) {
        return toast.error(Object.values(filteredData.errors)[0]);
      }

      try {
        axios
          .post(
            `${API_URL}/quizzes/create-quiz?username=${auth?.username}`,
            JSON.stringify({
              data: {
                attributes: {
                  ...filteredData,
                  moduleID: currentModule.id
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
              toast.success("Quiz has been created successfully");
              currentModule.quizzes.push(response.data.quiz);
              setState({
                ...state,
                mode: "add",
                quizzes: [...state.quizzes, response.data.quiz]
              });
            } else {
              toast.error(response?.data.message);
            }
          })
          .catch((error) => {
            if (error.response?.data?.message) {
              return toast.error(error.response.data?.message);
            }
            console.error("Error creating Quiz!:", error.message);
            toast.error(error.message);
          });
      } catch (error) {
        console.error(error);
        toast.error("Unexpected error occured!");
      }
    };

    const editQuiz = () => {
      currentQuiz.moduleID = currentModule.id,
      currentQuiz.quizTitle = values["quiz-title"],
      currentQuiz.quizDescription = values["quiz-description"],
      currentQuiz.quizTimer = values["quiz-attempt-timer"],
      currentQuiz.quizTimerOptions = values["quiz-attempt-timer-option"],
      currentQuiz.quizAttemptNumbers = parseInt(values["quiz-attempt-numbers"]),
      currentQuiz.quizPassingMarks = parseInt(values["quiz-attempt-passing-marks"])

      const filteredData = filterAndValidateQuiz(currentQuiz);
      const errorKeys = Object.keys(filteredData.errors);
      if (errorKeys.length > 0) {
        return toast.error(Object.values(filteredData.errors)[0]);
      }

      try {
        axios
          .put(
            `${API_URL}/quizzes/edit-quiz?username=${auth?.username}&quizID=${currentQuiz.id}`,
            JSON.stringify({
              data: {
                attributes: {
                  ...filteredData,
                  moduleID: currentModule.id
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
              toast.success("Quiz has been updated successfully");
              
              // Updating Quiz State
              setCourseState((prev) => ({
                ...prev,
                modules: [
                  ...prev.modules.slice(0, moduleIndex),
                  {
                    ...prev.modules[moduleIndex],
                    quizzes: [
                      ...prev.modules[moduleIndex].quizzes.slice(0, quizIndex),
                      { ...currentQuiz },
                      ...prev.modules[moduleIndex].quizzes.slice(quizIndex + 1),
                    ],
                  },
                  ...prev.modules.slice(moduleIndex + 1),
                ],
              }));
            } else {
              toast.error(response?.data.message);
            }
          })
          .catch((error) => {
            if (error.response?.data?.message) {
              return toast.error(error.response.data?.message);
            }
            console.error("Error updating Quiz!:", error.message);
            toast.error(error.message);
          });
      } catch (error) {
        console.error(error);
        toast.error("Unexpected error occured!");
      }
    };
    

    switch (state.mode) {
      case "add":
        addQuiz();
        break;

      case "edit":
        editQuiz();
        break;
    }

    form.setFieldValue("quiz-attempt-numbers", "");
    form.setFieldValue("quiz-attempt-passing-marks", "");
    form.setFieldValue("quiz-attempt-timer", "");
    form.setFieldValue("quiz-attempt-timer-option", "");
    form.setFieldValue("quiz-description", "");
    form.setFieldValue("quiz-title", "");
  };

  const editQuiz = (quiz) => {
    titleRef.current.input?.focus();
    form.setFieldValue("quiz-title", quiz.quizTitle);
    form.setFieldValue("quiz-description", quiz.quizDescription);
    form.setFieldValue("quiz-attempt-timer", quiz.quizTimer);
    form.setFieldValue("quiz-attempt-timer-option", quiz.quizTimerOptions);
    form.setFieldValue("quiz-attempt-numbers", quiz.quizAttemptNumbers);
    form.setFieldValue("quiz-attempt-passing-marks", quiz.quizPassingMarks);
    setState({
      ...state,
      mode: "edit",
      selectedQuiz: { ...quiz },
      active: getState()
    });
  };

  // Delete Module
  const deleteQuiz = (selectedQuiz) => {
    const currentModule = courseState.modules?.find(
      (module) => module.id === state.selectedModule
    );
    const currentQuiz = currentModule.quizzes?.find(
      (quiz) => quiz.id === selectedQuiz?.id
    );

    try {
      axios
        .delete(
          `${API_URL}/quizzes/delete-quiz?username=${auth?.username}&quizID=${selectedQuiz.id}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then(async (response) => {
          if (response.data?.success) {

            // Deleting Quiz State
            setCourseState((prev) => ({
              ...prev,
              modules: prev.modules.map((module) => {
                if (module.id === currentModule.id) {
                  return {
                    ...module,
                    quizzes: module.quizzes.filter(
                      (quiz) => quiz.id !== currentQuiz.id
                    ),
                  };
                }
                return module;
              }),
            }));

            toast.success("Quiz has been deleted successfully");
          } else {
            toast.error(response?.data.message);
          }
        })
        .catch((error) => {
          if (error.response?.data?.message) {
            return toast.error(error.response.data?.message);
          }
          console.error("Error deleting Quiz Question!:", error.message);
          toast.error(error.message);
        });
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occured!");
    }
  };

  const toggleCollapse = ({ id, collapsed }) => {
    const currentModule = courseState.modules?.find(
      (module) => module.id === state.selectedModule
    );
    // const currentQuiz = currentModule.quizzes?.find(
    //   (quiz) => quiz.id === state.selectedLesson?.id
    // );

    const updatedModules = courseState.modules.map((module) => {
      if (module.id === state.selectedModule) {
        const updatedQuizzes = module.quizzes.map((quiz) => {
          if (quiz.id === id) {
            return { ...quiz, collapsed: !collapsed };
          } else {
            return { ...quiz, collapsed: true };
          }
        });
        return { ...module, quizzes: updatedQuizzes };
      }
      return module;
    });

    setCourseState((prev) => ({
      ...prev,
      modules: updatedModules,
    }));
  };

  // Clear State
  const clearState = () => {
    form.setFieldValue("quiz-title", "");
    form.setFieldValue("quiz-description", "");
    form.setFieldValue("quiz-attempt-timer", "");
    form.setFieldValue("quiz-attempt-timer-option", "");
    form.setFieldValue("quiz-attempt-numbers", "");
    form.setFieldValue("quiz-attempt-passing-marks", "");
    setState({
      ...state,
      mode: "add",
      active: getState(),
    });
  };

  return (
    <>
      <Row className="place-items-center">
        <Col xs={12} lg={6}>
          <Row>
            <Col xs={12}>
              <Form.Item
                label="Quiz Title"
                name="quiz-title"
                rules={[
                  {
                    required: true,
                    message: "Please input the quiz title!",
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
                  placeholder="Quiz Title"
                />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item
                label="Quiz Description"
                title="Description"
                name="quiz-description"
              >
                {/* <Editor 
                  value={editorContent}
                  onChange={(value) => setEditorContent(value)}
                /> */}
                <Input.TextArea
                  size="large"
                  onChange={() =>
                    setState({
                      ...state,
                      active: getState(),
                    })
                  }
                  rows={8}
                  className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 "
                  placeholder="Quiz Description"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
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
                  setState({ ...state, selectedModule: value, active: getState() })
                }
                options={courseState.modules?.map((module, index) => {
                  return {
                    key: index,
                    value: module.id,
                    label: module.title,
                  };
                })}
              />
            </Form.Item>
            <Form.Item
              label="Set the Quiz Timer"
              name="quiz-attempt-timer"
              rules={[
                {
                  pattern: /^(3[0-9]|[4-5][0-9]|60)$/,
                  message:
                    "Please input a number between 30 and 60 (seconds or minutes) for the quiz attempts!",
                },
              ]}
            >
              <InputNumber
                className="w-full rounded placeholder:text-sm placeholder:text-gray-500 border-gray-500"
                onChange={() =>
                  setState({
                    ...state,
                    active: getState(),
                  })
                }
                addonAfter={
                  <Form.Item name="quiz-attempt-timer-option" noStyle>
                    <Select
                      onChange={() =>
                        setState({
                          ...state,
                          active: getState(),
                        })
                      }
                      style={{
                        width: 100,
                      }}
                    >
                      <Select.Option value="seconds">Seconds</Select.Option>
                      <Select.Option value="minutes">Minutes</Select.Option>
                    </Select>
                  </Form.Item>
                }
              />
            </Form.Item>
            <Form.Item
              label="Number of Attempts"
              name="quiz-attempt-numbers"
              rules={[
                {
                  required: true,
                  message:
                    "Please input the number of attempts required for this quiz!",
                },
                {
                  pattern: /^(?:[3-9]|1[0-2])$/,
                  message:
                    "Please input a number between 3 and 12 for the quiz attempts!",
                },
              ]}
            >
              <Input
                type="number"
                addonAfter="Number of Attempts"
                onChange={(e) => {
                  form.setFieldValue("quiz-attempts", e.target.value)
                  setState({
                    ...state,
                    active: getState(),
                  })
                }}
                size="large"
                className="w-full rounded placeholder:text-sm placeholder:text-gray-500 border-gray-500 "
                placeholder="Add Number of attempts"
              />
            </Form.Item>
            <Form.Item
              label="Passing Marks"
              name="quiz-attempt-passing-marks"
              rules={[
                {
                  required: true,
                  message:
                    "Please input the percentage of marks required for this quiz!",
                },
                {
                  pattern: /^(?:[5-7][0-9]|80)$/,
                  message:
                    "Please input a number between 50 and 80 for the quiz attempts!",
                },
              ]}
            >
              <Input
                type="number"
                addonAfter="Passing marks (in %)"
                onChange={(e) => {
                  form.setFieldValue(
                    "quiz-attempt-passing-marks",
                    e.target.value
                  )
                  setState({
                    ...state,
                    active: getState(),
                  })
                }}
                size="large"
                className="w-full rounded placeholder:text-sm placeholder:text-gray-500 border-gray-500 "
                placeholder="Add passing marks (in %)"
              />
            </Form.Item>
            <Form.Item>
              <Popconfirm
                title="Add Quiz to the course"
                description="Are you sure to add quiz to this course?"
                okButtonProps={{
                  danger: true,
                }}
                icon={<QuestionCircleOutlined className="text-danger" />}
                onConfirm={handleQuizSubmit}
              >
                <button className="w-full btn btn-primary my-4">
                  {state.mode === "add" ? "Add Quiz" : "Edit Quiz"}
                </button>
              </Popconfirm>
              {state.active && <Button
                  type="dashed"
                  className="d-flex align-items-center justify-content-center mx-auto btn-danger-custom"
                  onClick={clearState}
                  style={{
                    width: "100%",
                  }}
                >
                  Cancel
                </Button>}
            </Form.Item>
          </Row>
        </Col>
        <Col xs={12} lg={6}>
          <h6 className="text-secondary font-weight-normal text-center">
            Total Quizzes (
            {courseState.modules?.find(
              (module) => module.id === state?.selectedModule
            )?.quizzes.length ?? 0}
            )
          </h6>
          {courseState.modules?.find(
            (module) => module.id === state?.selectedModule
          )?.quizzes?.length > 0 && (
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
                  ?.find((module) => module.id === state?.selectedModule)
                  .quizzes?.map((currentQuiz) => (
                    <div
                      key={currentQuiz.id}
                      className="accordion ecommerce my-2"
                    >
                      <div className="accordion-item">
                        <h2
                          className="accordion-header d-flex align-items-center justify-content-between"
                          id={`heading${currentQuiz.id}`}
                        >
                          <button
                            className={`accordion-button${
                              currentQuiz.collapsed ? " collapsed" : ""
                            }`}
                            onClick={() => toggleCollapse(currentQuiz)}
                            type="button"
                          >
                            {currentQuiz.quizTitle}
                          </button>
                          <div className="d-flex gap-2 px-2 cursor-pointer font-size-20 text-muted ">
                            <RiEdit2Line
                              color="#62A2B8"
                              onClick={() => editQuiz(currentQuiz)}
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
                              onConfirm={() => deleteQuiz(currentQuiz)}
                            >
                              <RiDeleteBinLine color="#DE3545" />
                            </Popconfirm>
                          </div>
                        </h2>
                        <Collapse
                          isOpen={!currentQuiz.collapsed}
                          className="accordion-collapse"
                        >
                          <div
                            className="accordion-body font-size-14 text-left p-2"
                            style={{ visibility: "visible" }}
                          >
                            <p>{currentQuiz.quizDescription}</p>
                          </div>
                        </Collapse>
                      </div>
                    </div>
                  ))}
              </CardBody>
            </Card>
          )}
        </Col>
        <Col xs={12}></Col>
      </Row>
    </>
  );
};

export default QuizDetails;
