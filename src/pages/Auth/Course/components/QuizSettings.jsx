import React, { useContext, useState } from "react";
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
import { Form, Input } from "antd";
import AuthContext from "@/context/context";
import { filterAndValidateCourse } from "@/helpers/helper";

// Components
import { QuizDetails, QuizQuestions } from "./forms";
import toast from "react-hot-toast";

const titles = ["Quiz Details", "Quiz Questions"];
const QuizSettings = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { courseState, setCourseState } = useContext(AuthContext);
  const [state, setState] = useState({
    mode: "add"
  })

  const [activeTab, setActiveTab] = useState(0);

  // Functions
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      if (tab >= 0 && tab <= 2) {
        setActiveTab(tab);
      }
    }
  };

  return (
    <Card>
      <CardBody className="p-6 mt-2">
        <h6 className="text-secondary font-weight-normal">
          {titles[activeTab]}
        </h6>

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
                <span className="step-title">{titles[0]}</span>
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
                <span className="step-title">{titles[1]}</span>
              </NavLink>
            </NavItem>
          </ul>
          <Form
            form={form}
            name="quiz-form"
            layout="vertical"
            className="pt-0 mt-0"
          >
            <TabContent
              activeTab={activeTab}
              className="twitter-bs-wizard-tab-content"
            >
              <TabPane tabId={0}>
                <QuizDetails
                  Form={Form}
                  form={form}
                  // handleSubmit={handleSubmit}
                  rootState={state} 
                  setRootState={setState}
                />
              </TabPane>
              <TabPane tabId={1}>
                <QuizQuestions Form={Form} form={form} rootState={state} setRootState={setState} />
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
            <li className={activeTab === 1 ? "next disabled" : "next"}>
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

export default QuizSettings;
