import React, { useContext, useState } from "react";
import {
  Row,
  Col,
  Form,
  FormGroup,
  InputGroup,
  Input,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import { Link, useLocation } from "react-router-dom";
import { Progress } from 'antd';
import CircularProgressBar from "@/components/CircularProgressBar";

// Import menuDropdown
import NotificationDropdown from "@/components/common/NotificationDropdown";
import ProfileMenu from "@/components/common/ProfileMenu";
import logo from "/logo.png";

//Import Social Profile Images
import github from "/assets/dashboard-assets/images/brands/github.png";
import bitbucket from "/assets/dashboard-assets/images/brands/bitbucket.png";
import dribbble from "/assets/dashboard-assets/images/brands/dribbble.png";
import dropbox from "/assets/dashboard-assets/images/brands/dropbox.png";
import mail_chimp from "/assets/dashboard-assets/images/brands/mail_chimp.png";
import slack from "/assets/dashboard-assets/images/brands/slack.png";

// Import Icons
import {
  RiApps2Line,
  RiFullscreenLine,
  RiMenu2Line,
  RiSearchLine,
  RiSettings2Line,
} from "react-icons/ri";
import AuthContext from "@/context/context";

const Navbar = () => {
  const { pathname } = useLocation();
  const { courseState, toggleSidebar, setToggleSidebar, fullScreenHandle } = useContext(AuthContext);

  console.log(courseState)

  return (
    <header id="page-topbar">
      <div className="navbar-header">
        <div className="d-flex align-items-center">
          <div
            className={`navbar-brand-box 
            ${
              toggleSidebar
                ? "navbar-brand-box-collapsed"
                : pathname.includes('enrolled-course/')
                ? "course-content"
                : ""
            }`}
          >
            <Link
              to="/auth/dashboard"
              className={`logo logo-dark ${
                toggleSidebar ? "logo-collapsed" : ""
              }`}
            >
              <span className="logo-sm">
                <img src={logo} alt="" height="18" style={{ height: "85px" }} />
              </span>
              <span className="logo-lg">
                <img src={logo} alt="" height="16" style={{ height: "85px" }} />
              </span>
            </Link>

            <Link
              to="/auth/dashboard"
              className={`logo logo-light ${
                toggleSidebar ? "logo-collapsed" : ""
              }`}
            >
              <span className="logo-sm">
                <img src={logo} alt="" height="18" style={{ height: "85px" }} />
              </span>
              <span className="logo-lg">
                <img src={logo} alt="" height="16" style={{ height: "85px" }} />
              </span>
            </Link>
          </div>

          <Button
            size="sm"
            color="none"
            type="button"
            onClick={() =>
              setToggleSidebar((prev) => !prev)
            }
            className="px-3 font-size-24 header-item waves-effect"
            id="vertical-menu-btn"
          >
            <RiMenu2Line className="align-middle" />
          </Button>

          {pathname.includes('enrolled-course/') ? (
              <>
                <h4 className="m-0">{courseState?.courseTitle}</h4>
              </>
          ) : (
            // <Form className="app-search d-none d-lg-block">
              <div className="position-relative">
                {/* <Input
                  type="text"
                  className="form-control"
                  style={{ backgroundColor: "#f1f5f7" }}
                  placeholder="Search"
                />
                <span>
                  <RiSearchLine />
                </span> */}
              </div>
            // </Form>
          )}
        </div>

        <div className="d-flex align-items-center">
          <div className="dropdown d-inline-block d-lg-none ms-2">
            <button
              type="button"
              // onClick={() => {
              //   this.setState({ isSearch: !this.state.isSearch });
              // }}
              className="btn header-item noti-icon waves-effect"
              id="page-header-search-dropdown"
            >
              <i className="ri-search-line"></i>
            </button>
            <div
              className={
                "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show"
                // : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
              }
              aria-labelledby="page-header-search-dropdown"
            >
              <Form className="p-3">
                <FormGroup className="m-0">
                  <InputGroup>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                    />
                    <div className="input-group-append">
                      <Button color="primary" type="submit">
                        <RiSearchLine />
                      </Button>
                    </div>
                  </InputGroup>
                </FormGroup>
              </Form>
            </div>
          </div>

          {pathname.includes('enrolled-course/') && (
            <CircularProgressBar />
          )}

          <div className="dropdown d-none d-lg-inline-block ms-1">
            <Button
              color="none"
              type="button"
              className="header-item noti-icon waves-effect"
              onClick={
                fullScreenHandle.active
                  ? fullScreenHandle.exit
                  : fullScreenHandle.enter
              }
            >
              <RiFullscreenLine />
            </Button>
          </div>

          {/* <NotificationDropdown /> */}

          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
