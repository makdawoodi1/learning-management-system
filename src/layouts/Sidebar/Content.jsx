import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useLogout from "@/hooks/useLogout";
import useAuth from "@/hooks/useAuth";
import AuthContext from "@/context/context";
import { adminSidebarContent, studentSidebarContent } from "@/data/data";
import { USER_ROLE } from "@/config/config"
import { Tooltip } from "antd"

const Content = ({ courses }) => {
  // Hooks
  const logout = useLogout();
  const { toggleSidebar, auth } = useContext(AuthContext);

  return (
    <div id="sidebar-menu">
      <ul className="metismenu list-unstyled" id="side-menu">

        {auth.role === USER_ROLE.ADMIN ? (
          <>
            {!toggleSidebar && <li className="menu-title">ADMIN</li>}
            {adminSidebarContent.map(content => (
            <li key={content.id}>
              <Link
                to={content.route}
                className="d-flex align-items-center gap-x-2 waves-effect"
              >
                {toggleSidebar ? <Tooltip placement="right" title={content.title}>{content.icon}</Tooltip> : content.icon}
                {!toggleSidebar && <span className="ms-1 nav-text">{content.title}</span>}
                {!toggleSidebar && content.count && <span className="badge rounded-pill bg-primary float-end m-0">{courses?.length}</span>}
              </Link>
            </li>
          ))}
          </>
        ) : (
        <>
          {!toggleSidebar && <li className="menu-title">STUDENT</li>}
          {studentSidebarContent.map(content => (
            <li key={content.id}>
              <Link
                to={content.route}
                className="d-flex align-items-center gap-x-2 waves-effect"
              >
                {toggleSidebar ? <Tooltip placement="right" title={content.title}>{content.icon}</Tooltip> : content.icon}
                {!toggleSidebar && <span className="ms-1 nav-text">{content.title}</span>}
                {!toggleSidebar && content.count && <span className="badge rounded-pill bg-primary float-end m-0">{courses?.length}</span>}
              </Link>
            </li>
          ))}
          </>
        )
        }
      </ul>
    </div>
  );
};

export default Content;
