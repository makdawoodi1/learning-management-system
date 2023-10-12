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
  const certificateRef = useRef(null);
  const { pathname } = useLocation();
  const courseID = pathname.split("/")[3];

  const confirm = () => 
  {
    // const url = "https://d3pxhn5vumr323.cloudfront.net/7b2197c1-5547-42ba-832d-1dbb54de3cef/certificate.pdf"
    const url = "https://pre-signed-url-demo-v1.s3.amazonaws.com/7b2197c1-5547-42ba-832d-1dbb54de3cef/certificate.pdf"
    // const url = "https://d3pxhn5vumr323.cloudfront.net/7b2197c1-5547-42ba-832d-1dbb54de3cef/introductory-video-video.mp4"
    window.open(url, '_blank');
  }
  
    // new Promise((resolve) => {
    //   // setTimeout(() => resolve(null), 3000);
    //   try {
    //     axios
    //       .post(
    //         `${API_URL}/courses/generate-certificate?username=${auth?.username}&courseID=${courseID}`,
    //         {
    //           headers: { "Content-Type": "application/json" },
    //           withCredentials: true,
    //           responseType: "blob",
    //         }
    //       )
    //       .then((response) => {
    //         resolve(null)
    //         console.log(response.data.uploadUrl)
    //         window.open(response.data.uploadUrl, '_blank');
    //       })
    //       .catch((error) => {
    //         if (error.response?.data?.message) {
    //           return toast.error(error.response.data?.message);
    //         }
    //         console.error(
    //           "Error generating course certificate!:",
    //           error.message
    //         );
    //         toast.error(error.message);
    //       }).finally(() => {
    //         resolve(null)
    //       });
    //   } catch (error) {
    //     console.error(error);
    //     toast.error("Unexpected error occured!");
    //   }
    // });

  const generatePDF = () => {
    if (!certificateReady) return;

    const certificate = document.querySelector(".certificate");

    const pdfOptions = {
      margin: 10,
      filename: "certificate.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2canvas(certificateRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 1920;
      const imgHeight = 1080;
      const pdf = new jsPDF("landscape");
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight); // Adjust the dimensions as needed
      pdf.save("certificate.pdf");
    });

    // html2pdf()
    //   .from(certificate)
    //   .set(pdfOptions)
    //   .outputPdf()
    //   .then((pdf) => {
    //     // Download the PDF
    //     // pdf.save();
    //     const pdfBlob = new Blob([pdf], { type: 'application/pdf' });
    //     const pdfDataUrl = URL.createObjectURL(pdfBlob);
    //     const newTab = window.open();
    //     newTab.document.write('<iframe width="100%" height="100%" src="' + pdfDataUrl + '"></iframe>');
    //   });
  };

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
            const fetchedData = response.data?.progress;

            if (fetchedData) {
              const percentage = Math.floor(
                ((fetchedData?.completed_lessons +
                  fetchedData?.completed_quizzes) /
                  (fetchedData?.total_lessons + fetchedData?.total_quizzes)) *
                  100
              );
              if (percentage === 100) {
                setShowIcon(true);
                setCertificateReady(true);
              }
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

  return (
    <>
      <div style={{ width: 50, height: 50 }}>
        {showIcon ? (
          <CircularProgressbarWithChildren value={percentage}>
            <Popconfirm
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
              onConfirm={confirm}
            >
              <AiOutlineSafetyCertificate size={24} color="#458cf0" />
            </Popconfirm>
          </CircularProgressbarWithChildren>
        ) : (
          <CircularProgressbar value={percentage} text={`${percentage}%`} />
        )}
      </div>
    </>
  );
};

export default CircularProgressBarComponent;
