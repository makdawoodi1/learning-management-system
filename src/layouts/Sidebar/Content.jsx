import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useLogout from "@/hooks/useLogout";
import useAuth from "@/hooks/useAuth";
import AuthContext from "@/context/context";
import { sidebarContent } from "@/data/data";

import { Tooltip } from "antd"

const Content = () => {
  // Hooks
  const logout = useLogout();
  const { toggleSidebar } = useContext(AuthContext);

  return (
    <div id="sidebar-menu">
      <ul className="metismenu list-unstyled" id="side-menu">
        {!toggleSidebar && <li className="menu-title">ADMIN</li>}

        {sidebarContent.map(content => (
          <li key={content.id}>
            <Link
              to={content.route}
              className="d-flex align-items-center gap-x-4 waves-effect"
            >
              {toggleSidebar ? <Tooltip placement="right" title={content.title}>{content.icon}</Tooltip> : content.icon}
              {!toggleSidebar && <span className="ms-1 nav-text">{content.title}</span>}
              {!toggleSidebar && content.count && <span className="badge rounded-pill bg-success float-end">{content.count}</span>}
            </Link>
          </li>
        ))}

        {/* <li>
          <Link
            to="/login"
            className="d-flex align-items-center gap-x-4 waves-effect"
          >
            <RiPencilRuler2Line size={24} />
            <button className="ms-1 nav-text">
              Sign in
            </button>
          </Link>
        </li>

        <li>
          <Link
            to="/register"
            className="d-flex align-items-center gap-x-4 waves-effect"
          >
            <RiPencilRuler2Line size={24} />
            <button className="ms-1 nav-text">
              Register
            </button>
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Content;
