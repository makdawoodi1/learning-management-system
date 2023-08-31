import React from "react";
import { Row, Col, Container } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid>
        <Row>
          <Col sm={6}>{new Date().getFullYear()} © Nazox.</Col>
          <Col sm={6}>
            <div className="text-sm-end d-none d-sm-block">Crafted with</div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
