import React from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";

// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes/";

// layouts
// import VerticalLayout from "./components/VerticalLayout/";
// import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "@/layouts/NonAuth";

// Import scss

const App = ({ layout }) => {
  // const getLayout = () => {
  //   let layoutType = VerticalLayout;

  //   switch (layout.layoutType) {
  //     case "horizontal":
  //       layoutType = HorizontalLayout;
  //       break;
  //     default:
  //       layoutType = VerticalLayout;
  //       break;
  //   }
  //   return layoutType;
  // };

  // const Layout = getLayout();

  return (
    <>
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <NonAuthLayout location={route.path} children={route.component} >
                  <route.component />
                </NonAuthLayout>
              }
            />
          ))}
        </Routes>
      </Router>
    </>
  );
};

export default App;
