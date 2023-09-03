import React from "react";
import { Link } from "react-router-dom";
import { FaArrowCircleRight } from 'react-icons/fa'

const subTitle = "Adrianne Platt";
const title = "Amazing Benefits of Coaching for the subsribed parents";
const desc = "Our goal is to support parents by building confidence in their parenting skills with less anxiety to raise healthy children."
const btnText = "Browse All Categories";

const categoryList = [
  {
    imgUrl: "/category/01.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    title: "Connecting",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    count: "24 Course",
  },
  {
    imgUrl: "/category/02.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    title: "Calrifying",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    count: "04 Course",
  },
  {
    imgUrl: "/category/03.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    title: "Listening",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    count: "27 Course",
  },
  {
    imgUrl: "/category/04.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    title: "Answering",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    count: "28 Course",
  }
];

const Benefits = () => {
  return (
    <div className="category-section padding-tb">
      <div className="container">
        <div className="section-header text-center">
            <div className="badge-text-container">
              <span className="header-text-md" style={{ fontSize: "1.5rem" }}>{subTitle}</span>
            </div>
          <h2 className="header-text-lg">{title}</h2>
          <p className="header-text-sm">{desc}</p>
        </div>
        <div className="section-wrapper">
          <div className="row g-8 justify-content-center row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1">
            {categoryList.map((val, i) => (
              <div className="col" key={i}>
                <div className="category-item text-left">
                  <div className="category-inner">
                    <div className="category-thumb">
                      <img src={`${val.imgUrl}`} alt={val.imgAlt} />
                    </div>
                    <div className="category-content">
                      <Link to="/courses">
                        <h6 className="header-text-md">{val.title}</h6>
                      </Link>
                      <p className="header-text-xs">{val.desc}</p>
                      <span className="header-text-link d-flex align-items-center gap-2">
                        Read more
                        <FaArrowCircleRight />
                    </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
