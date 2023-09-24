import React, { useContext, useEffect, useState } from "react";
import Footer from "@/containers/layout/footer";
import Header from "@/containers/layout/header";
import PageHeader from "@/containers/layout/pageheader";
import Author from "@/containers/sidebar/author";
import Comment from "@/containers/sidebar/comment";
import CourseSideCetagory from "@/containers/sidebar/course-cetagory";
import CourseSideDetail from "@/containers/sidebar/course-detail";
import Respond from "@/containers/sidebar/respond";
import axios from "@/services/axios";
import { API_URL } from "@/config/config";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import AuthContext from "@/context/context";
import useAuth from "@/hooks/useAuth";

const CourseSingle = () => {
  const [course, setCourse] = useState([]);
  const [enrolled, setEnrolled] = useState(false);
  const { auth } = useContext(AuthContext);
  const { pathname } = useLocation();
  const courseID = pathname.split("/")[2];

  useEffect(() => {
    const fetchCourse = async (req, res) => {
      try {
        axios
          .get(`${API_URL}/courses/get-course?username=${auth?.username}&courseID=${courseID}`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          })
          .then((response) => {
            if (response.data?.success) {
              setCourse(response.data?.course);
            }
          })
          .catch((error) => {
            if (error.response?.status === 409) {
              setCourse(error.response.data?.course);
              setEnrolled(true);
            }

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

    fetchCourse();
  }, []);

  return (
    <>
      <Header />
      <PageHeader course={course} />
      <div className="course-single-section padding-tb section-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="main-part">
                <div className="course-video">
                  <div className="course-video-title">
                    <h4>Course Content</h4>
                  </div>
                  <div className="course-video-content" style={{ marginTop: "1.2rem !important" }}>
                    <div className="accordion" id="accordionExample">
                      {course.course_modules?.map((module) => (
                        <div className="accordion-item">
                          <div className="accordion-header" id="accordion01">
                            <button
                              className="d-flex flex-wrap justify-content-between"
                              data-bs-toggle="collapse"
                              data-bs-target="#videolist1"
                              aria-expanded="true"
                              aria-controls="videolist1"
                            >
                              <span>{module.title}</span>
                              <span>{module.module_lessons?.length} lessons</span>
                            </button>
                          </div>
                          <div
                            id="videolist1"
                            className="accordion-collapse collapse show"
                            aria-labelledby="accordion01"
                            data-bs-parent="#accordionExample"
                          >
                            <ul className="lab-ul video-item-list">
                              {module.module_lessons?.map(lesson => (
                                <li className=" d-flex flex-wrap justify-content-between">
                                  <div className="video-item-title" style={{ visibility: "visible" }}>
                                    {lesson.title}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <Author authorImage={course?.profileImage?.objectKey} />  
              </div>
            </div>
            <div className="col-lg-4">
              <div className="sidebar-part">
                <CourseSideDetail auth={auth} course={course} enrolled={enrolled} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseSingle;
