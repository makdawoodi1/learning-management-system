import { Link } from "react-router-dom";
import { USER_ROLE } from "@/config/config";
import axios from "@/services/axios";
import useLogout from "@/hooks/useLogout";
import { API_URL } from "@/config/config";
import toast from "react-hot-toast";

const CourseSideDetail = ({ auth, course, enrolled }) => {
  const logout = useLogout();
  const modules = course.course_modules;
  const lessons = modules?.map((module) => module?.module_lessons)[0];

  const enroll = () => {
    try {
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
          }
          console.log("here");
        })
        .catch((error) => {
          if (error.response?.status === 403) logout();

          if (error.response?.data?.message) {
            return toast.error(error.response.data?.message);
          }
          console.error("Error enrolling into course!:", error.message);
        });
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occured!");
    }
  };

  return (
    <div className="course-side-detail">
      <div className="csd-title">
        <div className="csdt-left">
          <h4 className="mb-0">Price</h4>
        </div>
        <div className="csdt-right">
          <h4 className="mb-0">${course.price}</h4>
        </div>
      </div>
      <div className="csd-content">
        <div className="csdc-lists">
          <ul className="lab-ul">
            <li>
              <div className="csdc-left">
                <i className="icofont-video-alt"></i>
                Modules
              </div>
              <div className="csdc-right">{modules?.length}</div>
            </li>
            <li>
              <div className="csdc-left">
                <i className="icofont-video-alt"></i>
                Lessons
              </div>
              <div className="csdc-right">{lessons?.length}</div>
            </li>
            <li>
              <div className="csdc-left">
                <i className="icofont-abacus-alt"></i>
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
            <img src="/assets/images/pyment/01.jpg" alt="CodexCoder" />
          </div>
        </div>
        <div className="course-enroll">
          {auth?.role === USER_ROLE.ADMIN ? (
            <Link
              to={!auth?.username ? "/login" : `/auth/edit-course/${course.id}`}
              className="lab-btn"
            >
              <span>Edit</span>
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
                <span>Go to course</span>
              ) : (
                <span onClick={enroll}>Enroll Now</span>
              )}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseSideDetail;
