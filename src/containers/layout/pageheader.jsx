import React, { useState, useRef } from 'react';
import { Button, Modal } from 'antd';
import EditorPreview from "@/components/EditorPreview";
import useAuth from "@/hooks/useAuth";

const PageHeader = ({ course }) => {
  const { auth } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const videoRef = useRef(null);

  return (
    <div className="pageheader-section style-2">
      <Modal
        title={course.title}
        centered
        open={modalOpen}
        onCancel={() => { videoRef.current.pause(); setModalOpen(false) }}
        className='video-custom-style'
        footer={[
          <Button key="back" onClick={() => { videoRef.current.pause(); setModalOpen(false) }}>
            Close
          </Button>
        ]}
      >
        <video controls ref={videoRef}>
          <source src={course.introductoryVideo?.objectKey} />
        </video>
      </Modal>
      <div className="container">
        <div className="row justify-content-center justify-content-lg-between align-items-center flex-row-reverse">
          <div className="col-lg-7 col-12">
            <div className="pageheader-thumb">
              <img
                src={course.thumbnail?.objectKey}
                alt="rajibraj91"
                className="w-100"
              />
              <a
                onClick={() => setModalOpen(true)}
                className="video-button popup cursor-pointer"
                target="_blank"
              >
                <i className="icofont-ui-play"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-5 col-12">
            <div className="pageheader-content">
              <h2 className="phs-title">{course.title}</h2>
              {/* <div className="phs-desc" style={{ maxHeight: "50px", overflow: 'hidden' }}>
                <EditorPreview value={course.description} />
              </div> */}
              <div className="phs-thumb">
                <img src={course?.profileImage ? course.profileImage.objectKey : "/author.jpg"} alt="rajibraj91" />
                <span>Dr. Adrianne Platt</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
