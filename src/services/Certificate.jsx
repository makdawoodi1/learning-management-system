import React, { useState } from "react";
import { Button, Modal } from "antd";

// Styles
import "./Certificate.module.css";

const Certificate = () => {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <div className="certificate-container">
      <div className="certificate">
        <div className="water-mark-overlay"></div>
        <div className="certificate-header">
          <img src="" className="/logo.png" alt="" />
        </div>
        <div className="certificate-body">
          <p className="certificate-title">
            <strong>
              RENR NCLEX AND CONTINUING EDUCATION (CME) Review Masters
            </strong>
          </p>
          <h1>Certificate of Completion</h1>
          <p className="student-name">Matthew Taylor</p>
          <div className="certificate-content">
            <div className="about-certificate">
              <p>
                has completed [hours] hours on topic title here online on Date
                [Date of Completion]
              </p>
            </div>
            <p className="topic-title">
              The Topic consists of [hours] Continuity hours and includes the
              following:
            </p>
            <div className="text-center">
              <p className="topic-description text-muted">
                Contract adminitrator - Types of claim - Claim Strategy - Delay
                analysis - Thepreliminaries to a claim - The essential elements
                to a successful claim - Responses - Claim preparation and
                presentation{" "}
              </p>
            </div>
          </div>
          <div className="certificate-footer text-muted">
            <div className="row">
              <div className="col-md-6">
                <p>Principal: ______________________</p>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                    <p>Accredited by</p>
                  </div>
                  <div className="col-md-6">
                    <p>Endorsed by</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
