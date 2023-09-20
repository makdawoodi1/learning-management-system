import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@/containers/sidebar/rating";
import toast from "react-hot-toast";
import axios from "@/services/axios";
import { API_URL } from "@/config/config";

const Course = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async (req, res) => {
      try {
        axios
          .get(`${API_URL}/courses/get-courses`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          })
          .then((response) => {
            if (response.data?.success) {
              setCourses(response.data?.courses);
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

  console.log(courses)

  return (
    <div className="course-section padding-tb section-bg">
      <div className="container">
        <div className="section-header text-center">
          <div className="badge-text-container">
            <span className="header-text-md" style={{ fontSize: "1.5rem" }}>Featured Courses</span>
          </div>
          <h2 className="header-text" style={{ fontSize: "4rem" }}>Pick A Course To Get Started</h2>
        </div>
        <div className="section-wrapper">
          <div className="row g-4 justify-content-center row-cols-xl-3 row-cols-md-2 row-cols-1">
            {courses.map(course => (
              <div className="col" key={course.id}>
                <div className="course-item">
                  <div className="course-inner">
                    <div className="course-thumb">
                      <img src={course.thumbnail?.objectKey} alt="Course Thumbnail" />
                    </div>
                    <div className="course-content">
                      <div className="course-price">{course.price} $</div>
                      <Link to={`/course/${course.id}`}>
                        <h4>{course.title}</h4>
                      </Link>
                      <div className="course-details">
                        <div className="couse-count">
                          <i className="icofont-video-alt"></i> {course.lessonCount}
                        </div>
                      </div>
                      <div className="course-footer">
                        <div className="course-author">
                          <img
                            style={{ width: "30px" }}
                            src={course.authorImage ? course.authorImage : "/author.jpg"}
                            alt="Course Author"
                          />
                          <Link to="/profile" className="ca-name">
                            Adrianne Platt
                          </Link>
                        </div>
                        <div className="course-btn">
                          <Link to={`/course/${course.id}`} className="lab-btn-text">
                            Go to Course
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
        </div>
      </div>
    </div>
  );
};

export default Course;
