import React, { useState } from "react";

//Import Breadcrumb
import Breadcrumbs from "@/components/Common/Breadcrumbs";
import { Container } from "reactstrap";

const Profile = () => {
  const [breadcrumbItems] = useState([
    { title: "Home", link: "/" },
    { title: "Profile", link: "/auth/profile" },
  ]);

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Profile" breadcrumbItems={breadcrumbItems} />
      </Container>
    </div>
  );
};

export default Profile;
