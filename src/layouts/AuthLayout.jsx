import React, { useContext, useState, useCallback } from "react";
// Layout Components
import Navbar from "@/layouts/Navbar";
import Sidebar from "@/layouts/Sidebar";
import Footer from "@/layouts/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthContext from "@/context/context";
import { FullScreen } from "react-full-screen";
import Certificate from "@/services/Certificate";

const AuthLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [theme, setTheme] = useState("light");
  const [isMobile, setIsMobile] = useState(false);
  const { toggleSidebar, fullScreenHandle, courseState } = useContext(AuthContext);

  const toggleMenuCallback = () => {
    console.log("toggleMenuCallback");
  };

  return (
    <FullScreen handle={fullScreenHandle}>
      <div
        id="layout-wrapper"
        style={{ backgroundColor: "#f1f5f7", height: "100vh" }}
      >
        {/* {pathname.includes('enrolled-course/') && 
          <Certificate />
        } */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName="toaster-container"
          containerStyle={{}}
          toastOptions={{
            className: "text-sm",
            duration: 5000,
            style: {
              background: "#fff",
              color: "#363636",
            },
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
        <Navbar toggleMenuCallback={toggleMenuCallback} />
        <Sidebar theme={theme} isMobile={isMobile} />
        {pathname.includes('enrolled-course/') ? (
          <div
            className={`main-content-enrolled ${
              toggleSidebar ? "main-content-enrolled-collapsed" : ""
            }`}
            style={{ backgroundColor: "#f1f5f7" }}
          >
            <Outlet />
            {/* <Footer /> */}
          </div>
        ) : (
          <div
            className={`main-content ${
              toggleSidebar ? "main-content-collapsed" : ""
            }`}
            style={{ backgroundColor: "#f1f5f7" }}
          >
            <Outlet />
            {/* <Footer /> */}
          </div>
        )}
      </div>
    </FullScreen>
  );
};

export default AuthLayout;
