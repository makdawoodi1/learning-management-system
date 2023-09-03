import React from "react";
import { Link } from "react-router-dom";
import useLogout from "@/hooks/useLogout";
import useAuth from "@/hooks/useAuth";

// import Icons
import {
  RiAccountCircleLine,
  RiCalendar2Line,
  RiChat1Line,
  RiDashboardLine,
  RiMailSendLine,
  RiPencilRuler2Line,
  RiProfileLine,
  RiStore2Line,
} from "react-icons/ri";

const Content = () => {
  // Hooks
  const logout = useLogout();

  return (
    <div id="sidebar-menu">
      <ul className="metismenu list-unstyled" id="side-menu">
        <li className="menu-title">ADMIN</li>

        <li>
          <Link
            to="/auth/dashboard"
            className="d-flex align-items-center gap-x-4 waves-effect"
          >
            <RiDashboardLine size={24} />
            <span className="ms-1 nav-text">Dashboard</span>
          </Link>
        </li>

        <li>
          <Link
            to="/auth/profile"
            className="d-flex align-items-center gap-x-4 waves-effect"
          >
            <RiDashboardLine size={24} />
            <span className="ms-1 nav-text">My Profile</span>
          </Link>
        </li>

        <li>
          <Link
            to="/auth/my-courses"
            className="d-flex align-items-center gap-x-4 waves-effect"
          >
            <RiCalendar2Line size={24} />
            <span className="ms-1 nav-text">My Courses</span>
            <span className="badge rounded-pill bg-success float-end">3</span>
          </Link>
        </li>

        <li>
          <Link
            to="/auth/announcements"
            className="d-flex align-items-center gap-x-4 waves-effect"
          >
            <RiChat1Line size={24} />
            <span className="ms-1 nav-text">Announcements</span>
          </Link>
        </li>

        <li>
          <Link
            to="/auth/earnings"
            className="d-flex align-items-center gap-x-4 waves-effect"
          >
            <RiStore2Line size={24} />
            <span className="ms-1 nav-text">Withdrawals</span>
          </Link>
        </li>

        <li>
          <Link
            to="/auth/submissions"
            className="d-flex align-items-center gap-x-4 waves-effect"
          >
            <RiMailSendLine size={24} />
            <span className="ms-1 nav-text">Quiz Attempts</span>
          </Link>
        </li>

        <li>
          <Link
            to="/auth/assignments"
            className="d-flex align-items-center gap-x-4 waves-effect"
          >
            <RiAccountCircleLine size={24} />
            <span className="ms-1 nav-text">Assignments</span>
          </Link>
        </li>

        <li>
          <Link
            to="/auth/student-submissions"
            className="d-flex align-items-center gap-x-4 waves-effect"
          >
            <RiProfileLine size={24} />
            <span className="ms-1 nav-text">My Students</span>
          </Link>
        </li>

        <li>
          <Link
            to="/auth/settings"
            className="d-flex align-items-center gap-x-4 waves-effect"
          >
            <RiPencilRuler2Line size={24} />
            <span className="ms-1 nav-text">Settings</span>
          </Link>
        </li>

        <li>
          <Link
            to="#"
            className="d-flex align-items-center gap-x-4 waves-effect"
          >
            <RiPencilRuler2Line size={24} />
            <button className="ms-1 nav-text" onClick={logout}>
              Logout
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Content;
