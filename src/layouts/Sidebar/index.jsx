import React, { useContext } from 'react'

//Simple bar
import SimpleBar from "simplebar-react";
import EnrolledCourseContent from "./EnrolledCourseContent"
import SidebarContent from "./Content";
import { useLocation } from 'react-router-dom';
import AuthContext from '@/context/context';

const Sidebar = ({ toast }) => {
  const {  auth, toggleSidebar } = useContext(AuthContext)
  const { pathname } = useLocation();
  const courses = auth?.username && auth.role === 'ADMIN' ? auth.courses : auth.enrollments;

  if (pathname.includes('enrolled-course/')) {
    return (
      <div className={`vertical-menu ${toggleSidebar ? "vertical-menu-course-collapsed" : "vertical-menu-course-content"}`}>
          <div data-simplebar className="h-100">
              <SimpleBar style={{ maxHeight: "100%" }}>
                  <EnrolledCourseContent toast={toast} courses={courses} />
              </SimpleBar>
          </div>
      </div>
    )  
  }
  return (
    <div className={`vertical-menu ${toggleSidebar && "vertical-menu-collapsed"}`}>
        <div data-simplebar className="h-100">
            <SimpleBar style={{ maxHeight: "100%" }}>
                <SidebarContent toast={toast} courses={courses} />
            </SimpleBar>
        </div>
    </div>
  )
}

export default Sidebar