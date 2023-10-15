import React, { useState, useEffect, useContext, useRef } from "react";
import AuthContext from "@/context/context";
import { Popconfirm } from "antd";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import axios from "@/services/axios";
import { API_URL } from "@/config/config";
import toast from "react-hot-toast";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { XMLParser, XMLBuilder } from 'fast-xml-parser'
import { AiOutlineSafetyCertificate } from "react-icons/ai";

// Styles
import "react-circular-progressbar/dist/styles.css";
import "./Certificate.module.css";
import { useLocation } from "react-router-dom";

const CircularProgressBarComponent = () => {
  const { courseState, auth } = useContext(AuthContext);
  const [showIcon, setShowIcon] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [certificateReady, setCertificateReady] = useState(false);
  const [certificateURL, setCertificateURL] = useState("");
  const certificateRef = useRef(null);
  const { pathname } = useLocation();
  const courseID = pathname.split("/")[3];

  const confirm = () => 
  // {
  //   // const url = "https://d3pxhn5vumr323.cloudfront.net/7b2197c1-5547-42ba-832d-1dbb54de3cef/certificate.pdf"
  //   const url = "https://pre-signed-url-demo-v1.s3.amazonaws.com/7b2197c1-5547-42ba-832d-1dbb54de3cef/certificate.pdf"
  //   // const url = "https://d3pxhn5vumr323.cloudfront.net/7b2197c1-5547-42ba-832d-1dbb54de3cef/introductory-video-video.mp4"
  //   window.open(url, '_blank');
  // }
  
    new Promise((resolve) => {
      // setTimeout(() => resolve(null), 3000);
      try {
        axios
          .post(
            `${API_URL}/courses/generate-certificate?username=${auth?.username}&courseID=${courseID}`,
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
              responseType: "blob",
            }
          )
          .then(async (response) => {
            // console.log(response.data.uploadUrl)
            // window.open(response.data.uploadUrl, '_blank');
            if (response.data?.success) {
              resolve(null)
              // axios.get(
              //   `${API_URL}/courses/get-certificate?courseID=${courseID}`,
              //   {
              //     headers: { "Content-Type": "application/json" },
              //     withCredentials: true,
              //     responseType: "blob",
              //   }
              // )
              // .then(async (response) => {
              //   if (response.data?.success) {
              //     resolve(null)
              //     // console.log(response.data.uploadUrl)
              //     // window.open(response.data.uploadUrl, '_blank');
              //   }          
              // })
              // .catch((error) => {
              //   if (error.response?.data?.message) {
              //     return toast.error(error.response.data?.message);
              //   }
              //   console.error(
              //     "Error getting course certificate!:",
              //     error.message
              //   );
              //   toast.error(error.message);    
              // })
              // .finally(() => {
              //   resolve(null)
              // });
            }
          })
          .catch((error) => {
            if (error.response?.data?.message) {
              return toast.error(error.response.data?.message);
            }
            console.error(
              "Error generating course certificate!:",
              error.message
            );
            toast.error(error.message);
          })
      } catch (error) {
        console.error(error);
        toast.error("Unexpected error occured!");
      }
    });

  const generateCertificate = () => {
    return new Promise((resolve) => {
      try {
        axios
          .post(
            `${API_URL}/courses/generate-certificate?username=${auth?.username}&courseID=${courseID}`,
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
              responseType: "blob",
            }
          )
          .then(async (response) => {
            // console.log(response.data.uploadUrl)
            // window.open(response.data.uploadUrl, '_blank');
            if (response.data?.success) {
              setCertificateReady(true)
              resolve(null)
              // axios.get(
              //   `${API_URL}/courses/get-certificate?courseID=${courseID}`,
              //   {
              //     headers: { "Content-Type": "application/json" },
              //     withCredentials: true,
              //     responseType: "blob",
              //   }
              // )
              // .then(async (response) => {
              //   if (response.data?.success) {
              //     resolve(null)
              //     // console.log(response.data.uploadUrl)
              //     // window.open(response.data.uploadUrl, '_blank');
              //   }          
              // })
              // .catch((error) => {
              //   if (error.response?.data?.message) {
              //     return toast.error(error.response.data?.message);
              //   }
              //   console.error(
              //     "Error getting course certificate!:",
              //     error.message
              //   );
              //   toast.error(error.message);    
              // })
              // .finally(() => {
              //   resolve(null)
              // });
            }
          })
          .catch((error) => {
            if (error.response?.data?.message) {
              return toast.error(error.response.data?.message);
            }
            console.error(
              "Error generating course certificate!:",
              error.message
            );
            toast.error(error.message);
          })
          .finally(() => { resolve(null) })
      } catch (error) {
        console.error(error);
        toast.error("Unexpected error occured!");
      }
    })
  }

  const getCertificate = () => {
    return new Promise((resolve) => {
      if (certificateURL) {
        window.open(certificateURL, '_blank');
        return resolve(null)
      }
      try {
        axios.get(
          `${API_URL}/courses/get-certificate?username=${auth?.username}&courseID=${courseID}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then(async (response) => {
          if (response.data?.success) {
            resolve(null)
            console.log(response.data.uploadUrl)
            window.open(response.data.uploadUrl, '_blank');
          }          
        })
        .catch((error) => {
          if (error.response?.data?.message) {
            return toast.error(error.response.data?.message);
          }
          console.error(
            "Error getting course certificate!:",
            error.message
          );
          toast.error(error.message);    
        })
        .finally(() => { resolve(null) })
      } catch (error) {
        console.error(error);
        toast.error("Unexpected error occured!");
      }
    })
  }

  const fetchContent = async (req, res) => {
    try {
      axios
        .get(
          `${API_URL}/courses/get-enrolled-course-progress?username=${auth.username}&courseID=${courseID}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.data?.success) {
            const fetchedData = response.data;

            if (fetchedData?.progress) {
              const percentage = Math.floor(
                ((fetchedData.progress?.completed_lessons +
                  fetchedData.progress?.completed_quizzes) /
                  (fetchedData.progress?.total_lessons + fetchedData.progress?.total_quizzes)) *
                  100
              );
              if (percentage === 100) setShowIcon(true)
              setCertificateURL(fetchedData.certificate)
              setPercentage(percentage);
            }
          }
        })
        .catch((error) => {
          if (error.response?.data?.message) {
            return toast.error(error.response.data?.message);
          }
          console.error("Error Fetching progress!:", error.message);
        });
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occured!");
    }
  };

  useEffect(() => {
    fetchContent();
  }, [courseState.progress]);

  console.log(certificateURL)

  return (
    <>
      <div style={{ width: 50, height: 50 }}>
        {showIcon ? (
          <CircularProgressbarWithChildren value={percentage}>
            {certificateReady || certificateURL ? <Popconfirm
              description="Get Course Certificate"
              icon={
                <AiOutlineSafetyCertificate
                  style={{
                    color: "#458cf0",
                  }}
                  size={24}
                />
              }
              className="cursor-pointer"
              okButtonProps={{
                danger: true,
              }}
              okText="Get Certificate"
              showCancel={false}
              onConfirm={getCertificate}
            >
              <AiOutlineSafetyCertificate size={24} color="#458cf0" />
            </Popconfirm> : <Popconfirm
              description="Generate Course Certificate"
              icon={
                <AiOutlineSafetyCertificate
                  style={{
                    color: "#458cf0",
                  }}
                  size={24}
                />
              }
              className="cursor-pointer"
              okButtonProps={{
                danger: true,
              }}
              okText="Generate Certificate"
              showCancel={false}
              onConfirm={generateCertificate}
            >
              <AiOutlineSafetyCertificate size={24} color="#458cf0" />
            </Popconfirm>}
          </CircularProgressbarWithChildren>
        ) : (
          <CircularProgressbar value={percentage} text={`${percentage}%`} />
        )}
      </div>
    </>
  );
};

export default CircularProgressBarComponent;
