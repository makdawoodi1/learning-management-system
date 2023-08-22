import React from "react";
import { redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Auth/Login";
import Logout from "../pages/Auth/Logout";
import Register from "../pages/Auth/Register";
import ForgetPassword from "../pages/Auth/ForgetPassword";

export const authProtectedRoutes = [
	// this route should be at the end of all other routes
	// { path: "/", exact: true, component: () => redirect("/dashboard")}
];

export const publicRoutes = [
	{ path: "/logout", component: Logout },
	{ path: "/login", component: Login },
	{ path: "/forgot-password", component: ForgetPassword },
	{ path: "/register", component: Register },
];