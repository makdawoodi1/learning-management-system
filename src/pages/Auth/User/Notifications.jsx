import React, { useState } from "react";

//Import Breadcrumb
import Breadcrumbs from "@/components/Common/Breadcrumbs";
import { Container } from "reactstrap";

const Notifications = () => {
  const [breadcrumbItems] = useState([
    { title: "Home", link: "/" },
    { title: "Announcements", link: "/auth/announcements" },
  ]);

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Announcements" breadcrumbItems={breadcrumbItems} />
      </Container>
    </div>
  );
};

export default Notifications;
