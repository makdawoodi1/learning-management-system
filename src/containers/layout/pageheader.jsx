import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import EditorPreview from "@/components/EditorPreview";

const PageHeader = ({ course }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="pageheader-section style-2">
      <Modal
        title="Introductory Video"
        centered
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        className='video-custom-style'
        footer={[
          <Button key="back" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        ]}
      >
        <video controls>
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
                <img src={course.authorImage ? course.authorImage : "/author.jpg"} alt="rajibraj91" />
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
