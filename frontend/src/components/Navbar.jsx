import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  const adminLoggedIn =
    localStorage.getItem("adminLoggedIn") === "true";

  const student = JSON.parse(
    localStorage.getItem("student") || "null"
  );

  const handleStudentLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("student");

    navigate("/login");
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("adminLoggedIn");

    navigate("/admin-login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container">

        {/* ==================================================
            LOGO
        ================================================== */}

        <Link
          className="navbar-brand fw-bold"
          to="/"
        >
          TechnoZoom
        </Link>

        {/* ==================================================
            MOBILE TOGGLER
        ================================================== */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ==================================================
            NAVIGATION
        ================================================== */}

        <div
          className="collapse navbar-collapse"
          id="mainNavbar"
        >

          <ul className="navbar-nav ms-auto align-items-lg-center">

            {/* HOME */}

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
              >
                Home
              </Link>
            </li>

            {/* EVENTS */}

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/events"
              >
                Events
              </Link>
            </li>

            {/* ABOUT */}

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/about"
              >
                About
              </Link>
            </li>

            {/* NOTICES */}

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/notices"
              >
                Notices
              </Link>
            </li>

            {/* ==================================================
                STUDENT LOGGED IN
            ================================================== */}

            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>

                <li className="nav-item ms-lg-2">
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={handleStudentLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* STUDENT LOGIN */}

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>

                {/* STUDENT SIGNUP */}

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/signup"
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}

            {/* ==================================================
                ADMIN
            ================================================== */}

            {!adminLoggedIn ? (
              <li className="nav-item ms-lg-2">
                <Link
                  className="btn btn-warning btn-sm px-3"
                  to="/admin-login"
                >
                  Admin Login
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/admin"
                  >
                    Admin Panel
                  </Link>
                </li>

                <li className="nav-item ms-lg-2">
                  <button
                    className="btn btn-outline-warning btn-sm"
                    onClick={handleAdminLogout}
                  >
                    Admin Logout
                  </button>
                </li>
              </>
            )}

          </ul>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;
