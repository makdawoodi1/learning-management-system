import React, { useContext, useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { Input, Popconfirm } from "antd";
import EditDropzone from "@/components/EditDropzone";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Editor from "@/components/Editor";
import { useLocation } from "react-router-dom";
import AuthContext from "@/context/context";

const EditCourseDetails = ({ Form, form, handleSubmit }) => {
  const [editorContent, setEditorContent] = useState('');
  const { courseState, setCourseState } = useContext(AuthContext)
  const { pathname } = useLocation();

  if (pathname.includes('edit-course/')) {
    form.setFieldsValue({
      'course-title': courseState.courseTitle,
      'course-description': courseState.courseDescription,
      'price': courseState.price,
    });
  }

  return (
    <>
      <Row className="place-items-center">
        <Col xs={12} lg={8}>
          <Row>
            <Col xs={12}>
              <Form.Item
                label="Course Title"
                name="course-title"
                rules={[
                  {
                    required: true,
                    message: "Please input the course title!",
                  },
                ]}
              >
                <Input
                  size="large"
                  className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 "
                  placeholder="Course Title"
                />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item
                label="Course Description"
                title="Description"
                name="course-description"
                rules={[
                  {
                    required: true,
                    message: "Please input the course description!",
                  },
                ]}
              >
                {/* <Editor 
                  value={editorContent}
                  onChange={(value) => setEditorContent(value)}
                /> */}
                <Input.TextArea
                  size="large"
                  rows={8}
                  className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 "
                  placeholder="Course Description"
                />
              </Form.Item>
              <hr />
              <h6 className="text-secondary font-weight-normal text-center">
                Upload Introductory Video
              </h6>
              <EditDropzone
                Form={Form}
                name="introductory-video"
                buttonText="Upload"
                acceptedFileTypes={['video/mp4']} 
                maxFileSize={1000 * 1024 * 1024}
                multiple={false}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={12} lg={4}>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input the course price!",
              },
            ]}
          >
            <Input
              type="number"
              addonAfter="$"
              onChange={(e) =>
                form.setFieldValue('price', e.target.value)
              }
              size="large"
              className="w-full rounded placeholder:text-sm placeholder:text-gray-500 border-gray-500 "
              placeholder="Course Price"
            />
          </Form.Item>
          <h6 className="text-secondary font-weight-normal mt-4 text-center">
            Course Settings
          </h6>
          {/* <Popconfirm
            title="Archive Course"
            description="Are you sure to archive this course?"
            okButtonProps={{
              danger: true,
            }}
            icon={<QuestionCircleOutlined className="text-danger" />}
            // onConfirm={() =>
            //   setCourseState()
            // }
          >
            <button className="w-full btn btn-warning mt-2 mb-3">
              Archive
            </button>
          </Popconfirm> */}
          <Form.Item>
            <Popconfirm
              title="Edit Course"
              description="Are you sure to publish this course?"
              okButtonProps={{
                danger: true,
              }}
              icon={<QuestionCircleOutlined className="text-danger" />}
              onConfirm={handleSubmit}
            >
              <button type="submit" className="w-full btn btn-primary mb-4">
                Edit Course
              </button>
            </Popconfirm>
          </Form.Item>
          <hr />
          <h6 className="text-secondary text-center font-weight-normal">
            Upload Course Thumbnail
          </h6>
          <EditDropzone
            Form={Form}
            name="course-thumbnail"
            buttonText="Upload"
            acceptedFileTypes={['image/jpeg', 'image/png']} 
            maxFileSize={100 * 1024 * 1024}
            multiple={false}
          />
        </Col>
        <Col xs={12}></Col>
      </Row>
    </>
  );
};

export default EditCourseDetails;
