import React, { useState } from "react";

//Import Breadcrumb
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Container } from "reactstrap";

const Earnings = () => {
  const [breadcrumbItems] = useState([
    { title: "Dashboard", link: "/auth/dashboard" },
    { title: "Withdrawals", link: "/auth/earnings" },
  ]);

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Withdrawals" breadcrumbItems={breadcrumbItems} />
      </Container>
    </div>
  );
}

export default Earnings