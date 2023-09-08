import React from "react";
import { Routes, Route } from "react-router-dom";
import { USER_ROLE } from "@/config/config";

// Import scss
import "/assets/dashboard-assets/scss/theme.scss";
import "/assets/website-assets/scss/theme.scss";

// Laupit and Pages
import Layout from "@/layouts/layout";
import { pages } from "@/routes";
import Page404 from "@/pages/Others/Page404";
import Unauthorized from "@/pages/Others/Unauthorized";

// Services
// import RequireAuth from "@/services/RequireAuth";
// import PersistLogin from "@/services/PersistLogin";
import AuthLayout from "@/layouts/AuthLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {pages.PublicRoutes.map((page, index) => (
          <Route
            key={index}
            path={page.path}
            element={page.element}
            exact={page.exact}
          />
        ))}

        {/* <Route element={<RequireAuth allowedRoles={[USER_ROLE.STUDENT, USER_ROLE.ADMIN]} />}>
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route> */}

        <Route path="auth" element={<AuthLayout />}>
          {/* <Route element={<PersistLogin />}> */}
          {pages.ProtectedRoutes.map((page, index) => (
            // <Route
            //   key={index}
            //   element={<RequireAuth allowedRoles={page.allowedRoles} />}
            // >
            <Route
              key={index}
              path={page.path}
              element={page.element}
              exact={page.exact}
            />
            // </Route>
          ))}
          {/* </Route> */}
        </Route>
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default App;
