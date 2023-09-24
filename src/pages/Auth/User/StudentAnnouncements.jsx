import React, { useEffect, useState } from "react";

//Import Breadcrumb
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "@/services/axios";
import { API_URL } from "@/config/config";
import toast from "react-hot-toast";

// SunEditor
import EditorPreview from "@/components/EditorPreview";

const StudentAnnouncements = () => {
  const [breadcrumbItems] = useState([
    { title: "Dashboard", link: "/auth/dashboard" },
    { title: "Student Announcements", link: "/auth/student-announcements" },
  ]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async (req, res) => {
      try {
        axios
          .get(`${API_URL}/announcements/get-announcement`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          })
          .then((response) => {
            if (response.data?.success) {
              setAnnouncements(response.data?.announcements);
            }
          })
          .catch((error) => {
            if (error.response?.data?.message) {
              return toast.error(error.response.data?.message);
            }
            console.error("Error Fetching announcements!:", error.message);
          });
      } catch (error) {
        console.error(error);
        toast.error("Unexpected error occured!");
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Announcements" breadcrumbItems={breadcrumbItems} />

        <Row>
          <Col xs={12}>
            <Card>
              <h6 className="text-secondary font-weight-bold d-flex align-items-center pl-8 mt-4">
                Announcements
              </h6>
              <hr />
              {announcements?.map((announcement) => (
                <>
                  <h6 className="text-secondary font-weight-bold d-flex align-items-center pl-8 mt-4">{announcement.title}</h6>
                  <CardBody key={announcement.id}>
                    <Card>
                      <EditorPreview value={announcement.content} height="200px" />
                    </Card>
                  </CardBody>
                </>
              ))}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StudentAnnouncements;
