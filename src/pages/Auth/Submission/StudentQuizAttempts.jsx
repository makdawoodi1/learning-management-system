import React, { useContext, useEffect, useState } from "react";

//Import Breadcrumb
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "@/services/axios";
import { API_URL } from "@/config/config";
import toast from "react-hot-toast";
import AuthContext from "@/context/context";
import { Modal, Form, Input, Button, Select } from "antd";
import { RiSearchLine } from "react-icons/ri";
import moment from "moment";

const customStyles = {
  rows: {
    style: {
      minHeight: "72px", // override the row height
    },
  },
  subHeader: {
    style: {
      padding: 0,
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      background: "#404fbd",
      color: "#fff",
      fontWeight: 700,
      fontSize: "14px",
      justifyContent: "center",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
      justifyContent: "center",
    },
  },
};

// Custom hover styles for the current row
const customRowStyles = {
  activeRow: {
    backgroundColor: "#f5f5f5",
    cursor: "pointer",
  },
};

const StudentQuizAttempts = () => {
  const [breadcrumbItems] = useState([
    { title: "Dashboard", link: "/auth/dashboard" },
    { title: "My Student Quiz Attempts", link: "/auth/student-quiz-attempts" },
  ]);
  const { auth } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [quizAttempts, setQuizAttempts] = useState([]);
  const [filteredQuizAttempts, setFilteredQuizAttempts] = useState([]);
  const [selectedQuizAttempts, setSelectedQuizAttempts] = useState([]);
  const [activeQuizAttempts, setActiveQuizAttempts] = useState([]);
  const [activeRow, setActiveRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Columns
  const columns = [
    {
      name: "Student",
      selector: (row) => (
        <p>
          {row.studentUsername.length > 30
            ? `${row.studentUsername.substring(0, 30)}...`
            : row.studentUsername}
        </p>
      )
    },
    {
      name: "Course",
      selector: (row) => (
        <p>
          {row.courseTitle.length > 30
            ? `${row.courseTitle.substring(0, 30)}...`
            : row.courseTitle}
        </p>
      ),
    },
    {
      name: "Quiz",
      selector: (row) => (
        <p>
          {row.quizTitle.length > 30
            ? `${row.quizTitle.substring(0, 30)}...`
            : row.quizTitle}
        </p>
      ),
    },
    {
      name: "Status",
      selector: (row) => (
        <span className="inline-flex items-center m-2 px-3 py-1 bg-blue-200 hover:bg-blue-300 rounded-full text-sm font-semibold text-blue-600">
          <span className="ml-1">{row.completed ? `Passed with ${(row.totalScore / row.passingScore) * 100} %` : "Failed"}</span>
        </span>
      ),
    },
    {
      name: "Attempted Date",
      selector: (row) => moment(row.created_at).format("MMM Do YY"),
    }
  ];

  useEffect(() => {
    const fetchQuizAttemptsForStudent = async (req, res) => {
      try {
        axios
          .get(`${API_URL}/quizzes/get-user-quiz-attempts?username=${auth.username}`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          })
          .then((response) => {
            if (response.data?.success) {
              const fetchedData = response.data?.quizAttempts;
              const filteredData = fetchedData?.map((item) => {
                const totalScore = JSON.parse(item.progress)?.reduce(
                  (totalScore, question) => totalScore + Number(question.isCorrectAnswer),
                  0
                )
                const passingScore = item.quiz?.quiz_questions.length

                return {
                  studentUsername: item.user?.username,
                  courseTitle: item.enrollment?.course.title,
                  quizTitle: item.quiz?.title,
                  totalScore,
                  passingScore,
                  completed: totalScore >= passingScore,
                  created_at: item.created_at
              }})
              setQuizAttempts(filteredData);
              setFilteredQuizAttempts(filteredData);
            }
          })
          .catch((error) => {
            if (error.response?.data?.message) {
              return toast.error(error.response.data?.message);
            }
            console.error("Error Fetching Quiz Attempts!:", error.message);
          });
      } catch (error) {
        console.error(error);
        toast.error("Unexpected error occured!");
      }
    };

    fetchQuizAttemptsForStudent();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter the courses based on the search query
    const filtered = quizAttempts?.filter((quizAttempt) =>
      quizAttempt.title.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredQuizAttempts(filtered);
  };

  return (
    <div className="page-content">
      <Container fluid>
        {/* <Modal
          title="Create Announcement"
          centered
          open={modalOpen}
          onCancel={() => {
            setModalOpen(false);
            clearState();
          }}
          className="video-custom-style"
          footer={[
            <Button
              key="close"
              onClick={() => {
                setModalOpen(false);
                clearState();
              }}
            >
              Close
            </Button>,
          ]}
        >
          <Col xs={12} className="d-flex flex-column justify-content-center">
            <Form
              form={form}
              onFinish={handleAnnouncementSubmit}
              name="announcement-form"
              layout="vertical"
              className="py-2 mt-2"
            >
              <Row>
                <Col xs={12}>
                  <Form.Item
                    label="Announcement Title"
                    name="announcement-title"
                    rules={[
                      {
                        required: true,
                        message: "Please input the announcement title!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 "
                      placeholder="Announcement Title"
                    />
                  </Form.Item>
                </Col>
                <Col xs={12} lg={6}>
                  <Form.Item
                    label="Select Status"
                    name="announcement-status"
                    rules={[
                      {
                        required: true,
                        message: "Please select the announcement status!",
                      },
                    ]}
                  >
                    <Select
                      className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 "
                      size="large"
                      showSearch
                      bordered
                      placeholder="Select Status"
                      options={[
                        { value: "Active", label: "Active" },
                        { value: "Archived", label: "Archived" },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col xs={12} lg={6}>
                  <Form.Item
                    label="Select Course"
                    name="course"
                    rules={[
                      {
                        required: true,
                        message: "Please select the course!",
                      },
                    ]}
                  >
                    <Select
                      className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 "
                      size="large"
                      showSearch
                      bordered
                      placeholder="Select Course"
                      options={courses?.map((course, index) => {
                        return {
                          key: index,
                          value: course.id,
                          label: course.title,
                        };
                      })}
                    />
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item
                    title="Lesson Content"
                    name="announcement-content"
                    rules={[
                      {
                        required: true,
                        message: "Please input the announcement description!",
                      },
                    ]}
                  >
                    <SunEditor
                      setOptions={{
                        buttonList: [
                          ["font", "fontSize"],
                          ["undo", "redo"],
                          [
                            "bold",
                            "underline",
                            "italic",
                            "strike",
                            "subscript",
                            "superscript",
                            "removeFormat",
                            "fontColor",
                            "hiliteColor",
                            "link",
                          ],
                          [
                            "indent",
                            "outdent",
                            "align",
                            "list",
                            "horizontalRule",
                          ],
                          ["preview", "fullScreen"],
                        ],
                        dialogBox: {
                          linkBox: {
                            title: "Insert Link",
                            url: "URL to link",
                            text: "Text to display",
                            newWindowCheck: "Open in new window",
                            downloadLinkCheck: "Download link",
                          },
                        },
                        menu: {
                          spaced: "Spaced",
                          bordered: "Bordered",
                          neon: "Neon",
                          translucent: "Translucent",
                          shadow: "Shadow",
                          code: "Code",
                        },
                      }}
                      getEditorInstance={getEditorInstance}
                      width="100%"
                      height="200px"
                      name="editor-content"
                      placeholder="Enter Announcement Content here..."
                      onChange={(value) => {
                        setEditorContent(value);
                      }}
                      setContents={editorContent}
                    />
                  </Form.Item>
                </Col>
                <Col xs={12} lg={mode === "add" ? 12 : 8}>
                  <Form.Item>
                    <Button
                      type="dashed"
                      className="d-flex align-items-center justify-content-center mx-auto"
                      htmlType="submit"
                      style={{
                        width: "100%",
                      }}
                      icon={<PlusOutlined />}
                    >
                      {mode === "add"
                        ? "Add Announcement"
                        : "Edit Announcement"}
                    </Button>
                  </Form.Item>
                </Col>
                {mode === "edit" && (
                  <Col xs={12} lg={4}>
                    <Form.Item>
                      <Button
                        type="dashed"
                        className="d-flex align-items-center justify-content-center mx-auto btn-danger-custom"
                        onClick={deleteAnnouncement}
                        style={{
                          width: "100%",
                        }}
                      >
                        Delete
                      </Button>
                    </Form.Item>
                  </Col>
                )}
              </Row>
            </Form>
          </Col>
        </Modal> */}
        <Breadcrumbs title="My Student Quiz Attempts" breadcrumbItems={breadcrumbItems} />

        {quizAttempts?.length > 0 && (
          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <DataTable
                    customStyles={customStyles}
                    conditionalRowStyles={[
                      {
                        when: (row) => row.id === activeRow?.id,
                        style: customRowStyles.activeRow,
                      },
                    ]}
                    pagination
                    columns={columns}
                    data={filteredQuizAttempts}
                    persistTableHead
                    // subHeader
                    // progressPending={Loading}
                    selectableRows
                    onRowMouseEnter={(row) => setActiveRow(row)}
                    onRowMouseLeave={() => setActiveRow(null)}
                    subHeaderComponent={
                      <div className="w-full flex justify-between">
                        <div>
                          {/* <FilterButton
                    onClick={() => FilterHandler("all")}
                    text={"All"}
                  />
                  <FilterButton
                    onClick={() => FilterHandler("pending")}
                    text={"Pending"}
                  />
                  <FilterButton
                    onClick={() => FilterHandler("processing")}
                    text={"Proccessing"}
                  />
                  <FilterButton
                    onClick={() => FilterHandler("in_transit")}
                    text={"Transit"}
                  />
                  <FilterButton
                    onClick={() => FilterHandler("completed")}
                    text={"Complete"}
                  />
                  <FilterButton
                    onClick={() => FilterHandler("cancelled")}
                    text={"Cancelled By User"}
                  /> */}
                        </div>
                        <div>
                          {/* <select id="filter_search" onChange={(e) => setFilterValue(e.target.value)} className="bg-gray-50 w-[200px] mr-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 " >
                    <option value='address1'>Address</option>
                    <option value='package_type'>Package Type</option>
                    <option value='Postage Type'>Postage</option>
                  </select> */}
                        </div>
                      </div>
                    }
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default StudentQuizAttempts;
