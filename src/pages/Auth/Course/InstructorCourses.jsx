import React, { useState } from "react";

//Import Breadcrumb
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Container } from "reactstrap";

const InstructorCourses = () => {
  const [breadcrumbItems] = useState([
    { title: "Home", link: "/" },
    { title: "My Courses", link: "/auth/my-courses" },
  ]);

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="My Courses" breadcrumbItems={breadcrumbItems} />
      </Container>
    </div>
  );
};

export default InstructorCourses;
