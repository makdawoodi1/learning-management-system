import {
  CloseOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Collapse,
  Input,
  Popconfirm,
  Radio,
  Select,
  Space,
} from "antd";
import React, { useContext, useRef, useState } from "react";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import { Card, CardBody, Col, Row } from "reactstrap";
import AuthContext from "@/context/context";
import { generateUniqueID } from "@/helpers/helper";
import { filterAndValidateQuizQuestion } from "@/helpers/helper";
import { API_URL } from "@/config/config";
import toast from "react-hot-toast";
import axios from "@/services/axios";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};

const QuizQuestions = ({ Form, form }) => {
  const { courseState, setCourseState, auth } = useContext(AuthContext);
  const questionRef = useRef(null);
  const [state, setState] = useState({
    mode: "add",
    selectedModule: form.getFieldValue("module") || null,
    selectedQuiz: null,
    selectedQuestion: null,
    selectedQuestionType: null,
    correctAnswer: null,
    questions: [],
    options: [],
    active: null,
  });
  // const getState = () => {
  //   const selectedKeys = [
  //     "lesson-title",
  //     "lesson-description",
  //     "lesson-content"
  //   ];
  //   const filteredObject = Object.keys(form.getFieldsValue()).reduce(
  //     (result, key) => {
  //       if (selectedKeys.includes(key)) result[key] = form.getFieldValue(key);
  //       return result;
  //     },
  //     {}
  //   );
  //   return (
  //     Object.values(filteredObject).some((value) => value !== "") ||
  //     state.editorText !== ""
  //   );
  // };

  const handleQuizQuestionSubmit = () => {
    // form.validateFields().then((values) => {
    const values = form.getFieldsValue();
    let question;

    switch (state.selectedQuestionType) {
      case "true_false":
        question = {
          id: generateUniqueID(),
          type: values["question-type"],
          question: values.question,
          options: ["true", "false"],
          correctAnswer: values.option.toLowerCase(),
          collapsed: true,
          completed: false,
        };
        break;

      case "single_choice":
        question = {
          id: generateUniqueID(),
          type: values["question-type"],
          question: values.question,
          options: state.options,
          correctAnswer: state.correctAnswer,
          collapsed: true,
          completed: false,
        };
        break;

      case "multiple_choice":
        question = {
          id: generateUniqueID(),
          type: values["question-type"],
          question: values.question,
          options: state.options,
          correctAnswer: state.correctAnswer,
          collapsed: true,
          completed: false,
        };
        break;
    }

    const currentModule = courseState.modules?.find(
      (module) => module.id === values.module
    );
    const currentQuiz = currentModule.quizzes?.find(
      (quiz) => quiz.id === values.quiz
    );
    const currentQuizQuestion = currentQuiz.questions.find(
      (question) => question.id === state.selectedQuestion?.id
    )
    const moduleIndex = courseState.modules?.indexOf(currentModule);
    const quizIndex = currentModule.quizzes?.indexOf(currentQuiz);
    const questionIndex = currentQuiz.questions?.indexOf(currentQuizQuestion);

    const addQuizQuestion = () => {
      const filteredData = filterAndValidateQuizQuestion(question);
      const errorKeys = Object.keys(filteredData.errors);
      if (errorKeys.length > 0) {
        return toast.error(Object.values(filteredData.errors)[0]);
      }

      try {
        axios
          .post(
            `${API_URL}/quizzes/create-quiz-question?username=${auth?.username}`,
            JSON.stringify({
              data: {
                attributes: {
                  ...filteredData,
                  quizID: currentQuiz.id,
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
              toast.success("Quiz Question has been created successfully");
              currentQuiz.questions.push(response.data.quizQuestion);
              setState({
                ...state,
                mode: "add",
                options: [],
                selectedQuestionType: null,
                correctAnswer: null,
              });
            } else {
              toast.error(response?.data.message);
            }
          })
          .catch((error) => {
            if (error.response?.data?.message) {
              return toast.error(error.response.data?.message);
            }
            console.error("Error creating Quiz Question!:", error.message);
            toast.error(error.message);
          });
      } catch (error) {
        console.error(error);
        toast.error("Unexpected error occured!");
      }
    };

    const editQuizQuestion = () => {
      const filteredData = filterAndValidateQuizQuestion(question);
      const errorKeys = Object.keys(filteredData.errors);
      if (errorKeys.length > 0) {
        return toast.error(Object.values(filteredData.errors)[0]);
      }

      try {
        axios
          .put(
            `${API_URL}/quizzes/edit-quiz-question?username=${auth?.username}&moduleID=${currentModule.id}&quizQuestionID=${state.selectedQuestion.id}`,
            JSON.stringify({
              data: {
                attributes: {
                  ...filteredData,
                  quizID: currentQuiz.id,
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
              currentQuiz.questions[quizIndex] = response.data.quizQuestion;

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
              setState({
                ...state,
                mode: "add",
                options: [],
                selectedQuestionType: null,
                correctAnswer: null,
              });
              toast.success("Quiz Question has been updated successfully");
            } else {
              toast.error(response?.data.message);
            }
          })
          .catch((error) => {
            if (error.response?.data?.message) {
              return toast.error(error.response.data?.message);
            }
            console.error("Error updating Quiz Question!:", error.message);
            toast.error(error.message);
          });
      } catch (error) {
        console.error(error);
        toast.error("Unexpected error occured!");
      }
    }

    switch (state.mode) {
      case "add":
        addQuizQuestion();
        break;

      case "edit":
        editQuizQuestion();
        break;
    }

    form.setFieldValue("question", "");
  };

  const toggleCollapse = ({ id, collapsed }) => {
    const currentModule = courseState.modules.find(
      (module) => module.id === form.getFieldValue("module")
    );

    const currentQuiz = currentModule.quizzes.find(
      (quiz) => quiz.id === form.getFieldValue("quiz")
    );

    const updatedModules = courseState.modules.map((module) => {
      if (module.id === currentModule.id) {
        const updatedQuizzes = module.quizzes.map((quiz) => {
          if (quiz.id === currentQuiz.id) {
            const updatedQuizQuestions = quiz.questions.map((question) => {
              if (question.id === id) {
                return { ...question, collapsed: !collapsed };
              } else {
                return question;
              }
            });
            return { ...quiz, questions: updatedQuizQuestions };
          } else {
            return { ...quiz, collapsed: true };
          }
        });
        return { ...module, quizzes: updatedQuizzes };
      } else {
        return module;
      }
    });

    setCourseState((prev) => ({
      ...prev,
      modules: updatedModules,
    }));
  };

  const editQuizQuestion = (question) => {
    // questionRef.current.input?.focus();
    form.setFieldValue('question', question.question);
    if (question.questionType === "true_false") form.setFieldValue('option', question.correctAnswer)
    else {
      
    }
    setState((prev) => ({
      ...prev,
      mode: "edit",
      selectedQuestion: question,
      selectedQuestionType: question.questionType,
      correctAnswer: question.correctAnswer,
      options: question.options,
      // active: getState()
    }))
  };

  // Delete Module
  const deleteQuizQuestion = (selectedQuestion) => {
    const currentModule = courseState.modules?.find(
      (module) => module.id === form.getFieldValue('module')
    );
    const currentQuiz = currentModule.quizzes?.find(
      (quiz) => quiz.id === form.getFieldValue('quiz')
    );

    try {
      axios
        .delete(
          `${API_URL}/quizzes/delete-quiz-question?username=${auth?.username}&quizQuestionID=${selectedQuestion.id}`,
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
                    quizzes: module.quizzes.map(
                      (quiz) => {
                        if (quiz.id === currentQuiz.id) {
                          return {
                            ...quiz,
                            questions: quiz.questions.filter(
                              (question) => question.id !== selectedQuestion.id
                            )
                          }
                        }
                        return quiz
                      }
                    ),
                  };
                }
                return module;
              }),
            }));

            setState({
              ...state,
              mode: "add",
              options: [],
              selectedQuestionType: null,
              correctAnswer: null,
            });
            toast.success("Quiz Question has been deleted successfully");
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

  const handleAddOption = () => {
    setState((prev) => ({
      ...prev,
      options: [...prev.options, form.getFieldValue("option")],
    }));
  };

  return (
    <>
      <Row>
        <Col xs={12} lg={6}>
          <Row>
            <Col xs={12}>
              <Row>
                <Col xs={12} lg={6}>
                  <Form.Item
                    label="Select Quiz"
                    name="quiz"
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (courseState.modules?.length === 0 && !value) {
                            return Promise.reject(
                              new Error("Please add module")
                            );
                          } else if (!state.selectedQuiz)
                            return Promise.reject(
                              new Error("Please select quiz")
                            );
                          return Promise.resolve();
                        },
                      }),
                    ]}
                  >
                    <Select
                      className="w-full"
                      showSearch
                      bordered
                      placeholder="Select Quiz"
                      onChange={(value) =>
                        setState({ ...state, selectedQuiz: value })
                      }
                      options={courseState.modules
                        ?.find(
                          (module) => module.id === form.getFieldValue("module")
                        )
                        ?.quizzes?.map((quiz) => ({
                          value: quiz.id,
                          label: quiz.quizTitle,
                        }))}
                    />
                  </Form.Item>
                </Col>
                <Col xs={12} lg={6}>
                  <Form.Item
                    label="Question Type"
                    name="question-type"
                    // rules={[
                    //   ({ getFieldValue }) => ({
                    //     validator(_, value) {
                    //       if (courseState.modules?.length === 0 && !value) {
                    //         return Promise.reject(new Error("Please add module!"));
                    //       } else if (
                    //         courseState.modules?.find(
                    //           (module) => module.id === state?.selectedModule
                    //         )?.lessons.length === 0 &&
                    //         !value
                    //       ) {
                    //         return Promise.reject(new Error("Please add lesson!"));
                    //       }
                    //       return Promise.resolve();
                    //     },
                    //   }),
                    // ]}
                  >
                    <Select
                      className="w-full"
                      showSearch
                      bordered
                      placeholder="Select Question Type"
                      onChange={(value) =>
                        setState({ ...state, selectedQuestionType: value })
                      }
                      options={[
                        { value: "true_false", label: "True/False" },
                        { value: "single_choice", label: "Single Choice" },
                        { value: "multiple_choice", label: "Multiple Choice" },
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            {state.selectedQuestionType && (
              <Form.Item name="question" label="Question">
                <Input name="question" ref={questionRef} />
              </Form.Item>
            )}

            {state.selectedQuestionType &&
              state.selectedQuestionType !== "true_false" && (
                <div className="">
                  <Form.Item label="Option" name="option">
                    <Space.Compact
                      style={{
                        width: "100%",
                      }}
                    >
                      <Input />
                      <Button type="dashed" onClick={handleAddOption}>
                        Add Option
                      </Button>
                    </Space.Compact>
                  </Form.Item>
                </div>
              )}

            {state.selectedQuestionType === "true_false" && (
              <Form.Item name="option" label="Correct Answer">
                <Radio.Group name="correct_answer">
                  <Radio value="true">True</Radio>
                  <Radio value="false">False</Radio>
                </Radio.Group>
              </Form.Item>
            )}

            {state.selectedQuestionType === "multiple_choice" && (
              <Form.Item name="multiple_choice_options" label="Options">
                <Checkbox.Group
                  value={state.options}
                  onChange={(checkedValues) =>
                    setState((prev) => ({
                      ...prev,
                      correctAnswer: checkedValues,
                    }))
                  }
                >
                  {state.options?.map((option, index) => (
                    <div key={index}>
                      <Checkbox
                        value={option}
                        // onChange={(e) =>
                        //   handleCorrectChange(option.option, e.target.checked)
                        // }
                      >
                        {option}
                      </Checkbox>
                    </div>
                  ))}
                </Checkbox.Group>
              </Form.Item>
            )}

            {state.selectedQuestionType === "single_choice" && (
              <Form.Item name="single_choice_options" label="Options">
                <Radio.Group
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      correctAnswer: e.target.value,
                    }))
                  }
                >
                  {state.options?.map((option, index) => (
                    <Radio key={index} value={option}>
                      {option}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            )}

            <Row>
              <Col xs={12}>
                <Form.Item>
                  <Button
                    type="dashed"
                    className="d-flex align-items-center justify-content-center mx-auto"
                    onClick={handleQuizQuestionSubmit}
                    style={{
                      width: "100%",
                    }}
                    icon={
                      state.mode === "add" ? <PlusOutlined /> : <RiEdit2Line />
                    }
                  >
                    {state.mode === "add" ? "Add Question" : "Edit Question"}
                  </Button>
                </Form.Item>
              </Col>
              {state.active && (
                <Col xs={12} lg={2}>
                  <Button
                    type="dashed"
                    className="d-flex align-items-center justify-content-center mx-auto btn-danger-custom"
                    // onClick={clearState}
                    style={{
                      width: "100%",
                    }}
                  >
                    Cancel
                  </Button>
                </Col>
              )}
            </Row>
          </Row>
        </Col>
        <Col
          xs={12}
          lg={6}
          className="text-center d-flex flex-column justify-content-center"
        >
          <h6 className="text-secondary font-weight-normal">
            Total Questions (
            {courseState.modules
              ?.find((module) => module.id === form.getFieldValue("module"))
              ?.quizzes?.find((quiz) => quiz.id === form.getFieldValue("quiz"))
              ?.questions?.length ?? 0}
            )
          </h6>
          {courseState.modules
            ?.find((module) => module.id === form.getFieldValue("module"))
            ?.quizzes?.find((quiz) => quiz.id === form.getFieldValue("quiz"))
            ?.questions?.length > 0 && (
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
                  ?.find((module) => module.id === form.getFieldValue("module"))
                  ?.quizzes?.find(
                    (quiz) => quiz.id === form.getFieldValue("quiz")
                  )
                  ?.questions?.map((currentQuestion) => (
                    <div
                      key={currentQuestion.id}
                      className="accordion ecommerce my-2"
                    >
                      <div className="accordion-item">
                        <h2
                          className="accordion-header d-flex align-items-center justify-content-between"
                          id={`heading${currentQuestion.id}`}
                        >
                          <button
                            className={`accordion-button${
                              currentQuestion.collapsed ? " collapsed" : ""
                            }`}
                            onClick={() => toggleCollapse(currentQuestion)}
                            type="button"
                          >
                            {currentQuestion.question}
                          </button>
                          <div className="d-flex gap-2 px-2 cursor-pointer font-size-20 text-muted ">
                            <RiEdit2Line
                              color="#62A2B8"
                              onClick={() => editQuizQuestion(currentQuestion)}
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
                              onConfirm={() => deleteQuizQuestion(currentQuestion)}
                            >
                              <RiDeleteBinLine color="#DE3545" />
                            </Popconfirm>
                          </div>
                        </h2>
                        {/* <Collapse
                          isOpen={false}
                          className="accordion-collapse"
                        >
                          <div
                            className="accordion-body font-size-14 text-left p-2"
                            style={{ visibility: "visible" }}
                          >
                            <p>{currentQuestion.question}</p>
                          </div>
                        </Collapse> */}
                        <Collapse
                          isOpen={!currentQuestion.collapsed}
                          className="accordion-collapse"
                        >
                          <div
                            className="accordion-body font-size-14 text-left p-2"
                            style={{ visibility: "visible" }}
                          >
                            <p>TItle</p>
                            <div>
                              <h6 className="my-2 mx-2 text-secondary">
                                Question: {currentQuestion.question}
                              </h6>
                              <p className="my-2 mx-2 text-secondary fw-bold font-size-14">
                                Type:
                                <pre className="fw-normal">
                                  {currentQuestion.questionType?.replaceAll(
                                    "_",
                                    " "
                                  )}
                                </pre>
                              </p>
                              <p className="my-2 mx-2 text-secondary fw-bold font-size-14">
                                Options:
                                <pre>
                                  {JSON.stringify(
                                    currentQuestion.options?.map(
                                      (question) => question
                                    )
                                  )}
                                </pre>
                              </p>
                              <p className="my-2 mx-2 text-secondary fw-bold font-size-14">
                                Correct Answer:
                                <pre>
                                  {JSON.stringify(
                                    currentQuestion.correctAnswer
                                  )}
                                </pre>
                              </p>
                            </div>
                          </div>
                        </Collapse>
                      </div>
                    </div>
                  ))}
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
    </>
  );
};

const SelectAnswer = () => {
  return <div>SelectAnswer</div>;
};

const TrueFalse = () => {
  return <div>TrueFalse</div>;
};

const MultipleAnswer = () => {
  return <div>MultipleAnswer</div>;
};

export default QuizQuestions;
