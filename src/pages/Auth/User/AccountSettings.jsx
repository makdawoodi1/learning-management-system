import React, { useState } from "react";

// Import Components
import {
  ProfileSettings,
  PasswordManagement,
  NotificationPreferences
} from '@/pages/Auth/User/components';

//Import Breadcrumb
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Container, Row, Col, Card } from "reactstrap";

const AccountSettings = () => {
  const [breadcrumbItems] = useState([
    { title: "Dashboard", link: "/auth/dashboard" },
    { title: "Account Settings", link: "/auth/settings" },
  ]);

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Account Settings" breadcrumbItems={breadcrumbItems} />

        <Row>
          <Col lg={4} xl={3}>
            <Card>
              Left
            </Card>
          </Col>
          <Col kg={8} xl={9}>
            <Card>
              Right
            </Card>
            {/* <ProfileSettings />
            <PasswordManagement />
            <NotificationPreferences /> */}
          </Col>
        </Row>

      </Container>
    </div>
  );
};

export default AccountSettings;
