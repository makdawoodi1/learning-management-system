import React, { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/context";
import { Menu } from "antd";
import { useLocation } from "react-router-dom";
import axios from "@/services/axios";
import { API_URL } from "@/config/config";

const getItem = (label, key, children, type) => {
  return {
    key,
    children,
    label,
    type,
  };
}

const EnrolledCourseContent = ({ toast }) => {
  const { toggleSidebar, setCourseState, auth } = useContext(AuthContext);
  const [items, setItems] = useState([])
  const { pathname } = useLocation();
  const courseID = pathname.split("/")[3];

  useEffect(() => {
    const fetchCourse = async (req, res) => {
      try {
        return new Promise((resolve, reject) => {
          axios
            .get(`${API_URL}/courses/get-enrolled-course?username=${auth.username}&courseID=${courseID}`, {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            })
            .then((response) => {
              if (response.data?.success) {
                const fetchedCourse = response.data?.course;
                setCourseState(prev => ({
                  ...prev,
                  courseTitle: fetchedCourse.title,
                  courseDescription: fetchedCourse.description,
                  thumbnail: fetchedCourse.thumbnail?.objectKey,
                  modules: fetchedCourse.modules
                }));
                resolve(fetchedCourse);
              }
            })
            .catch((error) => {
              if (error.response?.data?.message) {
                reject(toast.error(error.response.data?.message));
              }
              console.error("Error Fetching courses!:", error.message);
            });
        })
      } catch (error) {
        console.error(error);
        toast.error("Unexpected error occured!");
      }
    };

    fetchCourse().then((course) => {
      generateCourseState(course.modules)
    }).catch(error => {
      console.error(error);
      toast.error("Unexpected error occured!");
    })
  }, []);

  const generateCourseState = (modules) => {
    const items = modules?.map(module => (
      getItem(module.title, `${module.id}`, [
        getItem("Lessons", "lessonGroup", module.lessons?.map(lesson => (
          getItem(lesson.title, `lesson${lesson.id}`)
        )), "group"),
        getItem("Quizzes", "quizGroup", module.quizzes?.map(quiz => (
          getItem(quiz.title, `quiz${quiz.id}`)
        )), "group"),
        // getItem("Assignments", "assignmentGroup", module.assignments?.map(assignment => (
        //   getItem(assignment.title, `assignment-${assignment.id}`)
        // )), "group")
      ]))
    )
    setItems(items)
  };

  const handleClick = (e) => {
    const inputArray = e.keyPath;
    const [type, id] = inputArray[0].split(/(\d+)/);
    const moduleID = parseInt(inputArray[1]);
 
    const resultObject = {
      type: type.toLowerCase(),
      moduleID: moduleID
    };
    type === 'lesson' ? resultObject.lessonID = parseInt(id) : resultObject.quizID = parseInt(id)
    setCourseState(prev => ({ ...prev, selected: resultObject }))
  };

  if (!toggleSidebar) {
    return (
      <Menu
        onClick={handleClick}
        style={{
          width: "100%",
        }}
        // defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    );
  }
};

export default EnrolledCourseContent;
