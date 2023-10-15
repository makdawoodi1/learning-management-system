import { Link, useNavigate } from "react-router-dom";
import { USER_ROLE } from "@/config/config";
import axios from "@/services/axios";
import useLogout from "@/hooks/useLogout";
import useAuth from "@/hooks/useAuth";
import { API_URL } from "@/config/config";
import toast from "react-hot-toast";
import { useState } from "react";

const CourseSideDetail = ({ auth, course, enrolled }) => {
  const [disabled, setDisabled] = useState(false); 
  const logout = useLogout();
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const modules = course.course_modules;
  const lessons = modules?.map((module) => module?.module_lessons)[0];

  const enroll = () => {
    try {
      setDisabled(true);
      axios
        .post(
          `${API_URL}/courses/enroll-course?courseID=${course.id}`,
          JSON.stringify({
            data: {
              attributes: { username: auth.username },
            },
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.data?.success) {
            toast.success("Successfully enrolled in the course!");
            const { key, value } =
              auth?.role === "ADMIN"
                ? { key: "courses", value: auth.courses + 1 }
                : { key: "enrollments", value: auth.enrollments + 1 };
            setAuth({
              ...auth,
              [key]: value,
            });
            navigate(`/auth/enrolled-course/${course.id}`)
          }
          
        })
        .catch((error) => {
          if (error.response?.status === 403) logout();

          if (error.response?.data?.message) {
            return toast.error(error.response.data?.message);
          }
          console.error("Error enrolling into course!:", error.message);
        }).finally(() => {
          setDisabled(false);
        });
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occured!");
    }
  };

  return (
    <div className="course-side-detail" style={{ marginTop: "4.7rem" }}>
      <div className="csd-title">
        <div className="csdt-left">
          <h4 className="mb-0">Price</h4>
        </div>
        <div className="csdt-right">
          {course.price === 0 ? <h4 className="mb-0">Free</h4>
          : <h4 className="mb-0">${course.price}</h4>}
        </div>
      </div>
      <div className="csd-content">
        <div className="csdc-lists">
          <ul className="lab-ul">
            <li>
              <div className="csdc-left">
                <i className="icofont-ui-folder"></i>
                Modules
              </div>
              <div className="csdc-right">{modules?.length}</div>
            </li>
            <li>
              <div className="csdc-left">
                <i className="icofont-ui-file"></i>
                Lessons
              </div>
              <div className="csdc-right">{lessons?.length}</div>
            </li>
            <li>
              <div className="csdc-left">
                <i className="icofont-question-circle"></i>
                Quizzes
              </div>
              <div className="csdc-right">{0}</div>
            </li>
          </ul>
        </div>
        <div className="sidebar-payment">
          <div className="sp-title">
            <h6>Secure Payment</h6>
          </div>
          <div className="sp-thumb">
            <img src="/payment.jpg" alt="CodexCoder" />
          </div>
        </div>
        <div className="course-enroll">
          {auth?.role === USER_ROLE.ADMIN ? (
            <Link
              to={!auth?.username ? "/login" : `/auth/edit-course/${course.id}`}
              className="lab-btn"
            >
              <button className="custom-button-enroll">Edit</button>
            </Link>
          ) : (
            <Link
              to={
                !auth?.username
                  ? "/login"
                  : enrolled
                  ? `/auth/enrolled-course/${course.id}`
                  : ""
              }
              className="lab-btn"
            >
              {enrolled ? (
                <button className="custom-button-enroll">Go to course</button>
              ) : (
                <button disabled={disabled} className="custom-button-enroll" onClick={enroll}>Enroll Now</button>
              )}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseSideDetail;
