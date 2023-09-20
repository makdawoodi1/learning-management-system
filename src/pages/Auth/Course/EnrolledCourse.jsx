import React, { useContext, useEffect, useState } from "react";
import axios from "@/services/axios";
import { API_URL } from "@/config/config";
import toast from "react-hot-toast";
import { Button, Dropdown, Menu, Progress, Space } from "antd";
import { RiArrowDownSLine } from "react-icons/ri";
//Import Breadcrumb
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import AuthContext from "@/context/context";
import { Form, Input } from "antd";
import EditorPreview from "@/components/EditorPreview";
import "./styles.css";

const EnrolledCourse = () => {
  const { courseState, setCourseState } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [disabled, setDisabled] = useState({
    prevButton: false,
    nextButton: false
  });
  const [progress, setProgress] = useState({
    completed_lessons: 0,
    total_lessons: 0,
    completed_quizzes: 0,
    total_quizzes: 0,
  })
  const [form] = Form.useForm();

  useEffect(() => {
    setCourseState({
      courseTitle: null,
      courseDescription: null,
      thumbnail: null,
      modules: [],
      selected: null,
      progress: {
        completed_lessons: 0,
        total_lessons: 0,
        completed_quizzes: 0,
        total_quizzes: 0,
      },
    });
  }, []);

  useEffect(() => {
    const fetchContent = async (req, res) => {
      try {
        axios
          .get(
            `${API_URL}/courses/get-content?contentObject=${JSON.stringify(
              courseState.selected
            )}`,
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          )
          .then((response) => {
            if (response.data?.success) {
              const fetchedData = response.data;
              setCourseState((prev) => ({
                ...prev,
                modules: fetchedData?.modules
              }));
              setProgress(prev => ({
                ...prev.progress,
                completed_lessons: fetchedData?.completedLessons,
                total_lessons: fetchedData?.totalLessons,
                total_quizzes: fetchedData?.totalQuizzes
              }))
              setContent(response.data?.lessonContent);
            }
          })
          .catch((error) => {
            if (error.response?.data?.message) {
              return toast.error(error.response.data?.message);
            }
            console.error("Error Fetching course content!:", error.message);
          });
      } catch (error) {
        console.error(error);
        toast.error("Unexpected error occured!");
      }
    };

    if (courseState.selected) fetchContent();
    setDisabled({
      prevButton: false,
      nextButton: false
    })
  }, [courseState.selected]);

  // Functions
  const getPreviousLesson = () => {
    const { modules, selected } = courseState;
    const { lessonID, moduleID } = selected;

    if (modules) {
      setDisabled((prev) => ({ ...prev, prevButton: false }));
      for (let moduleIndex = 0; moduleIndex < modules.length; moduleIndex++) {
        const module = modules[moduleIndex];
        if (module.id === moduleID && module.module_lessons) {
          const lessonIndex = module.module_lessons.findIndex(
            (lesson) => lesson.id === lessonID
          );

          if (lessonIndex > 0) {
            // There is a previous lesson within the same module
            const previousLesson = module.module_lessons[lessonIndex - 1];

            // Update the state with the previous lesson
            setCourseState((prev) => ({ 
              ...prev,
              selected: {
                type: "lesson",
                lessonID: previousLesson.id
                  ? parseInt(previousLesson.id)
                  : null,
                moduleID: module.id || null,
              },
            }));
            return;
          } else if (moduleIndex > 0) {
            // There is a previous module with lessons
            const previousModule = modules[moduleIndex - 1];
            const previousModuleLessons = previousModule.module_lessons;

            if (previousModuleLessons && previousModuleLessons.length > 0) {
              const previousLesson =
                previousModuleLessons[previousModuleLessons.length - 1];

              setCourseState((prev) => ({
                ...prev,
                selected: {
                  type: "lesson",
                  lessonID: previousLesson.id
                    ? parseInt(previousLesson.id)
                    : null,
                  moduleID: previousModule.id || null,
                },
              }));
              return;
            }
          }
        }
      }

      return setDisabled((prev) => ({ ...prev, prevButton: true }));
    }
  };

  const getNextLesson = () => {
    const { modules, selected } = courseState;
    const { lessonID, moduleID } = selected;

    if (modules) {
      setDisabled((prev) => ({ ...prev, nextButton: false }));
      for (let moduleIndex = 0; moduleIndex < modules.length; moduleIndex++) {
        const module = modules[moduleIndex];
        if (module.id === moduleID && module.module_lessons) {
          const lessonIndex = module.module_lessons.findIndex(
            (lesson) => lesson.id === lessonID
          );

          if (
            lessonIndex >= 0 &&
            lessonIndex < module.module_lessons.length - 1
          ) {
            const nextLesson = module.module_lessons[lessonIndex + 1];

            setCourseState((prev) => ({
              ...prev,
              selected: {
                type: "lesson",
                lessonID: nextLesson.id ? parseInt(nextLesson.id) : null,
                moduleID: module.id,
              },
            }));
            return;
          } else if (moduleIndex < modules.length - 1) {
            const nextModule = modules[moduleIndex + 1];

            if (
              nextModule.module_lessons &&
              nextModule.module_lessons.length > 0
            ) {
              const nextLesson = nextModule.module_lessons[0];

              setCourseState((prev) => ({
                ...prev,
                selected: {
                  type: "lesson",
                  lessonID: nextLesson.id ? parseInt(nextLesson.id) : null,
                  moduleID: nextModule.id || null,
                },
              }));
              return;
            }
          }
        }
      }

      return setDisabled((prev) => ({ ...prev, nextButton: true }));
    }
  };

  // Handle Lesson Completion
  const handleLessonComplete = () => {
    try {
      axios
        .put(
          `${API_URL}/courses/mark-complete?contentObject=${JSON.stringify(
            courseState.selected
          )}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.data?.success) {
            const fetchedData = response.data;
            setCourseState((prev) => ({
              ...prev,
              modules: fetchedData?.modules
            }));
            setProgress(prev => ({
              ...prev.progress,
              completed_lessons: fetchedData?.completedLessons,
              total_lessons: fetchedData?.totalLessons,
              total_quizzes: fetchedData?.totalQuizzes
            }))
            setContent(response.data?.lessonContent);
          }
        })
        .catch((error) => {
          if (error.response?.data?.message) {
            return toast.error(error.response.data?.message);
          }
          console.error("Unexpected error occured!:", error.message);
        });
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occured!");
    }
  }

  if (courseState) console.log(courseState);

  return (
    <div className="page-content my-0">
      <Container fluid>
        <div className="container h-90">
          {content && (
            <>
              <Row className="px-8">
                <Col xs={2}>
                  <h6 className="text-secondary font-weight-bold d-flex align-items-center">
                    Course Progress
                  </h6>
                </Col>
                <Col xs={10}>
                  <Progress percent={
                    Math.floor((progress.completed_lessons / progress.total_lessons) * 100)
                  } 
                    size="small" />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Card>
                    <CardBody className="p-2 mt-2 d-flex align-items-center justify-content-between">
                      <h6 className="text-secondary font-weight-bold d-flex align-items-center pl-8 mt-4">
                        {content.title}
                      </h6>
                      {/* {content.lessonFiles.length && <Dropdown
                        trigger={["click"]}
                        onOpenChange={() => setOpen(!open)}
                        menu={{
                          items: content.lessonFiles?.map(file => ({
                            label: file.name,
                            key: file.id
                          })),
                          onClick: handleMenuClick,
                        }}
                        open={open}
                      >
                        <a onClick={(e) => e.preventDefault()}>
                          <Space>
                            Lesson Attachments
                            <RiArrowDownSLine />
                          </Space>
                        </a>
                      </Dropdown>} */}
                    </CardBody>
                    <hr />
                    <CardBody className="p-6 mt-2 d-flex flex-column">
                      <EditorPreview value={content.content} />
                      {content.completed ? (
                        <div className="d-flex align-items-center justify-content-between">
                          <button
                            type="button"
                            className="btn-primary-custom mt-4 px-4 w-fit align-self-end"
                            onClick={getPreviousLesson}
                            disabled={disabled.prevButton}
                          >
                            Previous Lesson
                          </button>
                          <button
                            type="button"
                            className="btn-primary-custom mt-4 px-4 w-fit align-self-end"
                            onClick={getNextLesson}
                            disabled={disabled.nextButton}
                          >
                            Next Lesson
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="btn-primary-custom mt-4 px-4 w-fit align-self-end"
                          onClick={handleLessonComplete}
                        >
                          Mark as Completed
                        </button>
                      )}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default EnrolledCourse;
