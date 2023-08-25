import React, { Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { routes } from "@/routes/route";
// import Auth_Actions from "@redux/auth/actions";
import LoadingScreen from "@components/LoadingScreen";

export default function MyRoutes() {
  // const Auth = useSelector((state) => state.Auth);

  const PrivateRoute = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const isLoggedIn = false;
    // const time = useSelector((state) => state.Auth?.auth?.expiry);
    const isExpire = false;
    // const verified = false;
    if (isExpire) {
      // dispatch(Auth_Actions.signOut());
    } else {
      if (isLoggedIn) {
        if (Auth.auth.is_account_setup_completed) {
          if (Auth.auth.is_verified) {
            if (Auth.auth.is_agree) {
              return (
                <Routes>
                  {routes.Private.map((route, idx) => (
                    <Route
                      exact={route.exact}
                      key={idx}
                      path={`${route.path}`}
                      element={<route.component />}
                    />
                  ))}
                </Routes>
              );
            } else {
              if (
                !routes.Restricted.filter((item) => item.path === pathname)
                  .length > 0
              ) {
                return <Navigate to="/terms-and-conditions" replace={true} />;
              }
            }
          } else {
            if (
              !routes.Restricted.filter(
                (item) =>
                  item.path === pathname ||
                  item.path.split("/:")[0] === "/" + pathname.split("/")[1]
              ).length > 0
            ) {
              return <Navigate to="/email-verification" replace={true} />;
            }
          }
        } else {
          if (
            !routes.Restricted.filter((item) => item.path === pathname)
              .length > 0
          ) {
            return <Navigate to="/account-setup" replace={true} />;
          }
        }
      } else {
        // console.log(routes.Public.filter(item=>item.path.split('/:')))
        if (
          !routes.Public.filter(
            (item) =>
              item.path === pathname ||
              item.path.split("/:")[0] === "/" + pathname.split("/")[1]
          ).length > 0
        ) {
          return <Navigate to="/login" replace={true} />;
        }
      }
    }
  };
  
  const RestrictedRoute = () => {
    const isLoggedIn = Auth?.auth?.token;
    if (isLoggedIn) {
      return (
        <Routes>
          {routes.Restricted.map((route, idx) => (
            <Route
              exact={route.exact}
              key={idx}
              path={`${route.path}`}
              element={<route.component />}
            />
          ))}
        </Routes>
      );
    }
  };
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Router>
        <PopupHandler>
          <div className="page">
            <Routes>
              {routes.Public.map((route, idx) => (
                <Route
                  exact={route.exact}
                  key={idx}
                  path={`${route.path}`}
                  element={<route.component />}
                />
              ))}
            </Routes>
            <PrivateRoute />
            <RestrictedRoute />
          </div>
        </PopupHandler>
      </Router>
    </Suspense>
  );
}
