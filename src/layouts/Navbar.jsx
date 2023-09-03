import React, { useState } from "react";
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

import { Link } from "react-router-dom";

// Import menuDropdown
import NotificationDropdown from "@/components/common/NotificationDropdown";
import ProfileMenu from "@/components/common/ProfileMenu";

//Import logo Images
// import logosmdark from "/assets/dashboard-assets/images/logo-sm-dark.png";
// import logodark from "/assets/dashboard-assets/images/logo-dark.png";
// import logosmlight from "/assets/dashboard-assets/images/logo-sm-light.png";
// import logolight from "/assets/dashboard-assets/images/logo-light.png";
import logo from "/assets/dashboard-assets/images/logo.png";


//Import Social Profile Images
import github from "/assets/dashboard-assets/images/brands/github.png";
import bitbucket from "/assets/dashboard-assets/images/brands/bitbucket.png";
import dribbble from "/assets/dashboard-assets/images/brands/dribbble.png";
import dropbox from "/assets/dashboard-assets/images/brands/dropbox.png";
import mail_chimp from "/assets/dashboard-assets/images/brands/mail_chimp.png";
import slack from "/assets/dashboard-assets/images/brands/slack.png";

// Import Icons
import { RiApps2Line, RiFullscreenLine, RiMenu2Line, RiSearchLine, RiSettings2Line } from 'react-icons/ri'

const Navbar = () => {

  return (
    <header id="page-topbar">
      <div className="navbar-header">
        <div className="d-flex align-items-center">
          <div className="navbar-brand-box">
            <Link to="/auth/dashboard" className="logo logo-dark">
              <span className="logo-sm">
                <img src={logo} alt="" height="18" style={{ height: "85px" }} />
              </span>
              <span className="logo-lg">
                <img src={logo} alt="" height="16" style={{ height: "85px" }} />
              </span>
            </Link>

            <Link to="/auth/dashboard" className="logo logo-light">
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
            // onClick={this.toggleMenu}
            className="px-3 font-size-24 header-item waves-effect"
            id="vertical-menu-btn"
          >
            <RiMenu2Line className="align-middle" />
          </Button>

          <Form className="app-search d-none d-lg-block">
            <div className="position-relative">
              <Input
                type="text"
                className="form-control"
                style={{ backgroundColor: "#f1f5f7" }}
                placeholder="Search"
              />
              <span><RiSearchLine /></span>
            </div>
          </Form>

        </div>

        <div className="d-flex">
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

          <Dropdown
            // isOpen={this.state.isSocialPf}
            // toggle={() => this.setState({ isSocialPf: !this.state.isSocialPf })}
            className="d-none d-lg-inline-block ms-1"
          >
            <DropdownToggle
              tag="button"
              className="btn header-item noti-icon waves-effect"
            >
              <RiApps2Line />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-lg dropdown-menu-end">
              <div className="px-lg-2">
                <Row className="g-0">
                  <Col>
                    <Link className="dropdown-icon-item" to="#">
                      <img src={github} alt="Github" />
                      <span>GitHub</span>
                    </Link>
                  </Col>
                  <Col>
                    <Link className="dropdown-icon-item" to="#">
                      <img src={bitbucket} alt="bitbucket" />
                      <span>Bitbucket</span>
                    </Link>
                  </Col>
                  <Col>
                    <Link className="dropdown-icon-item" to="#">
                      <img src={dribbble} alt="dribbble" />
                      <span>Dribbble</span>
                    </Link>
                  </Col>
                </Row>

                <Row className="g-0">
                  <Col>
                    <Link className="dropdown-icon-item" to="#">
                      <img src={dropbox} alt="dropbox" />
                      <span>Dropbox</span>
                    </Link>
                  </Col>
                  <Col>
                    <Link className="dropdown-icon-item" to="#">
                      <img src={mail_chimp} alt="mail_chimp" />
                      <span>Mail Chimp</span>
                    </Link>
                  </Col>
                  <Col>
                    <Link className="dropdown-icon-item" to="#">
                      <img src={slack} alt="slack" />
                      <span>Slack</span>
                    </Link>
                  </Col>
                </Row>
              </div>
            </DropdownMenu>
          </Dropdown>

          <div className="dropdown d-none d-lg-inline-block ms-1">
            <Button
              color="none"
              type="button"
              className="header-item noti-icon waves-effect"
              // onClick={this.toggleFullscreen}
            >
              <RiFullscreenLine />
            </Button>
          </div>

          <NotificationDropdown />

          <ProfileMenu />

          <div className="dropdown d-inline-block">
            <Button
              color="none"
              // onClick={this.toggleRightbar}
              type="button"
              className="header-item noti-icon right-bar-toggle waves-effect"
            >
              <RiSettings2Line />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
