import React, { useState, useCallback, useContext, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { CourseDetails, ModuleDetails, LessonDetails } from "./forms";
import { Form } from "antd";
import { API_URL } from "@/config/config";
import * as TYPES from "./forms/types";
import AuthContext from "@/context/context";
import { filterAndValidateCourse } from "@/helpers/helper";
import toast from "react-hot-toast";
import axios from "@/services/axios";

const titles = ['Course Details', 'Module Details', 'Lesson Details'];
const CourseSettings = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { auth, courseState, setCourseState } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState(0);

  // Functions
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      if (tab >= 0 && tab <= 2) {
        setActiveTab(tab);
      }
    }
  };

  const handleSubmit = () => {
    if (!courseState.thumbnail) {
      setCourseState((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          thumbnailError: "Please add course thumbnail",
        },
      }));
      return;
    }

    if (!courseState.introductoryVideo) {
      setCourseState((prev) => ({
        ...prev,
        errors: { ...prev.errors, videoError: "Please add introductory video" },
      }));
      return;
    }

    // Update courseState with the form values
    setCourseState((prev) => ({
      ...prev,
      courseTitle: form.getFieldValue("course-title"),
      courseDescription: form.getFieldValue("course-description"),
      price: parseFloat(form.getFieldValue("price")),
    }));

    setTimeout(() => {
      const filteredData = filterAndValidateCourse({
        ...courseState,
        courseTitle: form.getFieldValue("course-title"),
        courseDescription: form.getFieldValue("course-description"),
        price: parseFloat(form.getFieldValue("price"))
      });
      const errorKeys = Object.keys(filteredData.errors);
      if (errorKeys.length > 0) {
        return toast.error(Object.values(filteredData.errors)[0]);
      }

      try {
        axios
          .post(
            `${API_URL}/courses/create-course?username=${auth?.username}`,
            JSON.stringify({
              data: {
                attributes: {
                  ...filteredData,
                  courseTitle: filteredData.courseTitle,
                  courseDescription: filteredData.courseDescription,
                  price: filteredData.price
                },
              },
            }),
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          )
          .then(async (response) => {
            if (response.data?.success) {

              toast.success("Course has been created successfully");
              navigate('/auth/dashboard');
            } else {
              toast.error(response?.data.message);
            }
          })
          .catch((error) => {
            if (error.response?.data?.message) {
              return toast.error(error.response.data?.message);
            }
            console.error("Error creating Course!:", error.message);
            toast.error(error.message);
          })
      } catch (error) {
        console.error(error);
        toast.error("Unexpected error occured!");
      }
    }, 0);
  };

  return (
    <Card>
      <CardBody className="p-6 mt-2">
        <h6 className="text-secondary font-weight-normal">{titles[activeTab]}</h6>

        <div id="basic-pills-wizard" className="twitter-bs-wizard">
          <ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === 0 })}
                onClick={() => {
                  toggleTab(0);
                }}
              >
                <span className="step-number">01</span>
                <span className="step-title">Course Details</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === 1 })}
                onClick={() => {
                  toggleTab(1);
                }}
              >
                <span className="step-number">02</span>
                <span className="step-title">Module Details</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === 2 })}
                onClick={() => {
                  toggleTab(2);
                }}
              >
                <span className="step-number">03</span>
                <span className="step-title">Lesson Details</span>
              </NavLink>
            </NavItem>
          </ul>
          <Form
            form={form}
            name="course-form"
            layout="vertical"
            className="pt-0 mt-0"
          >
            <TabContent
              activeTab={activeTab}
              className="twitter-bs-wizard-tab-content"
            >
              <TabPane tabId={0}>
                <CourseDetails
                  Form={Form}
                  form={form}
                  handleSubmit={handleSubmit}
                />
              </TabPane>
              <TabPane tabId={1}>
                <ModuleDetails Form={Form} form={form} />
              </TabPane>
              <TabPane tabId={2}>
                <LessonDetails Form={Form} form={form} />
              </TabPane>
            </TabContent>
          </Form>
          <ul className="pager wizard twitter-bs-wizard-pager-link">
            <li className="previous">
              {activeTab === 0 ? (
                <Link to="/auth/my-courses">Go back to My Courses</Link>
              ) : (
                <Link
                  onClick={() => {
                    toggleTab(activeTab - 1);
                  }}
                >
                  Previous
                </Link>
              )}
            </li>
            <li className={activeTab === 2 ? "next disabled" : "next"}>
              <Link
                onClick={() => {
                  toggleTab(activeTab + 1);
                }}
              >
                Next
              </Link>
            </li>
          </ul>
        </div>
      </CardBody>
    </Card>
  );
};

export default CourseSettings;
