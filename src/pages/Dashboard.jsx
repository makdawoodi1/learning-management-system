import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "@/components/common/Breadcrumbs";

//Import Components
import CurrentMonth from "@/pages/Auth/Widgets/CurrentMonth";
import Earnings from "@/pages/Auth/Widgets/Earnings";
import StudentMonth from "@/pages/Auth/Widgets/StudentMonth";
import TopCourses from "@/pages/Auth/Widgets/TopCourses";
import TotalLifetime from "@/pages/Auth/Widgets/TotalLifetime";
import EarningReport from "@/pages/Auth/Widgets/EarningReport";

const Dashboard = () => {

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col xl={8}>
            <Row>
              <Col md={4}>
                <CurrentMonth />
              </Col>
              <Col md={4}>
                <TotalLifetime />
              </Col>
              <Col md={4}>
                <StudentMonth />
              </Col>
            </Row>
            {/* revenue Analytics */}
            <Earnings />
          </Col>

          <Col xl={4}>
            {/* sales Analytics */}
            <TopCourses />
            {/* earning reports */}
            <EarningReport />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
