import React, { useState } from "react";

//Import Breadcrumb
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Container } from "reactstrap";

const InstructorAssignments = () => {
  const [breadcrumbItems] = useState([
    { title: "Home", link: "/" },
    { title: "Assignments", link: "/auth/assignments" },
  ]);

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Assignments" breadcrumbItems={breadcrumbItems} />
      </Container>
    </div>
  );
}

export default InstructorAssignments