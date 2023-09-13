import React, { useState, useRef, useEffect, useContext } from "react";
import { Row, Col, Card, CardHeader, CardBody, Collapse } from "reactstrap";
import { Input, Button, Popconfirm } from "antd";
import * as TYPES from "./types";

// Import Icons
import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { MdArrowDropDown } from "react-icons/md";
import { Link } from "react-router-dom";
import { RiEdit2Line, RiDeleteBinLine } from "react-icons/ri";
import AuthContext from "@/context/context";

const ModuleDetails = ({ Form, form }) => {
  const { courseState, setCourseState } = useContext(AuthContext)
  const getState = () => {
    const selectedKeys = ['module-title', 'module-description']
    const filteredObject = 
      Object.keys(form.getFieldsValue())
      .reduce((result, key) => {
        if (selectedKeys.includes(key)) result[key] = form.getFieldValue(key)
        return result
      }, {})
    return Object.values(filteredObject).some((value) => value !== "");
  }
  const [state, setState] = useState({
    mode: "add",
    selectedModule: {},
    modules: [],
    active: getState(),
  });

  // Refs
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  // Functions
  // Validate Fields
  const validateFields = () => {
    console.log("Validating Module Fields");
  };

  // Clear State
  const clearState = () => {
    form.setFieldValue("module-title", "");
    form.setFieldValue("module-description", "");
    setState({
      ...state,
      mode: "add",
      selectedModule: {},
      active: getState(),
    });
  };

  // Submit module handler
  const handleModuleSubmit = () => {
    const values = form.getFieldsValue();
    if (values['module-title'] === '' || values['module-description'] === '') return

    const updatedModules = [...state.modules];
    const index =
      updatedModules.length &&
      updatedModules?.findIndex(
        (module) =>
          JSON.stringify(module) === JSON.stringify(state.selectedModule)
      );

    if (state.mode === "add") {
      updatedModules.push({
        id: state.modules?.length + 1,
        title: values['module-title'],
        description: values['module-description'],
        lessons: [],
        quiizes: [],
        collapsed: true,
      });
    } else if (index >= 0 && index < updatedModules.length)
      updatedModules[index] = {
        ...updatedModules[index],
        title: values['module-title'],
        description: values['module-description'],
      };
    setCourseState({ ...courseState, modules: updatedModules })
    setState({ ...state, mode: "add", modules: updatedModules })
    form.setFieldValue("module-title", "");
    form.setFieldValue("module-description", "");
  };

  // Edit module

  const editModule = (module) => {
    titleRef.current.input?.focus();
    form.setFieldValue('module-title', module.title)
    form.setFieldValue('module-description', module.description)
    setState({
      ...state,
      mode: "edit",
      selectedModule: { ...module },
    });
  };

  // Delete Module
  const deleteModule = (module) => {
    const updatedModules = [...state?.modules];
    const index = updatedModules.findIndex(
      (currentModule) => currentModule === module
    );

    if (index >= 0 && index < updatedModules.length) {
      updatedModules.splice(index, 1);
      setState({
        ...state,
        modules: updatedModules,
      });
      setCourseState({ ...courseState, modules: updatedModules })
    }
  };

  const toggleCollapse = ({ id, collapsed }) => {
    const updatedModules = state?.modules.map((module) => {
      if (module.id === id) {
        return { ...module, collapsed: !collapsed };
      } else {
        return { ...module, collapsed: true };
      }
    });

    setState({ ...state, modules: updatedModules });
  };

  return (
    <>
      <Row className="place-items-center">
        <Col xs={12} lg={6}>
          <Row>
            <Col xs={12}>
              <Form.Item
                label="Module Title"
                name="module-title"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (state.modules.length === 0 && !value) {
                        return Promise.reject(new Error('Please input the module title!'));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input
                  ref={titleRef}
                  onChange={() =>
                    setState({
                      ...state,
                      active: getState(),
                    })
                  }
                  size="large"
                  className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 "
                  placeholder="Module Title"
                />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item
                label="Module Description"
                title="Description"
                name="module-description"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (state.modules.length === 0 && !value) {
                        return Promise.reject(new Error('The Description has not been entered for the Module!'));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input.TextArea
                  ref={descriptionRef}
                  onChange={() =>
                    setState({
                      ...state,
                      active: getState(),
                    })
                  }
                  size="large"
                  rows={8}
                  className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 "
                  placeholder="Module Description"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={state.active ? 10 : 12}>
              <Form.Item>
                <Button
                  type="dashed"
                  className="d-flex align-items-center justify-content-center mx-auto"
                  onClick={handleModuleSubmit}
                  style={{
                    width: "100%",
                  }}
                  icon={
                    state.mode === "add" ? <PlusOutlined /> : <RiEdit2Line />
                  }
                >
                  {state.mode === "add" ? "Add Module" : "Edit Module"}
                </Button>
              </Form.Item>
            </Col>
            {state.active && (
              <Col xs={12} lg={2}>
                <Button
                  type="dashed"
                  className="d-flex align-items-center justify-content-center mx-auto btn-danger-custom"
                  onClick={clearState}
                  style={{
                    width: "100%",
                  }}
                >
                  Cancel
                </Button>
              </Col>
            )}
          </Row>
        </Col>
        <Col xs={12} lg={6} className="text-center">
          <h6 className="text-secondary font-weight-normal">
            Course Modules ({state.modules?.length})
          </h6>
          {/* <Button
            type="dashed"
            className="d-flex align-items-center justify-content-center mx-auto my-2"
            onClick={add}
            style={{
              width: "80%",
            }}
            icon={<PlusOutlined />}
          >
            Add Module
          </Button> */}
          {state.modules?.length > 0 && (
            <Card
              className="mx-auto my-8 "
              style={{
                width: "80%",
                maxHeight: "500px",
                overflow: "auto",
              }}
            >
              <CardBody>
                {state?.modules?.map((currentModule) => (
                  <div
                    key={currentModule.id}
                    className="accordion ecommerce my-2"
                  >
                    <div className="accordion-item">
                      <h2
                        className="accordion-header d-flex align-items-center justify-content-between"
                        id={`heading${currentModule.id}`}
                      >
                        <button
                          className={`accordion-button${
                            currentModule.collapsed ? " collapsed" : ""
                          }`}
                          onClick={() => toggleCollapse(currentModule)}
                          type="button"
                        >
                          {currentModule.title}
                        </button>
                        <div className="d-flex gap-2 px-2 cursor-pointer font-size-20 text-muted ">
                          <RiEdit2Line
                            color="#62A2B8"
                            onClick={() => editModule(currentModule)}
                          />
                          <Popconfirm
                            title="Delete Module"
                            description="Are you sure to delete this module?"
                            okButtonProps={{
                              danger: true,
                            }}
                            icon={
                              <QuestionCircleOutlined className="text-danger" />
                            }
                            onConfirm={() => deleteModule(currentModule)}
                          >
                            <RiDeleteBinLine color="#DE3545" />
                          </Popconfirm>
                        </div>
                      </h2>
                      <Collapse
                        isOpen={!currentModule.collapsed}
                        className="accordion-collapse"
                      >
                        <div className="accordion-body font-size-14 text-left p-2">
                          {currentModule.description}
                        </div>
                      </Collapse>
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ModuleDetails;
