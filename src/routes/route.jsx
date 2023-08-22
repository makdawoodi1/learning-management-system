import React from "react";
import { Route, useNavigate } from "react-router-dom";

const AppRoute = ({
  key,
  element,
  layout,
  isAuthProtected,
  path
}) => {
  console.log('here')
  
  return <Route key={key} path={path} element={<element />} />
};

export default AppRoute;
