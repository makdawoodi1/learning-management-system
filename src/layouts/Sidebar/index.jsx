import React from 'react'

//Simple bar
import SimpleBar from "simplebar-react";

import SidebarContent from "./Content";
import { useLocation } from 'react-router-dom';

const Sidebar = ({ toast }) => {
  const { pathname } = useLocation();

  console.log(pathname.includes('enrolled-course'))

  if (pathname.includes('enrolled-course')) {
    return (
      <div className="vertical-menu bar-course-content">
          <div data-simplebar className="h-100">
              <SimpleBar style={{ maxHeight: "100%" }}>
                  <SidebarContent toast={toast} />
              </SimpleBar>
          </div>
      </div>
    )  
  }
  return (
    <div className="vertical-menu">
        <div data-simplebar className="h-100">
            <SimpleBar style={{ maxHeight: "100%" }}>
                <SidebarContent toast={toast} />
            </SimpleBar>
        </div>
    </div>
  )
}

export default Sidebar