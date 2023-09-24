import React, { useContext } from "react";
import { Col, Row } from "reactstrap";
import { Select, Input, InputNumber, Cascader, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import AuthContext from "@/context/context";

const QuizDetails = ({ Form, form, handleSubmit }) => {
  const { courseState } = useContext(AuthContext);

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
                  rows={8}
                  className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 "
                  placeholder="Quiz Description"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
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
                addonAfter={
                  <Select
                    defaultValue="seconds"
                    style={{
                      width: 100,
                    }}
                  >
                    <Select.Option value="seconds">Seconds</Select.Option>
                    <Select.Option value="minutes">Minutes</Select.Option>
                  </Select>
                }
                className="w-full rounded placeholder:text-sm placeholder:text-gray-500 border-gray-500 "
                defaultValue={60}
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
                onChange={(e) =>
                  form.setFieldValue("quiz-attempts", e.target.value)
                }
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
                onChange={(e) =>
                  form.setFieldValue(
                    "quiz-attempt-passing-marks",
                    e.target.value
                  )
                }
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
                onConfirm={handleSubmit}
              >
                <button type="submit" className="w-full btn btn-primary my-4">
                  Add Quiz
                </button>
              </Popconfirm>
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
        </Col>
        <Col xs={12}></Col>
      </Row>
    </>
  );
};

export default QuizDetails;
