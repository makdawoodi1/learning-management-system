import React from "react";
import { Link } from "react-router-dom";
import Rating from "@/containers/sidebar/rating";
import Header from '@/containers/layout/header'
import PageHeader from '@/containers/layout/pageheader'
import GroupSelect from '@/containers/sidebar/group-select'
import Pagination from '@/containers/sidebar/pagination'

const subTitle = "Featured Courses";
const title = "Pick A Course To Get Started";

const courseList = [
  {
    imgUrl: "/course/01.jpg",
    imgAlt: "course rajibraj91 rajibraj",
    price: "$30",
    cate: "Pharmacy",
    reviewCount: "03 reviews",
    title: "Centers for disease control & prevention",
    totalLeson: "30x Lesson",
    level: "Intermediate",
    authorImgUrl: "/course/author/01.jpg",
    authorImgAlt: "course author rajibraj91 rajibraj",
    authorName: "Dr. Adrienne Platt",
    btnText: "Go to Course",
  },
  {
    imgUrl: "/course/02.jpg",
    imgAlt: "course rajibraj91 rajibraj",
    price: "$30",
    cate: "Pharmacy",
    reviewCount: "03 reviews",
    title: "HIGH-RISK NEWBORNS NEONATE (PART 1)",
    totalLeson: "25x Lesson",
    level: "Intermediate",
    authorImgUrl: "/course/author/02.jpg",
    authorImgAlt: "course author rajibraj91 rajibraj",
    authorName: "Dr. Adrienne Platt",
    btnText: "Go to Course",
  },
  {
    imgUrl: "/course/03.jpg",
    imgAlt: "course rajibraj91 rajibraj",
    price: "$30",
    cate: "Pharmacy",
    reviewCount: "03 reviews",
    title: "Childhood Overweight & Obesity Part 2",
    totalLeson: "32x Lesson",
    level: "Intermediate",
    authorImgUrl: "/course/author/03.jpg",
    authorImgAlt: "course author rajibraj91 rajibraj",
    authorName: "Dr. Adrienne Platt",
    btnText: "Go to Course",
  },
  {
    imgUrl: "/course/04.jpg",
    imgAlt: "course rajibraj91 rajibraj",
    price: "$30",
    cate: "Pharmacy",
    reviewCount: "03 reviews",
    title: "Childhood Overweight & Obesity Part 1",
    totalLeson: "16x Lesson",
    level: "Intermediate",
    authorImgUrl: "/course/author/04.jpg",
    authorImgAlt: "course author rajibraj91 rajibraj",
    authorName: "Dr. Adrienne Platt",
    btnText: "Go to Course",
  },
  {
    imgUrl: "/course/05.jpg",
    imgAlt: "course rajibraj91 rajibraj",
    price: "$30",
    cate: "Pharmacy",
    reviewCount: "03 reviews",
    title: "HIGH-RISK NEWBORNS​ (PART 2)",
    totalLeson: "18x Lesson",
    level: "Intermediate",
    authorImgUrl: "/course/author/05.jpg",
    authorImgAlt: "course author rajibraj91 rajibraj",
    authorName: "Dr. Adrienne Platt",
    btnText: "Go to Course",
  },
  {
    imgUrl: "/course/06.jpg",
    imgAlt: "course rajibraj91 rajibraj",
    price: "$30",
    cate: "Pharmacy",
    reviewCount: "03 reviews",
    title: "Leading Health Indicators Healthy People 2030 Part 2",
    totalLeson: "10x Lesson",
    level: "Intermediate",
    authorImgUrl: "/course/author/06.jpg",
    authorImgAlt: "course author rajibraj91 rajibraj",
    authorName: "Dr. Adrienne Platt",
    btnText: "Go to Course",
  },
];

const Course = () => {
  return (
    <>
      {/* <Header /> */}
      <GroupSelect />
      <div className="course-section padding-tb section-bg">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">{subTitle}</span>
            <h2 className="title">{title}</h2>
          </div>
          <div className="section-wrapper">
            <div className="row g-4 justify-content-center row-cols-xl-3 row-cols-md-2 row-cols-1">
              {courseList.map((val, i) => (
                <div className="col" key={i}>
                  <div className="course-item">
                    <div className="course-inner">
                      <div className="course-thumb">
                        <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                      </div>
                      <div className="course-content">
                        <div className="course-price">{val.price}</div>
                        <div className="course-category">
                          <div className="course-cate">
                            <a href="#">{val.cate}</a>
                          </div>
                          <div className="course-reiew">
                            <Rating />
                            <span className="ratting-count">
                              {" "}
                              {val.reviewCount}
                            </span>
                          </div>
                        </div>
                        <Link to="/course/1">
                          <h4>{val.title}</h4>
                        </Link>
                        <div className="course-details">
                          <div className="couse-count">
                            <i className="icofont-video-alt"></i>{" "}
                            {val.totalLeson}
                          </div>
                          <div className="couse-topic">
                            <i className="icofont-signal"></i> {val.schdule}
                          </div>
                        </div>
                        <div className="course-footer">
                          <div className="course-author">
                            <img
                              src={`${val.authorImgUrl}`}
                              alt={`${val.authorImgAlt}`}
                            />
                            <Link to="/team-single" className="ca-name">
                              {val.authorName}
                            </Link>
                          </div>
                          <div className="course-btn">
                            <Link to="/course-single" className="lab-btn-text">
                              {val.btnText}{" "}
                              <i className="icofont-external-link"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    </>
  );
};

export default Course;
