import React, { useEffect, useState } from "react";

//Import Breadcrumb
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import Rating from "@/containers/sidebar/rating";
import Pagination from "@/containers/sidebar/pagination";
import DataTable from "react-data-table-component";
import axios from "@/services/axios";
import { API_URL } from "@/config/config";
import toast from "react-hot-toast";
import { Modal, Form, Input, Button, Select } from "antd";
import { RiSearchLine } from "react-icons/ri";
import moment from "moment";

// SunEditor
import EditorPreview from "@/components/EditorPreview";
import SunEditor from "suneditor-react";
import { PlusOutlined } from "@ant-design/icons";

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

const Announcements = () => {
  const [breadcrumbItems] = useState([
    { title: "Dashboard", link: "/auth/dashboard" },
    { title: "Announcements", link: "/auth/announcements" },
  ]);
  const [form] = Form.useForm();
  const [editorContent, setEditorContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState('add');
  const [courses, setCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState([]);
  const [activeAnnouncement, setActiveAnnouncement] = useState([]);
  const [activeRow, setActiveRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Columns
  const columns = [
    {
      name: "Course",
      selector: (row) => (
        <p>
          {row.course.title.length > 30
            ? `${row.course.title.substring(0, 30)}...`
            : row.course.title}
        </p>
      ),
    },
    {
      name: "Announcement",
      selector: (row) => (
        <p>
          {row.title.length > 30
            ? `${row.title.substring(0, 30)}...`
            : row.title}
        </p>
      ),
    },
    {
      name: "Status",
      selector: (row) => (
        <span className="inline-flex items-center m-2 px-3 py-1 bg-blue-200 hover:bg-blue-300 rounded-full text-sm font-semibold text-blue-600">
          <span className="ml-1">{row.active ? "Active" : "Archived"}</span>
        </span>
      ),
    },
    {
      name: "Date Created",
      selector: (row) => moment(row.created_at).format("MMM Do YY"),
    },
    {
      name: "Date Updated",
      selector: (row) => moment(row.updated_at).format("MMM Do YY"),
    },
  ];

  // Editor Instance
  const getEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  useEffect(() => {
    const fetchAnnouncements = async (req, res) => {
      try {
        axios
          .get(`${API_URL}/announcements/get-announcements`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          })
          .then((response) => {
            if (response.data?.success) {
              setAnnouncements(response.data?.announcements);
              setFilteredAnnouncements(response.data?.announcements);
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

    const fetchCourses = async (req, res) => {
      try {
        axios
          .get(`${API_URL}/courses/get-courses`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          })
          .then((response) => {
            if (response.data?.success) {
              setCourses(response.data?.courses);
            }
          })
          .catch((error) => {
            if (error.response?.data?.message) {
              return toast.error(error.response.data?.message);
            }
            console.error("Error Fetching courses!:", error.message);
          });
      } catch (error) {
        console.error(error);
        toast.error("Unexpected error occured!");
      }
    };

    fetchAnnouncements();
    fetchCourses();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter the courses based on the search query
    const filtered = announcements?.filter((announcement) =>
      announcement.title.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredAnnouncements(filtered);
  };

  // Submit Handler
  const handleAnnouncementSubmit = (values) => {
    try {
      const apiUrl = mode === 'edit'
        ? `${API_URL}/announcements/edit-announcement?annoucementID=${activeAnnouncement.id}&courseID=${activeAnnouncement.course.id}`
        : `${API_URL}/announcements/create-announcement`; 
      axios
        .post(
          apiUrl,
          JSON.stringify({
            data: {
              attributes: {
                announcementTitle: form.getFieldValue("announcement-title"),
                announcementContent: form.getFieldValue("announcement-content"),
                courseID: form.getFieldValue("course"),
                announcementStatus: form.getFieldValue("announcement-status")
              },
            },
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then(async (response) => {
          if (response.data?.success) {
            toast.success(`Announcement has been ${mode === 'edit' ? 'updated' : 'created'} successfully`);
            setAnnouncements(response.data?.announcements);
            setFilteredAnnouncements(response.data?.announcements);
            setModalOpen(false);
          } else {
            toast.error(response?.data.message);
          }
        })
        .catch((error) => {
          if (error.response?.data?.message) {
            return toast.error(error.response.data?.message);
          }
          console.error(`Error ${mode === 'edit' ? 'updating' : 'creating'} Announcement!:`, error.message);
          toast.error(error.message);
        });
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occured!");
    }
  };

  const clearState = () => {
    form.setFieldValue('announcement-title', '');
    form.setFieldValue('announcement-content', '');
    form.setFieldValue('course', []);
    form.setFieldValue('announcement-status', []);
    setEditorContent('');
    setActiveAnnouncement([]);
    setMode('add')
  }

  console.log(activeAnnouncement);

  return (
    <div className="page-content">
      <Container fluid>
        <Modal
          title="Create Announcement"
          centered
          open={modalOpen}
          onCancel={() => {
            setModalOpen(false);
            clearState();
          }}
          className="video-custom-style"
          footer={[
            <Button key="close" onClick={() => {
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
                <Col xs={12}>
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
                      {mode === "add" ? "Add Announcement" : "Edit Announcement"}
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Modal>
        <Breadcrumbs title="Announcements" breadcrumbItems={breadcrumbItems} />

        <Row>
          <Col xs={12}>
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between align-items-center">
                  {announcements?.length > 0 ? (
                    <Form className="app-search d-none d-lg-block p-0">
                      <div className="position-relative">
                        <Input
                          type="text"
                          className="form-control"
                          style={{ backgroundColor: "#f1f5f7" }}
                          placeholder="Search Announcements"
                          onChange={handleSearch}
                        />
                        <span>
                          <RiSearchLine />
                        </span>
                      </div>
                    </Form>
                  ) : (
                    <h6 className="text-secondary font-weight-normal mb-0">
                      There are no Announcements
                    </h6>
                  )}
                  <Link>
                    <button
                      type="button"
                      className="btn-primary-custom px-4"
                      onClick={() => setModalOpen(true)}
                    >
                      Create New Announcements
                    </button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {announcements?.length > 0 && (
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
                    data={filteredAnnouncements}
                    persistTableHead
                    // subHeader
                    // progressPending={Loading}
                    selectableRows
                    onRowClicked={(row) => {
                      setModalOpen(true);
                      setMode('edit');
                      setActiveAnnouncement(row);
                      form.setFieldValue('announcement-title', row.title);
                      form.setFieldValue('announcement-content', row.content);
                      setEditorContent(row.content);
                      form.setFieldValue('course', row.course.title);
                      form.setFieldValue('announcement-status', row.status === true ? "Active" : "Archived");
                    }}
                    onSelectedRowsChange={(e) =>
                      setSelectedAnnouncement(e.selectedRows)
                    }
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

export default Announcements;
