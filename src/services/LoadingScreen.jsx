import React from "react";

function LoadingScreen() {
  return (
    <div className="screen">
      <div className="loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <div className="loader-text">Loading...</div>
    </div>
  );
}

export default LoadingScreen;
