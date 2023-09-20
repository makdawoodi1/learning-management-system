import React, { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/context";

//Import Breadcrumb
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { CourseSettings, QuizSettings, AssignmentSettings } from "./components";
import { Container, Row, Col } from "reactstrap";

const AddCourse = () => {
  const [breadcrumbItems] = useState([
    { title: "Home", link: "/" },
    { title: "Courses", link: "/auth/my-courses" },
    { title: "Add Course", link: "/auth/add-course" },
  ]);
  const { setCourseState } = useContext(AuthContext);

  useEffect(() => {
    setCourseState({
      courseFolderKey: null,
      courseTitle: null,
      courseDescription: null,
      price: 0,
      introductoryVideo: null,
      thumbnail: null,
      archived: false,
      published: false,
      modules: [],
      errors: {},
    });
  }, []);

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
