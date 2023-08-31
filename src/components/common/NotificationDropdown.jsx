import React from "react";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";

//Import images
import avatar3 from "/assets/dashboard-assets/images/users/avatar-3.jpg";
import avatar4 from "/assets/dashboard-assets/images/users/avatar-4.jpg";
import { Link } from "react-router-dom";

// Import Icons
import { RiCheckboxCircleLine, RiNotification3Line, RiShoppingCartLine } from "react-icons/ri"
import { MdArrowCircleRight, MdOutlineLockClock } from "react-icons/md"

const NotificationDropdown = () => {
  return (
    <Dropdown
      // isOpen={this.state.menu}
      // toggle={this.toggle}
      className="d-inline-block"
    >
      <DropdownToggle
        tag="button"
        className="btn header-item noti-icon waves-effect"
        id="page-header-notifications-dropdown"
      >
        <RiNotification3Line />
        <span className="noti-dot"></span>
      </DropdownToggle>
      <DropdownMenu
        className="dropdown-menu-end dropdown-menu-lg p-0"
        aria-labelledby="page-header-notifications-dropdown"
      >
        <div className="p-3">
          <Row className="align-items-center">
            <Col>
              <h6 className="m-0"> Notifications </h6>
            </Col>
            <div className="col-auto">
              <Link to="#" className="small">
                View All
              </Link>
            </div>
          </Row>
        </div>
        <SimpleBar style={{ maxHeight: "230px" }}>
          <Link to="#" className="text-reset notification-item">
            <div className="d-flex">
              <div className="avatar-xs me-3">
                <span className="avatar-title bg-primary rounded-circle font-size-16">
                  <RiShoppingCartLine />
                </span>
              </div>
              <div className="flex-1">
                <h6 className="mt-0 mb-1">
                  Your order is placed
                </h6>
                <div className="font-size-12 text-muted">
                  <p className="mb-1">
                    If several languages coalesce the grammar
                  </p>
                  <p className="mb-0">
                    <MdOutlineLockClock />
                    3 min ago
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <Link to="#" className="text-reset notification-item">
            <div className="d-flex">
              <img
                src={avatar3}
                className="me-3 rounded-circle avatar-xs"
                alt="user-pic"
              />
              <div className="flex-1">
                <h6 className="mt-0 mb-1">James Lemire</h6>
                <div className="font-size-12 text-muted">
                  <p className="mb-1">
                    It will seem like simplified English.
                  </p>
                  <p className="mb-0">
                    <i className="mdi mdi-clock-outline"></i>
                    1 hours ago
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <Link to="#" className="text-reset notification-item">
            <div className="d-flex">
              <div className="avatar-xs me-3">
                <span className="avatar-title bg-success rounded-circle font-size-16">
                  <RiCheckboxCircleLine />
                </span>
              </div>
              <div className="flex-1">
                <h6 className="mt-0 mb-1">
                  Your item is shipped
                </h6>
                <div className="font-size-12 text-muted">
                  <p className="mb-1">
                    If several languages coalesce the grammar
                  </p>
                  <p className="mb-0">
                    <MdOutlineLockClock />
                    3 min ago
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="#" className="text-reset notification-item">
            <div className="d-flex">
              <img
                src={avatar4}
                className="me-3 rounded-circle avatar-xs"
                alt="user-pic"
              />
              <div className="flex-1">
                <h6 className="mt-0 mb-1">Salena Layfield</h6>
                <div className="font-size-12 text-muted">
                  <p className="mb-1">
                    As a skeptical Cambridge friend of mine occidental.
                  </p>
                  <p className="mb-0">
                    <MdOutlineLockClock />
                    1 hours ago
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </SimpleBar>
        <div className="p-2 border-top">
          <Link
            to="#"
            className="btn btn-sm btn-link font-size-14 btn-block text-center"
          >
            <MdArrowCircleRight />
             View More
          </Link>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NotificationDropdown;
