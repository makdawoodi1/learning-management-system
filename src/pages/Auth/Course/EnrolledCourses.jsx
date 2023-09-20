import React, { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/context";
//Import Breadcrumb
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Container, Row, Col, Card, CardBody, Form, Input } from "reactstrap";
import { Progress } from "antd";
import { Link } from "react-router-dom";
import Rating from "@/containers/sidebar/rating";
import Pagination from "@/containers/sidebar/pagination";
import axios from "@/services/axios";
import { API_URL } from "@/config/config";
import useLogout from "@/hooks/useLogout";
import toast from "react-hot-toast";

import { RiSearchLine } from "react-icons/ri";

const EnrolledCourses = () => {
  const [breadcrumbItems] = useState([
    { title: "Dashboard", link: "/auth/dashboard" },
    { title: "Enrolled Courses", link: "/auth/enrolled-courses" },
  ]);
  const [courses, setCourses] = useState([]);
  const { auth } = useContext(AuthContext);
  const logout = useLogout();

  useEffect(() => {
    const fetchCourses = async (req, res) => {
      try {
        axios
          .get(
            `${API_URL}/courses/get-enrolled-courses?username=${auth.username}`,
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          )
          .then((response) => {
            if (response.data?.success) {
              setCourses(response.data?.courses);
            }
          })
          .catch((error) => {
            if (error.response?.status === 403) logout();
            if (error.response?.data?.message) {
              return toast.error(error.response.data?.message);
            }
            console.error("Error Fetching courses!:", error.message);
          });
      } catch (error) {
        console.error(error);
        toast.error("Unexpected error occured!");
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          title="Enrolled Courses"
          breadcrumbItems={breadcrumbItems}
        />

        <Row>
          <Col xs={12}>
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between align-items-center">
                  <Form className="app-search d-none d-lg-block p-0">
                    <div className="position-relative">
                      <Input
                        type="text"
                        className="form-control"
                        style={{ backgroundColor: "#f1f5f7" }}
                        placeholder="Search Courses"
                      />
                      <span>
                        <RiSearchLine />
                      </span>
                    </div>
                  </Form>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          {courses?.map((course) => (
            <Col key={course.id} xs={12} lg={4} className="w-25">
              <Card>
                <div className="course-item">
                  <div className="course-inner">
                    <img
                      src={course.thumbnail.preview}
                      alt="Course Thumbnail"
                      width="100%"
                    />
                    <CardBody>
                      <div className="course-content p-0">
                        <div className="course-category"></div>
                        <Link to={`/auth/enrolled-course/${course.id}`}>
                          <h4>{course.title}</h4>
                        </Link>
                        {/* <p>{course.description}</p> */}
                        <div className="course-details mt-2 d-flex align-items-center justify-content-between position-relative">
                          <div className="couse-count">
                            <i className="icofont-video-alt"></i>
                            {course.lessonCount} Lessons
                            {/* <div className="course-price font-sans">{course.price}$</div> */}
                          </div>
                          <Progress
                            percent={
                              Math.floor((course.completedLessonCount / course.totalLessonCount) * 100)
                            }
                            size="small"
                          />
                        </div>
                      </div>
                    </CardBody>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
          {/* <Pagination /> */}
        </Row>
      </Container>
    </div>
  );
};

export default EnrolledCourses;
