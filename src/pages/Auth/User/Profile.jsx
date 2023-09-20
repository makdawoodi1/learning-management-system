import React, { useState } from "react";

//Import Breadcrumb
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Form, Input } from "antd";

const Profile = () => {
  const [breadcrumbItems] = useState([
    { title: "Home", link: "/" },
    { title: "Profile", link: "/auth/profile" },
  ]);
  const [form] = Form.useForm();

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Profile" breadcrumbItems={breadcrumbItems} />

        <Row>
          <Col xs={12}>
            <Card>
              <h6 className="text-secondary font-weight-bold d-flex align-items-center pl-8 mt-4">
                Profile Settings
              </h6>
              <hr />
              <CardBody className="p-6 mt-2 d-flex flex-column">
                <Form
                  form={form}
                  name="profile-form"
                  layout="vertical"
                  className="pt-0 mt-0 px-12 gap-8"
                >
                  <Row className="place-items-center">
                    <Col xs={12} lg={6}>
                      <Form.Item label="First Name" name="firstname">
                        <Input
                          size="large"
                          className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 "
                          placeholder="First Name"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={12} lg={6}>
                      <Form.Item label="Last Name" name="lastname">
                        <Input
                          size="large"
                          className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 "
                          placeholder="Last Name"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row className="place-items-center">
                    <Col xs={12} lg={6}>
                      <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                          {
                            type: "email",
                            message: "Please input valid email address!",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 "
                          placeholder="Username"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={12} lg={6}>
                      <Form.Item label="Email" name="email">
                        <Input
                          size="large"
                          className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 "
                          placeholder="Email"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
                <button type="button" className="btn-primary-custom mt-4 px-4 w-fit align-self-center">
                  Submit
                </button>
              </CardBody>
              <hr />
              <h6 className="text-secondary font-weight-bold d-flex align-items-center pl-8 mt-2 mb-4">
                Payment Settings
              </h6>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
