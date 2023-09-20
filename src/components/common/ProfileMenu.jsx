import React, { useContext, useState } from "react";
import { adminProfileMenuItems, studentProfileMenuItems } from "@/data/data";
import { USER_ROLE } from "@/config/config";
import useAuth from "@/hooks/useAuth";
import useLogout from "@/hooks/useLogout";
import AuthContext from "@/context/context";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// Import Icons
import {
  RiArrowDropDownLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const { auth } = useContext(AuthContext);
  const logout = useLogout();

  return (
    <Dropdown
      isOpen={open}
      toggle={() => setOpen(!open)}
      className="d-inline-block user-dropdown"
    >
      <DropdownToggle
        tag="button"
        className="btn header-item waves-effect d-flex align-items-center justify-content-center"
        id="page-header-user-dropdown"
      >
        <img
          className="rounded-circle header-profile-user me-1"
          src={auth.profileImage ?? "/author.jpg"}
          alt="Header Avatar"
        />
        <span className="d-none d-xl-inline-block ms-1 text-transform">
          {auth.username}
          <RiArrowDropDownLine className="d-none ms-1 d-xl-inline-block" />
        </span>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-end">
        {auth.role === USER_ROLE.ADMIN ? (
          <>
            {adminProfileMenuItems.map((menu) => (
              <DropdownItem key={menu.id}>
                {menu.title === "Logout" ? (
                  <Link
                    onClick={logout}
                    className="d-flex align-items-center gap-2 font-size-14 text-danger border-spacing-8"
                  >
                    {menu.icon}
                    {menu.title}
                  </Link>
                ) : (
                  <Link
                    to={menu.route}
                    className="d-flex align-items-center gap-2 font-size-14"
                  >
                    {menu.icon}
                    {menu.title}
                  </Link>
                )}
              </DropdownItem>
            ))}
          </>
        ) : (
          <>
            {studentProfileMenuItems.map((menu) => (
              <DropdownItem key={menu.id}>
                {menu.title === "Logout" ? (
                  <Link
                    onClick={logout}
                    className="d-flex align-items-center gap-2 font-size-14 text-danger"
                  >
                    {menu.icon}
                    {menu.title}
                  </Link>
                ) : (
                  <Link
                    to={menu.route}
                    className="d-flex align-items-center gap-2 font-size-14"
                  >
                    {menu.icon}
                    {menu.title}
                  </Link>
                )}
              </DropdownItem>
            ))}
          </>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfileMenu;
