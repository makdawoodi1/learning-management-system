import React, { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/context";

//Import Breadcrumb
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { EditCourseSettings, QuizSettings } from "./components";
import { Container, Row, Col } from "reactstrap";
import axios from "@/services/axios";
import { API_URL } from "@/config/config";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const EditCourse = () => {
  const [breadcrumbItems] = useState([
    { title: "Dashboard", link: "/" },
    { title: "My Courses", link: "/auth/my-courses" },
    { title: "Edit Course", link: "/auth/edit-course" },
  ]);
  const { pathname } = useLocation();
  const courseID = pathname.split("/")[3];
  const { courseState, setCourseState, auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchCourse = async (req, res) => {
      try {
        axios
          .get(`${API_URL}/courses/get-edit-course?username=${auth?.username}&courseID=${courseID}`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          })
          .then((response) => {
            if (response.data?.success) {
              const course = response.data?.course;
              setCourseState({...course});
            }
          })
          .catch((error) => {
            if (error.response?.data?.message) {
              return toast.error(error.response.data?.message);
            }
            console.error("Error Fetching course!:", error.message);
          });
      } catch (error) {
        console.error(error);
        toast.error("Unexpected error occured!");
      }
    };

    fetchCourse();
  }, []);

  if (courseState) console.log(courseState);

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Edit Course" breadcrumbItems={breadcrumbItems} />

        <Row>
          <Col xs={12}>
            <EditCourseSettings />
            <QuizSettings />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditCourse;
