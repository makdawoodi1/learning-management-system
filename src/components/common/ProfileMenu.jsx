import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// Import Images
import avatar2 from "/assets/dashboard-assets/images/users/avatar-2.jpg";

// Import Icons
import { RiArrowDropDownLine, RiLockUnlockLine, RiSettings2Line, RiShutDownLine, RiUserLine, RiWallet2Line } from "react-icons/ri";

const ProfileMenu = () => {
  const username = "fahmeed";

  return (
    <Dropdown
      // isOpen={this.state.menu}
      // toggle={this.toggle}
      className="d-inline-block user-dropdown"
    >
      <DropdownToggle
        tag="button"
        className="btn header-item waves-effect d-flex flex-column align-items-center justify-content-center"
        id="page-header-user-dropdown"
      >
        <img
          className="rounded-circle header-profile-user me-1"
          src={avatar2}
          alt="Header Avatar"
        />
        <span className="d-none d-xl-inline-block ms-1 text-transform">
          {username}
          <RiArrowDropDownLine className="d-none ms-1 d-xl-inline-block" />
        </span>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-end">
        <DropdownItem href="#">
          <RiUserLine className="align-middle me-1" />
          Profile
        </DropdownItem>
        <DropdownItem href="#">
          <RiWallet2Line className="align-middle me-1"/>
          My Wallet
        </DropdownItem>
        <DropdownItem className="d-block" href="#">
          <span className="badge badge-success float-end mt-1">11</span>
          <RiSettings2Line className="align-middle me-1" />
          Settings
        </DropdownItem>
        <DropdownItem href="#">
          <RiLockUnlockLine className="align-middle me-1" />
          Lock screen
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem className="text-danger" href="/logout">
          <RiShutDownLine className="align-middle me-1 text-danger" />
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfileMenu;
