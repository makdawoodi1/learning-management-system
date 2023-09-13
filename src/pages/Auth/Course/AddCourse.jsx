import React, { useState } from "react";

//Import Breadcrumb
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { CourseSettings, QuizSettings, AssignmentSettings } from "./components"
import { Container, Row, Col } from "reactstrap";

const AddCourse = () => {
  const [breadcrumbItems] = useState([
    { title: "Home", link: "/" },
    { title: "Courses", link: "/auth/my-courses" },
    { title: "Add Course", link: "/auth/add-course" },
  ]);

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Add Course" breadcrumbItems={breadcrumbItems} />

        <Row>
          <Col xs={12}>
            <CourseSettings />
            <QuizSettings />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddCourse;
