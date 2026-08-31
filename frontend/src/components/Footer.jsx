import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5">

      <div className="container py-5">

        <div className="row g-4">

          {/* Brand */}

          <div className="col-md-5">

            <h3 className="fw-bold">
              Techno<span className="text-primary">Zoom</span>
            </h3>

            <p className="text-secondary">
              A smart platform for discovering,
              registering and managing college events.
            </p>

          </div>


          {/* Quick Links */}

          <div className="col-md-3">

            <h5 className="fw-bold mb-3">
              Quick Links
            </h5>

            <div className="d-flex flex-column gap-2">

              <Link
                to="/"
                className="text-secondary text-decoration-none"
              >
                Home
              </Link>

              <Link
                to="/events"
                className="text-secondary text-decoration-none"
              >
                Events
              </Link>

              <Link
                to="/about"
                className="text-secondary text-decoration-none"
              >
                About
              </Link>

            </div>

          </div>


          {/* Student */}

          <div className="col-md-4">

            <h5 className="fw-bold mb-3">
              Student
            </h5>

            <div className="d-flex flex-column gap-2">

              <Link
                to="/login"
                className="text-secondary text-decoration-none"
              >
                Student Login
              </Link>

              <Link
                to="/signup"
                className="text-secondary text-decoration-none"
              >
                Create Account
              </Link>

              <Link
                to="/admin-login"
                className="text-secondary text-decoration-none"
              >
                Admin Login
              </Link>

            </div>

          </div>

        </div>

      </div>


      {/* Copyright */}

      <div className="border-top border-secondary">

        <div className="container py-3">

          <div className="text-center text-secondary">

            © 2026 TechnoZoom.
            All rights reserved.

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;