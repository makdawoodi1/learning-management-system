import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Form, Input } from "antd";

const AssignmentSettings = () => {
  return (
    <Card>
      <CardBody className="p-6 mt-2">
        <h6 className="text-secondary font-weight-normal">Course Details</h6>
        <Form
          name="add-course"
          // onFinish={handleSubmit}
          className="mt-4 pt-2"
        >
          <Row>
            <Col xs={12} lg={6}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input the course title!",
                  },
                ]}
              >
                <Input
                  size="large"
                  className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 "
                  placeholder="Course Title"
                />
              </Form.Item>
            </Col>
            <Col xs={12} lg={6}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input the course title!",
                  },
                ]}
              >
                <Input
                  size="large"
                  className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 "
                  placeholder="Course Title"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};

export default AssignmentSettings;
