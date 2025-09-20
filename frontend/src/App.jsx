import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import StudentDashboard from "./pages/StudentDashboard";
import Login from "./pages/Login";

const isAuthenticated = () => {
  return localStorage.getItem("telegramUser") !== null;
};

// Create a router configuration
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/student/dashboard",
    element: isAuthenticated() ? <StudentDashboard /> : <Login />,
  },
  {
    path: "*", // fallback
    element: <Login />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
