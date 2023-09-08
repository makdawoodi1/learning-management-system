import React, { useState } from "react";

//Import Breadcrumb
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Container, Row, Col, Card, CardBody, Form, Input } from "reactstrap";
import { Link } from "react-router-dom";
import Rating from "@/containers/sidebar/rating";
import Pagination from '@/containers/sidebar/pagination'

// Import Selects
import PriceSelect from "@/containers/sidebar/price-select";
import SelectLanguage from "@/containers/sidebar/select-language";
import SelectCatagory from "@/containers/sidebar/selectCatagory";
import SkillSelect from "@/containers/sidebar/skill-select";
import { RiArrowRightCircleFill, RiArrowRightLine, RiSearchLine } from "react-icons/ri";

const courseList = [
  {
    imageUrl: "/course/01.jpg",
    imageAlt: "course rajibraj91 rajibraj",
    price: "$30",
    category: "Pharmacy",
    reviewCount: "03 reviews",
    title: "Centers for disease control & prevention",
    totalLesons: "30x Lesson",
    level: "Intermediate",
    authorImageUrl: "/course/author/01.jpg",
    authorImageAlt: "course author rajibraj91 rajibraj",
    authorName: "Dr. Adrienne Platt",
    buttonText: "Go to Course",
  },
  {
    imageUrl: "/course/02.jpg",
    imageAlt: "course rajibraj91 rajibraj",
    price: "$30",
    category: "Pharmacy",
    reviewCount: "03 reviews",
    title: "HIGH-RISK NEWBORNS NEONATE (PART 1)",
    totalLesons: "25x Lesson",
    level: "Intermediate",
    authorImageUrl: "/course/author/02.jpg",
    authorImageAlt: "course author rajibraj91 rajibraj",
    authorName: "Dr. Adrienne Platt",
    buttonText: "Go to Course",
  },
  {
    imageUrl: "/course/03.jpg",
    imageAlt: "course rajibraj91 rajibraj",
    price: "$30",
    category: "Pharmacy",
    reviewCount: "03 reviews",
    title: "Childhood Overweight & Obesity Part 2",
    totalLesons: "32x Lesson",
    level: "Intermediate",
    authorImageUrl: "/course/author/03.jpg",
    authorImageAlt: "course author rajibraj91 rajibraj",
    authorName: "Dr. Adrienne Platt",
    buttonText: "Go to Course",
  },
  {
    imageUrl: "/course/04.jpg",
    imageAlt: "course rajibraj91 rajibraj",
    price: "$30",
    category: "Pharmacy",
    reviewCount: "03 reviews",
    title: "Childhood Overweight & Obesity Part 1",
    totalLesons: "16x Lesson",
    level: "Intermediate",
    authorImageUrl: "/course/author/04.jpg",
    authorImageAlt: "course author rajibraj91 rajibraj",
    authorName: "Dr. Adrienne Platt",
    buttonText: "Go to Course",
  },
  {
    imageUrl: "/course/05.jpg",
    imageAlt: "course rajibraj91 rajibraj",
    price: "$30",
    category: "Pharmacy",
    reviewCount: "03 reviews",
    title: "HIGH-RISK NEWBORNS​ (PART 2)",
    totalLesons: "18x Lesson",
    level: "Intermediate",
    authorImageUrl: "/course/author/05.jpg",
    authorImageAlt: "course author rajibraj91 rajibraj",
    authorName: "Dr. Adrienne Platt",
    buttonText: "Go to Course",
  },
  {
    imageUrl: "/course/06.jpg",
    imageAlt: "course rajibraj91 rajibraj",
    price: "$30",
    category: "Pharmacy",
    reviewCount: "03 reviews",
    title: "Leading Health Indicators Healthy People 2030 Part 2",
    totalLesons: "10x Lesson",
    level: "Intermediate",
    authorImageUrl: "/course/author/06.jpg",
    authorImageAlt: "course author rajibraj91 rajibraj",
    authorName: "Dr. Adrienne Platt",
    buttonText: "Go to Course",
  },
];

const InstructorCourses = () => {
  const [breadcrumbItems] = useState([
    { title: "Home", link: "/" },
    { title: "My Courses", link: "/auth/my-courses" },
  ]);

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="My Courses" breadcrumbItems={breadcrumbItems} />

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
                        <span><RiSearchLine /></span>
                      </div>
                    </Form>
                    <Link to="/auth/add-course">
                      <button type="button" class="btn-primary-custom px-4">
                        Create New Course
                      </button>
                    </Link>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          {courseList.map((course, index) => (
            <Col key={index} xs={12} lg={4} className="w-25">
              <Card>
                <div className="course-item">
                  <div className="course-inner">
                    <img
                      src={course.imageUrl}
                      alt={course.imageAlt}
                      width="100%"
                    />
                    <CardBody>
                      <div className="course-content p-0">
                        <div className="course-price">{course.price}</div>
                        <div className="course-category">
                          <div className="course-reiew">
                            <Rating />
                            <span className="ratting-count">
                              {course.reviewCount}
                            </span>
                          </div>
                        </div>
                        <Link to="/course/1">
                          <h4>{course.title}</h4>
                        </Link>
                        <div className="course-details m-0">
                          <div className="couse-count">
                            <i className="icofont-video-alt"></i>
                            {course.totalLesons}
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
          <Pagination />
        </Row>
      </Container>
    </div>
  );
};

export default InstructorCourses;
