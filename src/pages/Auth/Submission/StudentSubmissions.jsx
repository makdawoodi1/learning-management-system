import React, { useState } from "react";

//Import Breadcrumb
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Container } from "reactstrap";

const StudentSubmissions = () => {
  const [breadcrumbItems] = useState([
    { title: "Home", link: "/" },
    { title: "My Students", link: "/auth/student-submissions" },
  ]);

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="My Students" breadcrumbItems={breadcrumbItems} />
      </Container>
    </div>
  );
}

export default StudentSubmissions