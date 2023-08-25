import { lazy } from "react";

export const routes = {
  // Declare Restricted Routes
  Restricted: [
    // Stripe Account Setup
    // {
    //   path: "/account-setup",
    //   component: lazy(() => import("@pages/Account-setup")),
    // },
    {
      path: "/verification",
      component: lazy(() => import("@/pages/Auth/EmailVerification")),
    },
    {
      path: "verification/:token",
      component: lazy(() => import("@/pages/Auth/Verification")),
    },
  ],

  //   Declare Private Routes
  Private: [
    {
      path: "/dashboard",
      component: lazy(() => import("@pages/Dashboard")),
    },
    {
        path: "/profile",
        component: lazy(() => import("@pages/Auth/User/Profile")),
    },
    {
      path: "/notifications",
      component: lazy(() => import("@pages/Auth/User/Notifications")),
    },
    {
      path: "/enrolled-courses",
      component: lazy(() => import("@pages/Auth/Course/EnrolledCourses")),
    },
    {
      path: "/instructor-courses",
      component: lazy(() => import("@pages/Auth/Course/InstructorCourses")),
    },
    {
      path: "/course-assignments",
      component: lazy(() => import("@pages/Auth/Assignment/Assignments")),
    },
    {
        path: "/course-assignments/:id",
        component: lazy(() => import("@pages/Auth/Assignments/AssignmentDetail")),
    },
    {
        path: "/quizzes",
        component: lazy(() => import("@pages/Auth/Quiz/Quizzes")),
    },
    {
        path: "/quizzes/:id",
        component: lazy(() => import("@pages/Auth/Quiz/QuizDetail")),
    },
    {
        path: "/submissions",
        component: lazy(() => import("@pages/Auth/Submission/Submissions")),
    },
    {
        path: "/submissions/:id",
        component: lazy(() => import("@pages/Auth/Submission/SubmissionDetail")),
    },
    {
      path: "/account-settings",
      component: lazy(() => import("@pages/Auth/User/AccountSettings")),
    },
    {
      path: "/verification/:token",
      component: lazy(() => import("@pages/Auth/Verification")),
    },
    {
      path: "/forgot-password",
      component: lazy(() => import("@pages/Auth/ForgotPassword")),
    },
    {
      path: "/ResetPassword",
      component: lazy(() => import("@pages/Auth/ResetPassword")),
    },
  ],

  // Declare Public Route Here
  Public: [   
    {
      path: "/register",
      component: lazy(() => import("@pages/Auth/Register")),
    },
    {
      path: "/login",
      component: lazy(() => import("@pages/Auth/Login")),
    },
    {
      path: "/",
      component: lazy(() => import("@pages/NonAuth/Home")),
      exact: true,
    },
    {
      path: "/courses",
      component: lazy(() => import("@pages/NonAuth/Course/Courses")),
    },
    {
      path: "/courses/:id",
      component: lazy(() => import("@pages/NonAuth/Course/CourseDetail")),
    },
    {
      path: "/articles",
      component: lazy(() => import("@pages/NonAuth/Article/Articles")),
    },
    {
      path: "/articles/:id",
      component: lazy(() => import("@pages/NonAuth/Aritcles/ArticleDetail")),
    },
  ],
};
