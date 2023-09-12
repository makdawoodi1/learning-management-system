import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";

//Import images
import avatar3 from "/assets/dashboard-assets/images/users/avatar-3.jpg";
import avatar4 from "/assets/dashboard-assets/images/users/avatar-4.jpg";
import { Link } from "react-router-dom";

// Import Icons
import { RiCheckboxCircleLine, RiNotification3Line, RiShoppingCartLine } from "react-icons/ri"
import { MdArrowCircleRight } from "react-icons/md"

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dropdown
      isOpen={open}
      toggle={() => setOpen(!open)}
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
              <h6 className="m-0 font-size-18"> Notifications </h6>
            </Col>
            <div className="col-auto font-size-14 fw-bold">
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
                <h6 className="mt-0 mb-1 font-size-14">
                  Your order is placed
                </h6>
                <div className="font-size-10 text-muted">
                  <p className="mb-1 font-size-14">
                    If several languages coalesce the grammar
                  </p>
                  <p className="mb-0 font-size-14">
                    3 min ago
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </SimpleBar>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NotificationDropdown;
