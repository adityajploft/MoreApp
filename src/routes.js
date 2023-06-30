import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';

// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

// pages
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import OtpVerification from './pages/OtpVerification';
import UpdateProfile from './pages/UpdateUser';

// Redux -toolkitt selector
import { selectIsLoggedIn } from './fetures/ProfileSlice/selectIsLoggedIn';

export default function Router() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const routes = useRoutes([
    {
      path: '/',
      element: isLoggedIn ? <Navigate to="/dashboard/app" replace /> : <LoginPage />,
    },
    {
      path: 'dashboard',
      element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" replace />,
      children: [
        { path: '/dashboard/app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'updateProfile',
      element: isLoggedIn ? <UpdateProfile /> : <Navigate to="/login" replace />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/dashboard/app" replace /> },
      ],
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: 'otp',
      element: <OtpVerification />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
