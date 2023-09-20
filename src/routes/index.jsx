import { USER_ROLE } from '../config/config';

import Dashboard from '@/pages/Dashboard'
import {
    AddArticle,
    EditArticle,
    InstructorArticles,
    AddAssignment,
    AssignmentDetail,
    Assignments,
    EditAssignment,
    InstructorAssignments,
    TakenAssignment,
    AddCourse,
    EditCourse,
    EnrolledCourse,
    EnrolledCourses,
    InstructorCourses,
    Billing,
    Earnings,
    PaymentDetails,
    Quizzes,
    QuizDetail,
    Submissions,
    StudentSubmissions,
    SubmissionDetail,
    AccountSettings,
    Notifications,
    Profile,
    Login,
    Register,
    ResetPassword,
    ForgotPassword,
    EmailVerification,
    Verification,
} from '@/pages/Auth';

import {
    Articles,
    ArticleDetail,
    Courses,
    CourseDetail,
    Home
} from '@/pages/NonAuth';

export const pages = {
    PublicRoutes: [
        { path: '', element: <Home/>, exact: true },
        { path: 'login', element: <Login />, exact: false },
        { path: 'register', element: <Register />, exact: false },
        { path: 'reset-password', element: <ResetPassword />, exact: false },
        { path: 'forgot-password', element: <ForgotPassword />, exact: false },
        { path: 'articles', element: <Articles/>, exact: false },
        { path: 'article/:articleID', element: <ArticleDetail/>, exact: false },
        { path: 'courses', element: <Courses/>, exact: false },
        { path: 'course/:courseID', element: <CourseDetail/>, exact: false }
    ],

    ProtectedRoutes: [
        { path: 'dashboard', element: <Dashboard />, exact: false, allowedRoles: [USER_ROLE.STUDENT, USER_ROLE.ADMIN] },
        { path: 'email-verification', element: <EmailVerification />, exact: false },
        { path: 'verification', element: <Verification />, exact: false },
        { path: 'add-article/:articleID', element: <AddArticle />, exact: false },
        { path: 'edit-article/:articleID', element: <EditArticle />, exact: false },
        { path: 'instructor-articles/:articleID', element: <InstructorArticles />, exact: false },
        { path: 'add-assignment/:courseID', element: <AddAssignment />, exact: false },
        { path: 'assignment-detail/:courseID', element: <AssignmentDetail />, exact: false },
        { path: 'assignments', element: <Assignments />, exact: false, allowedRoles: [USER_ROLE.ADMIN] },
        { path: 'edit-assignment/:courseID', element: <EditAssignment />, exact: false },
        { path: 'instructor-assignments/:courseID', element: <InstructorAssignments />, exact: false },
        { path: 'taken-assignment/:id', element: <TakenAssignment />, exact: false },
        { path: 'add-course', element: <AddCourse />, exact: false, allowedRoles: [USER_ROLE.ADMIN] },
        { path: 'edit-course/:courseID', element: <AddCourse />, exact: false, allowedRoles: [USER_ROLE.ADMIN] },
        { path: 'enrolled-course/:courseID', element: <EnrolledCourse />, exact: false, allowedRoles: [USER_ROLE.STUDENT] },
        { path: 'enrolled-courses', element: <EnrolledCourses />, exact: false, allowedRoles: [USER_ROLE.STUDENT] },
        { path: 'my-courses', element: <InstructorCourses />, exact: false, allowedRoles: [USER_ROLE.ADMIN] },
        { path: 'billing', element: <Billing />, exact: false },
        { path: 'earnings', element: <Earnings />, exact: false, allowedRoles: [USER_ROLE.ADMIN] },
        { path: 'paymentdetails', element: <PaymentDetails />, exact: false },
        { path: 'quizzes', element: <Quizzes />, exact: false },
        { path: 'quiz-detail/:quizID', element: <QuizDetail />, exact: false },
        { path: 'submissions', element: <Submissions />, exact: false, allowedRoles: [USER_ROLE.STUDENT] },
        { path: 'student-submissions', element: <StudentSubmissions />, exact: false, allowedRoles: [USER_ROLE.ADMIN] },
        { path: 'submission-detail/:submissionID', element: <SubmissionDetail />, exact: false },
        { path: 'account-settings', element: <AccountSettings />, exact: false, allowedRoles: [USER_ROLE.STUDENT, USER_ROLE.ADMIN] },
        { path: 'announcements', element: <Notifications />, exact: false, allowedRoles: [USER_ROLE.STUDENT, USER_ROLE.ADMIN] },
        { path: 'profile', element: <Profile />, exact: false, allowedRoles: [USER_ROLE.STUDENT, USER_ROLE.ADMIN] },
    ]
};