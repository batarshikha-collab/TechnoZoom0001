import { BrowserRouter, Routes, Route } from "react-router-dom";

// ======================================================
// COMMON COMPONENTS
// ======================================================

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ======================================================
// PUBLIC PAGES
// ======================================================

import Home from "./pages/public/Home";
import Events from "./pages/public/Events";
import About from "./components/About";

// ======================================================
// STUDENT AUTH
// ======================================================

import Signup from "./components/SignUp";
import Login from "./components/login";

// ======================================================
// STUDENT
// ======================================================

import Dashboard from "./components/deshboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/profile";
import EventRegistration from "./components/EventRegistraton";

// ======================================================
// NOTICES
// ======================================================

// Student notices dekhne ke liye
import Notices from "./components/Notices";

// Admin notices add/delete karne ke liye
import NoticeManager from "./components/noticManager";

// ======================================================
// ADMIN
// ======================================================

import AdminLogin from "./components/AdminLogin";
import Admin from "./components/Admin";
import AdminProtectedRoute from "./components/AdminRoute";

import EventManager from "./components/EventManager";
import StudentManager from "./components/studentManager";

// IMPORTANT:
// Admin ke View Registrations ke liye
// Registrations.jsx import karna hai
import Registrations from "./components/Registrations";

import EditRegistration from "./components/EditRegisteration";

// ======================================================
// APP
// ======================================================

function App() {
  return (
    <BrowserRouter>

      {/* ==================================================
          NAVBAR
      ================================================== */}

      <Navbar />

      {/* ==================================================
          ALL ROUTES
      ================================================== */}

      <Routes>

        {/* ==================================================
            PUBLIC ROUTES
        ================================================== */}

        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* EVENTS */}

        <Route
          path="/events"
          element={<Events />}
        />

        {/* ABOUT */}

        <Route
          path="/about"
          element={<About />}
        />

        {/* ==================================================
            STUDENT AUTH ROUTES
        ================================================== */}

        {/* SIGNUP */}

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* ==================================================
            STUDENT PROTECTED ROUTES
        ================================================== */}

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* PROFILE */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* EVENT REGISTRATION */}

        <Route
          path="/event-registration"
          element={
            <ProtectedRoute>
              <EventRegistration />
            </ProtectedRoute>
          }
        />

        {/* ==================================================
            STUDENT NOTICE BOARD
        ================================================== */}

        <Route
          path="/notices"
          element={<Notices />}
        />

        {/* ==================================================
            ADMIN LOGIN
        ================================================== */}

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        {/* ==================================================
            ADMIN DASHBOARD
        ================================================== */}

        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <Admin />
            </AdminProtectedRoute>
          }
        />

        {/* ==================================================
            ADMIN - EVENTS
        ================================================== */}

        <Route
          path="/admin/events"
          element={
            <AdminProtectedRoute>
              <EventManager />
            </AdminProtectedRoute>
          }
        />

        {/* ==================================================
            ADMIN - STUDENTS
        ================================================== */}

        <Route
          path="/admin/students"
          element={
            <AdminProtectedRoute>
              <StudentManager />
            </AdminProtectedRoute>
          }
        />

        {/* ==================================================
            ADMIN - EVENT REGISTRATIONS
        ================================================== */}

        {/* IMPORTANT:
            Yahan Registrations.jsx open hoga.
            RegisterStudent.jsx nahi.
        */}

        <Route
          path="/admin/registrations"
          element={
            <AdminProtectedRoute>
              <Registrations />
            </AdminProtectedRoute>
          }
        />

        {/* ==================================================
            ADMIN - NOTICES
        ================================================== */}

        <Route
          path="/admin/notices"
          element={
            <AdminProtectedRoute>
              <NoticeManager />
            </AdminProtectedRoute>
          }
        />

        {/* ==================================================
            EDIT REGISTRATION
        ================================================== */}

        <Route
          path="/edit-registration"
          element={
            <ProtectedRoute>
              <EditRegistration />
            </ProtectedRoute>
          }
        />

      </Routes>

      {/* ==================================================
          FOOTER
      ================================================== */}

      <Footer />

    </BrowserRouter>
  );
}

export default App;
