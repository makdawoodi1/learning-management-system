import React, { useEffect, useState } from "react";

//Import Breadcrumb
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Container, Row, Col, Card, CardBody, Form, Input } from "reactstrap";
import { Link } from "react-router-dom";
import Rating from "@/containers/sidebar/rating";
import Pagination from "@/containers/sidebar/pagination";
import axios from "@/services/axios";
import { API_URL } from "@/config/config";
import toast from "react-hot-toast";
import EditorPreview from "@/components/EditorPreview";

import { RiSearchLine } from "react-icons/ri";

const InstructorCourses = () => {
  const [breadcrumbItems] = useState([
    { title: "Dashboard", link: "/auth/dashboard" },
    { title: "My Courses", link: "/auth/my-courses" },
  ]);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCourses = async (req, res) => {
      try {
        axios
          .get(`${API_URL}/courses/get-instructor-courses`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          })
          .then((response) => {
            if (response.data?.success) {
              setCourses(response.data?.courses);
              setFilteredCourses(response.data?.courses);
            }
          })
          .catch((error) => {
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

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter the courses based on the search query
    const filtered = courses?.filter((course) =>
      course.title.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredCourses(filtered);
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="My Courses" breadcrumbItems={breadcrumbItems} />

        <Row>
          <Col xs={12}>
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between align-items-center">
                  {courses?.length > 0 ? (
                    <Form className="app-search d-none d-lg-block p-0">
                      <div className="position-relative">
                        <Input
                          type="text"
                          className="form-control"
                          style={{ backgroundColor: "#f1f5f7" }}
                          placeholder="Search Courses"
                          onChange={handleSearch}
                        />
                        <span>
                          <RiSearchLine />
                        </span>
                      </div>
                    </Form>
                  ) : (
                    <h6 className="text-secondary font-weight-normal mb-0">There are no courses</h6>
                  )}
                  <Link to="/auth/add-course">
                    <button type="button" className="btn-primary-custom px-4">
                      Create New Course
                    </button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          {filteredCourses?.map((course) => (
            <Col key={course.id} xs={12} lg={4} className="w-25">
              <Card>
                <div className="course-item">
                  <div className="course-inner">
                    <img
                      src={course.thumbnail.objectKey}
                      alt="Course Thumbnail"
                      width="100%"
                    />
                    <CardBody>
                      <div className="course-content p-0">
                        <div className="course-category"></div>
                        <Link to={`/course/${course.id}`}>
                          <h4>{course.title}</h4>
                        </Link>
                        {/* <div className="course-details m-0" style={{ maxHeight: "50px", overflow: 'hidden' }}>
                          <EditorPreview  value={course.description} />
                        </div> */}
                        <div className="course-details mt-2 d-flex align-items-center justify-content-between position-relative">
                          <div className="couse-count">
                            <i className="icofont-video-alt"></i>
                            {course.lessonCount} Lessons
                          </div>
                          {/* <div className="course-price font-sans">{course.price}$</div> */}
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

export default InstructorCourses;
