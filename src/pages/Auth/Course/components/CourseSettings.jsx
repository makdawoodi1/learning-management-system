import React, { useState, useCallback, useContext } from "react";
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
import { Link } from "react-router-dom";
import { CourseDetails, ModuleDetails, LessonDetails } from "./forms";
import { Form } from "antd";
import * as TYPES from "./forms/types";
import AuthContext from "@/context/context";

const CourseSettings = () => {
  const [form] = Form.useForm();
  const { courseState, setCourseState } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState(0);

  console.log(courseState);

  // Functions
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      if (tab >= 0 && tab <= 2) {
        setActiveTab(tab);
      }
    }
  };

  const handleSubmit = () => {
    console.log(form.getFieldsValue())
    console.log(courseState)
  }

  return (
    <Card>
      <CardBody className="p-6 mt-2">
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
                  <CourseDetails Form={Form} form={form} handleSubmit={handleSubmit} />
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
            <li
              className="previous"
            >
              {activeTab === 0 ? (
                <Link to="/auth/my-courses">
                  Go back to My Courses
                </Link>
              ) : (
                <Link
                  onClick={ () => { toggleTab(activeTab - 1) }}
                >
                  Previous
                </Link>
              )}
            </li>
            <li className={activeTab === 3 ? "next disabled" : "next"}>
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
