import React, { useState } from "react";

//Import Breadcrumb
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Container } from "reactstrap";

const Submissions = () => {
  const [breadcrumbItems] = useState([
    { title: "Dashboard", link: "/auth/dashboard" },
    { title: "Quiz Attempts", link: "/auth/submissions" },
  ]);

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Quiz Attempts" breadcrumbItems={breadcrumbItems} />
      </Container>
    </div>
  );
}

export default Submissions