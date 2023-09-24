import { PlusOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import React, { useContext, useState } from "react";
import { RiEdit2Line } from "react-icons/ri";
import { Col, Row } from "reactstrap";
import AuthContext from "@/context/context";

const QuizQuestions = ({ Form, form }) => {
  const { courseState } = useContext(AuthContext);
  const [state, setState] = useState({
    mode: "add",
    selectedQuiz: null,
    selectedQuestion: null,
    selectedQuestionType: null,
    correctAnswer: null,
    questions: [],
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

  console.log(form.getFieldsValue());

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
                    // rules={[
                    //   ({ getFieldValue }) => ({
                    //     validator(_, value) {
                    //       if (courseState.modules?.length === 0 && !value) {
                    //         return Promise.reject(new Error("Please add module"));
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
                      placeholder="Select Quiz"
                      // onChange={(value) =>
                      //   setState({ ...state, selectedModule: value })
                      // }
                      // options={courseState.modules?.map((module, index) => {
                      //   return {
                      //     key: index,
                      //     value: module.id,
                      //     label: module.title,
                      //   };
                      // })}
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
                      // onChange={(value) =>
                      //   setState({ ...state, selectedModule: value })
                      // }
                      // options={courseState.modules?.map((module, index) => {
                      //   return {
                      //     key: index,
                      //     value: module.id,
                      //     label: module.title,
                      //   };
                      // })}
                    />
                  </Form.Item>

                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={state.active ? 10 : 12}>
              <Form.Item>
                <Button
                  type="dashed"
                  className="d-flex align-items-center justify-content-center mx-auto"
                  // onClick={handleLessonSubmit}
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
                    // onClick={clearState}
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
            Total Questions (
            {courseState.modules?.find(
              (module) => module.id === state?.selectedModule
            )?.lessons.length ?? 0}
            )
          </h6>
          {/* {courseState.modules?.find(
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
                  ?.find((module) => module.id === state?.selectedModule)
                  .lessons?.map((currentLesson) => (
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
                          <div
                            className="accordion-body font-size-14 text-left p-2"
                            style={{ visibility: "visible" }}
                          >
                            <EditorPreview value={currentLesson.content} />
                          </div>
                        </Collapse>
                      </div>
                    </div>
                  ))}
              </CardBody>
            </Card>
          )} */}
        </Col>
      </Row>
    </>
  );
};

const SelectAnswer = () => {
  return (
    <div>SelectAnswer</div>
  )
}

const TrueFalse = () => {
  return (
    <div>TrueFalse</div>
  )
}

const MultipleAnswer = () => {
  return (
    <div>MultipleAnswer</div>
  )
}

export default QuizQuestions;
