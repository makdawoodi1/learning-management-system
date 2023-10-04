import React, { useState, useEffect, useContext } from "react";
import { Radio, Checkbox, Button } from "antd";
import { Card, CardBody } from "reactstrap";
import { BiTime } from "react-icons/bi";
import { API_URL } from "@/config/config";
import toast from "react-hot-toast";
import axios from "@/services/axios";
import AuthContext from "@/context/context";
import { useLocation } from "react-router-dom";

const Quiz = ({ quizData, setQuizStarted, modules }) => {
  const { auth, courseState } = useContext(AuthContext);
  const { pathname } = useLocation();
  const courseID = pathname.split("/")[3];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [checkboxDisabled, setCheckboxDisabled] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [attemptedQuestionCount, setAttemptedQuestionCount] = useState(0);
  const [quizState, setQuizState] = useState({});
  const [timer, setTimer] = useState(quizData.timer);

  const [questionsState, setQuestionsState] = useState(
    quizData.questions?.map((question) => ({
      correctOptions: question.correct_answer,
      selectedOptions: [],
      isCorrectAnswer: null,
    }))
  );

  const currentQuestion = quizData?.questions[currentQuestionIndex];
  let interval;

  useEffect(() => {
    if (timer > 0 && currentQuestionIndex < quizData.questions.length) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    } else handleQuizResult();
  }, [timer, currentQuestionIndex, quizData.questions.length]);

  const handleOptionChange = (e) => {
    const selectedAnswer = e.target?.value;

    switch (currentQuestion.question_type) {
      case "TRUE_FALSE":
      case "SINGLE_CHOICE":
        setIsCorrectAnswer(
          selectedAnswer === currentQuestion.correct_answer[0]
        );
        setAttemptedQuestionCount((count) => count + 1);
        setQuestionsState((prevQuestionsState) => {
            const newState = [...prevQuestionsState];
            newState[currentQuestionIndex] = {
              ...newState[currentQuestionIndex],
              selectedOptions: [selectedAnswer],
              isCorrectAnswer: selectedAnswer === currentQuestion.correct_answer[0],
            };
            return newState;
        });
        break;

      case "MULTIPLE_CHOICE":
        const selectedOptions = e.map((option) => option);
        setIsCorrectAnswer(
          arraysEqual(selectedOptions, currentQuestion.correct_answer)
        );
        break;
    }

    setSelectedOption(selectedAnswer);
  };

  const nextQuestion = () => {
    if (selectedOption !== null || isCorrectAnswer) {
      if (isCorrectAnswer) {
        setScore(score + 1);
      }

      setSelectedOptions([]);
      setIsCorrectAnswer(null);
      setSelectedOption(null);

      if (currentQuestionIndex + 1 < quizData.questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setCheckboxDisabled(false);
      } else {
        // Display the result screen
      }
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTimer(quizData.timer);
      setSelectedOptions([]);
      setSelectedOption(null);
      setIsCorrectAnswer(null);
      setCheckboxDisabled(false);
    }
  };

  const handleCheckboxChange = (selectedValues, correctValues) => {
    const isCorrect = arraysEqual(selectedValues, correctValues);
    const isDisabled =
      isCorrect ||
      (correctValues.length === currentQuestion.correct_answer?.length &&
        selectedValues.length === currentQuestion.correct_answer?.length);
    setIsCorrectAnswer(isCorrect);
    setSelectedOptions(selectedValues);
    setSelectedOption(null); // Reset selectedOption when checkboxes are used
    setCheckboxDisabled(isDisabled);
    if (isDisabled) {
        const isCorrect = 
            (selectedValues.length === currentQuestion.correct_answer.length) && 
            selectedValues.every((value) => currentQuestion.correct_answer?.includes(value))
        setAttemptedQuestionCount((count) => count + 1);
        setQuestionsState((prevQuestionsState) => {
            const newState = [...prevQuestionsState];
            newState[currentQuestionIndex] = {
              ...newState[currentQuestionIndex],
              selectedOptions: [...selectedValues],
              isCorrectAnswer: isCorrect,
            };
            return newState;
        });
    }
  };

  const arraysEqual = (arr1, arr2) => {
    return (
      arr1.length === arr2.length &&
      arr1.every((value, index) => value === arr2[index])
    );
  };

  const handleQuizResult = () => {
    setQuizFinished(true);
    const totalScore = questionsState.reduce(
        (totalScore, question) => totalScore + Number(question.isCorrectAnswer),
        0
    );
    const passingScore = (quizData.passingMarks / 100) * quizData.questions.length;
    setQuizState({
        totalScore,
        passingScore,
        marks: totalScore >= passingScore
    })
    clearInterval(interval);
    
    try {
      axios
        .post(
          `${API_URL}/quizzes/create-quiz-attempt?username=${auth?.username}&quizID=${quizData.id}&moduleID=${quizData.moduleID}&courseID=${courseID}`,
          JSON.stringify({
            data: {
              attributes: {
                questionsState,
                quizState: {
                  totalScore,
                  passingScore,
                  marks: totalScore >= passingScore
                },
                quiz: quizData,
                modules: modules
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

            toast.success("Quiz has been submitted successfully");

          } else {
            toast.error(response?.data.message);
          }
        })
        .catch((error) => {
          if (error.response?.data?.message) {
            return toast.error(error.response.data?.message);
          }
          console.error("Error submitting Quiz!:", error.message);
          toast.error(error.message);
        })
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occured!");
    }
  };

  return (
    <div>
      <Card>
        <CardBody className="d-flex align-items-center justify-content-between">
          <h6 className="text-secondary font-weight-bold d-flex align-items-center mt-2 pl-8">
            {quizData.title}
          </h6>
          <div className="mt-2 d-flex align-items-center gap-2">
            <BiTime size={24} className="m-0" />
            <span className="fw-normal font-size-14">
              {timer} {quizData.timerOptions} left
            </span>
          </div>
        </CardBody>
        <hr className="my-0" />
        {quizFinished ? (
          <div className="d-flex flex-column align-items-center justify-content-center gap-y-4">
            <h3 className="fw-bold text-secondary mx-8">Quiz Finished</h3>
            <h6 className="fw-bold text-secondary mx-8">Total Questions: {quizData.questions?.length}</h6>
            <h6 className="fw-bold text-secondary mx-8">Correct Answers: {quizState.totalScore}</h6>
            <h6 className="fw-bold text-secondary mx-8">Quiz Remarks: {quizState.marks ? "Passed" : "Failed"}</h6>
            <button
                type="button"
                className="btn-primary-custom cursor-pointer mb-4 px-4 w-fit align-self-center"
                onClick={() => setQuizStarted(false)}
            >
                Exit Quiz
            </button>
          </div>
        ) : (
          <CardBody>
            <h4 className="text-secondary font-weight-bold">
              Question {currentQuestionIndex + 1}
            </h4>
            <hr />
            <div className="question-content mt-8 px-8">
              <h6 className="fw-bold text-primary my-4">
                {currentQuestion.question}
              </h6>
              {currentQuestion.question_type === "TRUE_FALSE" && (
                <Radio.Group
                  className="radio-group-custom"
                  onChange={handleOptionChange}
                  value={selectedOption}
                  disabled={selectedOption !== null}
                >
                  {currentQuestion.quiz_options.map((option, index) => (
                    <Radio
                      key={index}
                      value={option}
                      style={{
                        backgroundColor:
                          isCorrectAnswer === true &&
                          option === currentQuestion.correct_answer[0]
                            ? "#1bc71b"
                            : isCorrectAnswer === false &&
                              option === selectedOption
                            ? "#ff4848"
                            : "transparent",
                        color:
                          (isCorrectAnswer === true &&
                            option === currentQuestion.correct_answer[0]) ||
                          (isCorrectAnswer === false &&
                            option === selectedOption)
                            ? "white"
                            : "black",
                      }}
                    >
                      {option}
                    </Radio>
                  ))}
                </Radio.Group>
              )}
              {currentQuestion.question_type === "SINGLE_CHOICE" && (
                <Radio.Group
                  className="radio-group-custom"
                  onChange={handleOptionChange}
                  value={selectedOption}
                  disabled={selectedOption !== null}
                >
                  {currentQuestion.quiz_options.map((option, index) => (
                    <Radio
                      key={index}
                      value={option}
                      style={{
                        backgroundColor:
                          isCorrectAnswer === true &&
                          option === currentQuestion.correct_answer[0]
                            ? "#1bc71b"
                            : isCorrectAnswer === false &&
                              option === selectedOption
                            ? "#ff4848"
                            : "transparent",
                        color:
                          (isCorrectAnswer === true &&
                            option === currentQuestion.correct_answer[0]) ||
                          (isCorrectAnswer === false &&
                            option === selectedOption)
                            ? "white"
                            : "black",
                      }}
                    >
                      {option}
                    </Radio>
                  ))}
                </Radio.Group>
              )}
              {currentQuestion.question_type === "MULTIPLE_CHOICE" && (
                <Checkbox.Group
                  className="checkbox-group-custom"
                  onChange={(values) =>
                    handleCheckboxChange(values, currentQuestion.correct_answer)
                  }
                  value={selectedOptions}
                >
                  {currentQuestion.quiz_options.map((option, index) => {
                    const isOptionCorrect =
                      currentQuestion.correct_answer.includes(option);
                    const isChecked = selectedOptions.includes(option);
                    const backgroundColor = isChecked
                      ? isOptionCorrect
                        ? "#1bc71b"
                        : "#ff4848"
                      : "transparent";
                    const textColor = isChecked ? "white" : "black";
                    const isDisabled =
                      isCorrectAnswer ||
                      (isOptionCorrect &&
                        currentQuestion.correct_answer.length ===
                          currentQuestion.correct_answer?.length &&
                        selectedOptions.length ===
                          currentQuestion.correct_answer?.length);

                    return (
                      <Checkbox
                        key={index}
                        value={option}
                        style={{
                          backgroundColor,
                          color: textColor,
                        }}
                        disabled={checkboxDisabled}
                      >
                        {option}
                      </Checkbox>
                    );
                  })}
                </Checkbox.Group>
              )}
            </div>
            <div className="d-flex align-items-center justify-content-center">
              {attemptedQuestionCount === quizData.questions?.length ? (
                <button
                  type="button"
                  className="btn-primary-custom cursor-pointer mt-4 px-4 w-fit align-self-center"
                  onClick={handleQuizResult}
                >
                  Go to Results
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-primary-custom cursor-pointer mt-4 px-4 w-fit align-self-center"
                  onClick={nextQuestion}
                  disabled={selectedOption === null}
                >
                  Next Question
                </button>
              )}
            </div>
          </CardBody>
        )}
      </Card>
    </div>
  );
};

export default Quiz;
