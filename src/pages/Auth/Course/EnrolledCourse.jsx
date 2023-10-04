import React, { useContext, useEffect, useState } from "react";
import axios from "@/services/axios";
import { API_URL } from "@/config/config";
import toast from "react-hot-toast";
import { Button, Dropdown, Menu, Progress, Space } from "antd";
import { BiTime } from "react-icons/bi";
//Import Breadcrumb
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import AuthContext from "@/context/context";
import { useLocation } from 'react-router-dom';
import { Form, Input } from "antd";
import EditorPreview from "@/components/EditorPreview";
import "./styles.css";
import Quiz from "./Quiz";

const EnrolledCourse = () => {
  const { courseState, setCourseState, auth } = useContext(AuthContext);
  const [content, setContent] = useState({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [disabled, setDisabled] = useState({
    prevButton: false,
    nextButton: false,
  });
  const [progressUpdated, setProgressUpdated] = useState(false);
  const [quizProgressReset, setQuizProgressReset] = useState(false);
  const [progress, setProgress] = useState({
    completed_lessons: 0,
    total_lessons: 0,
    completed_quizzes: 0,
    total_quizzes: 0,
  });
  const { pathname } = useLocation();
  const courseID = pathname.split("/")[3];
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
      content: {}
    });
  }, []);

  useEffect(() => {
    const fetchContent = async (req, res) => {
      try {
        axios
          .get(
            `${API_URL}/courses/get-content?contentObject=${JSON.stringify(courseState.selected)}&username=${auth.username}&courseID=${courseID}`,
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
                modules: fetchedData?.modules,
                progress: {
                  ...prev.progress,
                  completed_lessons: fetchedData?.completedLessons,
                  total_lessons: fetchedData?.totalLessons,
                  completed_quizzes: fetchedData?.completedQuizzes,
                  total_quizzes: fetchedData?.totalQuizzes,
                  attempted_quizzes: fetchedData?.attemptedQuizz
                },
                content: fetchedData.content
              }));
              // setContent(fetchedData.content);
              if (courseState.selected?.type !== 'quiz') setQuizStarted(false);
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
      nextButton: false,
    });
  }, [courseState.selected, quizStarted]);

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
          `${API_URL}/courses/mark-complete?username=${auth.username}&courseID=${courseID}&contentObject=${JSON.stringify(
            courseState.selected
          )}`,
          JSON.stringify({
            data: {
              attributes: {
                modules: courseState.modules  
              },
            },
          }),
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
              modules: fetchedData?.modules,
              // progress: {
              //   ...prev.progress,
              //   completed_lessons: fetchedData?.completedLessons,
              //   completed_quizzes: fetchedData?.completedQuizzes,
              //   attempted_quizzes: fetchedData?.attemptedQuizz
              // },
              content: fetchedData.content
            }));
            // setContent(content);
          }
        })
        .catch((error) => {
          if (error.response?.data?.message) {
            return toast.error(error.response.data?.message);
          }
          console.error("Unexpected error occured!:", error.message);
        })
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occured!");
    }
  };

  const restartQuizProgress = () => {
    try {
      axios
        .delete(
          `${API_URL}/quizzes/delete-quiz-attempt?username=${auth?.username}&quizID=${courseState.content?.id}&courseID=${courseID}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then(async (response) => {
          if (response.data?.success) {

            setQuizStarted(false);
            setQuizProgressReset(true);
            toast.success("Quiz progress has been reset successfully");
          } else {
            toast.error(response?.data.message);
          }
        })
        .catch((error) => {
          if (error.response?.data?.message) {
            return toast.error(error.response.data?.message);
          }
          console.error("Error resetting Quiz progress!:", error.message);
          toast.error(error.message);
        })
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occured!");
    }
  };

  return (
    <div className="page-content my-0">
      <Container fluid>
        <div className="container h-90">
          {courseState.content && (
            <>
              <Row className="px-8">
                <Col xs={2}>
                  <h6 className="text-secondary font-weight-bold d-flex align-items-center">
                    Course Progress
                  </h6>
                </Col>
                <Col xs={10}>
                <Progress
                  percent={Math.floor(
                    ((courseState?.progress.completed_lessons +
                      courseState?.progress.completed_quizzes) /
                      (courseState?.progress.total_lessons +
                        courseState?.progress.total_quizzes)) *
                      100
                  )}
                  size="small"
                />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  {courseState.selected?.type === "lesson" ? (
                    <Card>
                      <CardBody className="p-2 mt-2 d-flex align-items-center justify-content-between">
                        <h6 className="text-secondary font-weight-bold d-flex align-items-center pl-8 mt-4">
                          {courseState.content?.title}
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
                        <EditorPreview value={courseState.content?.content} />
                        {/* {content.completed && (
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
                        )  */}
                        {!courseState.content?.completed ? (
                          <button
                            type="button"
                            className="btn-primary-custom mt-4 px-4 w-fit align-self-end"
                            onClick={handleLessonComplete}
                          >
                            Mark as Completed
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn-primary-custom mt-4 px-4 w-fit align-self-end"
                          >
                            Lesson Completed
                          </button>
                        )}
                      </CardBody>
                    </Card>
                  ) : courseState.selected?.type === "quiz" ? (
                    <>
                      {quizStarted ? (
                        <Quiz
                          quizData={courseState.content}
                          setQuizStarted={setQuizStarted}
                          modules={courseState.modules}
                        />
                      ) : (
                        <Card className="mt-4 py-4 px-4">
                          <div className="quiz-header d-flex flex-column">
                            <div className="d-flex align-items-center justify-content-end gap-4">
                              <p className="fw-bold m-0">
                                Passing Marks:
                                <span className="fw-normal">
                                  {courseState.content?.passingMarks}%
                                </span>
                              </p>
                              <p className="fw-bold m-0">
                                Quiz Attempts:
                                <span className="fw-normal">
                                  {courseState.content?.attemptedQuizz} /
                                  {courseState.content?.attemptNumbers}
                                </span>
                              </p>
                              <div className="d-flex align-items-center gap-2">
                                <BiTime size={24} />
                                <span>
                                  {courseState.content?.timer} {courseState.content?.timerOptions}
                                </span>
                              </div>
                            </div>
                            <hr />
                            <div className="quiz-description">
                              <h6 className="text-secondary fw-bold text-center font-size-24 my-4">
                                {courseState.content?.title}
                              </h6>
                              <h6 className="fw-normal text-secondary text-center">
                                {courseState.content?.description}
                              </h6>
                            </div>
                            <hr />
                            {courseState.content?.completed ||
                            courseState.content?.attemptedQuizz ===
                              courseState.content?.attemptNumbers ? (
                              <button
                                type="button"
                                className="btn-success-custom mt-4 px-4 w-fit align-self-center"
                                onClick={restartQuizProgress}
                              >
                                Reset Quiz Progress
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn-primary-custom mt-4 px-4 w-fit align-self-center"
                                onClick={() => setQuizStarted(true)}
                              >
                                Start Quiz
                              </button>
                            )}
                          </div>
                        </Card>
                      )}
                    </>
                  ) : ""}
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
