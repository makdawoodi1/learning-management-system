import React from 'react'

//Simple bar
import SimpleBar from "simplebar-react";

import SidebarContent from "./Content";

const Sidebar = ({ toast }) => {
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