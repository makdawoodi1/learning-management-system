import React, { useState } from "react";

//Import Breadcrumb
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Container } from "reactstrap";

const Earnings = () => {
  const [breadcrumbItems] = useState([
    { title: "Home", link: "/" },
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