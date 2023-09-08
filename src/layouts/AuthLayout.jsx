import React, { useState } from "react";

// Layout Components
import Navbar from "@/layouts/Navbar";
import Sidebar from "@/layouts/Sidebar";
import Footer from "@/layouts/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const AuthLayout = ({ children }) => {
  console.log(children);
  const [theme, setTheme] = useState("light");
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenuCallback = () => {
    console.log("toggleMenuCallback");
  };

  return (
    <div id="layout-wrapper" style={{ backgroundColor: "#f1f5f7", height: "100vh"}}>
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
      <div className="main-content" style={{ backgroundColor: "#f1f5f7"}}>
        <Outlet />
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default AuthLayout;
