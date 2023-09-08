import React from "react";
import { Row, Col, Container, Button, Card, CardBody } from "reactstrap";
import { Form, Input } from "antd";
import Dropzone from "@/components/Dropzone";

const ProfileSettings = () => {
  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg="4" xl="3">
            <Card>
            </Card>
          </Col>
          <Col lg="8" xl="9">
            <Card>

            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileSettings;
