import React, { useState } from "react";

//Import Breadcrumb
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Container } from "reactstrap";

const AccountSettings = () => {
  const [breadcrumbItems] = useState([
    { title: "Home", link: "/" },
    { title: "Settings", link: "/auth/settings" },
  ]);

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Settings" breadcrumbItems={breadcrumbItems} />
      </Container>
    </div>
  );
};

export default AccountSettings;
