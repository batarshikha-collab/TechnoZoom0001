import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const [students, setStudents] = useState([]);
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [notices, setNotices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ======================================================
  // FETCH ADMIN DATA
  // ======================================================

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError("");

      if (!API_URL) {
        setError(
          "API URL is not configured. Please check frontend/.env"
        );
        return;
      }

      // ==================================================
      // STUDENTS
      // ==================================================

      const studentsResponse = await fetch(
        `${API_URL}/api/students`
      );

      const studentsData = await studentsResponse.json();

      console.log("ADMIN STUDENTS:", studentsData);

      if (
        studentsResponse.ok &&
        studentsData.success
      ) {
        setStudents(
          studentsData.students || []
        );
      }

      // ==================================================
      // EVENTS
      // ==================================================

      const eventsResponse = await fetch(
        `${API_URL}/api/events`
      );

      const eventsData = await eventsResponse.json();

      console.log("ADMIN EVENTS:", eventsData);

      if (
        eventsResponse.ok &&
        eventsData.success
      ) {
        setEvents(
          eventsData.events || []
        );
      }

      // ==================================================
      // REGISTRATIONS
      // ==================================================

      const registrationsResponse =
        await fetch(
          `${API_URL}/api/registrations`
        );

      const registrationsData =
        await registrationsResponse.json();

      console.log(
        "ADMIN REGISTRATIONS:",
        registrationsData
      );

      if (
        registrationsResponse.ok &&
        registrationsData.success
      ) {
        setRegistrations(
          registrationsData.registrations || []
        );
      }

      // ==================================================
      // NOTICES
      // ==================================================

      try {
        const noticesResponse = await fetch(
          `${API_URL}/api/notices`
        );

        const noticesData =
          await noticesResponse.json();

        console.log(
          "ADMIN NOTICES:",
          noticesData
        );

        if (
          noticesResponse.ok &&
          noticesData.success
        ) {
          setNotices(
            noticesData.notices || []
          );
        }
      } catch (noticeError) {
        console.log(
          "Notice API not available:",
          noticeError
        );

        setNotices([]);
      }

    } catch (error) {
      console.error(
        "Admin data error:",
        error
      );

      setError(
        "Unable to load admin data. Please make sure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // LOAD DATA
  // ======================================================

  useEffect(() => {
    fetchAdminData();
  }, []);

  // ======================================================
  // ADMIN LOGOUT
  // ======================================================

  const handleLogout = () => {
    localStorage.removeItem(
      "adminLoggedIn"
    );

    navigate("/admin-login");
  };

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <div className="container py-5">

        <div className="text-center">

          <div
            className="spinner-border text-primary"
            role="status"
          ></div>

          <p className="mt-3 text-muted">
            Loading Admin Dashboard...
          </p>

        </div>

      </div>
    );
  }

  // ======================================================
  // PAGE
  // ======================================================

  return (
    <div className="bg-light min-vh-100">

      <div className="container py-5">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="d-flex justify-content-between align-items-center mb-5">

          <div>

            <h1 className="fw-bold mb-1">
              Admin Dashboard
            </h1>

            <p className="text-muted mb-0">
              Welcome to TechnoZoom Admin Panel
            </p>

          </div>

          <div className="d-flex gap-2">

            <button
              className="btn btn-outline-primary"
              onClick={fetchAdminData}
            >
              Refresh
            </button>

            <button
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </div>

        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (
          <div className="alert alert-danger">
            <strong>Error:</strong>{" "}
            {error}
          </div>
        )}

        {/* ==================================================
            STATISTICS
        ================================================== */}

        <div className="row g-4 mb-5">

          {/* STUDENTS */}

          <div className="col-md-6 col-lg-3">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body text-center p-4">

                <div className="mb-3">

                  <span
                    className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-circle"
                    style={{
                      width: "60px",
                      height: "60px",
                    }}
                  >
                    👨‍🎓
                  </span>

                </div>

                <h2 className="fw-bold text-primary">
                  {students.length}
                </h2>

                <p className="text-muted mb-0">
                  Total Students
                </p>

              </div>

            </div>

          </div>

          {/* EVENTS */}

          <div className="col-md-6 col-lg-3">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body text-center p-4">

                <div className="mb-3">

                  <span
                    className="d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 text-success rounded-circle"
                    style={{
                      width: "60px",
                      height: "60px",
                    }}
                  >
                    📅
                  </span>

                </div>

                <h2 className="fw-bold text-success">
                  {events.length}
                </h2>

                <p className="text-muted mb-0">
                  Total Events
                </p>

              </div>

            </div>

          </div>

          {/* REGISTRATIONS */}

          <div className="col-md-6 col-lg-3">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body text-center p-4">

                <div className="mb-3">

                  <span
                    className="d-inline-flex align-items-center justify-content-center bg-info bg-opacity-10 text-info rounded-circle"
                    style={{
                      width: "60px",
                      height: "60px",
                    }}
                  >
                    📝
                  </span>

                </div>

                <h2 className="fw-bold text-info">
                  {registrations.length}
                </h2>

                <p className="text-muted mb-0">
                  Event Registrations
                </p>

              </div>

            </div>

          </div>

          {/* NOTICES */}

          <div className="col-md-6 col-lg-3">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body text-center p-4">

                <div className="mb-3">

                  <span
                    className="d-inline-flex align-items-center justify-content-center bg-warning bg-opacity-10 text-warning rounded-circle"
                    style={{
                      width: "60px",
                      height: "60px",
                    }}
                  >
                    📢
                  </span>

                </div>

                <h2 className="fw-bold text-warning">
                  {notices.length}
                </h2>

                <p className="text-muted mb-0">
                  Total Notices
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ==================================================
            MANAGEMENT
        ================================================== */}

        <h3 className="fw-bold mb-4">
          Management
        </h3>

        <div className="row g-4">

          {/* ==================================================
              EVENTS
          ================================================== */}

          <div className="col-md-6 col-lg-3">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body p-4">

                <h5 className="fw-bold">
                  📅 Manage Events
                </h5>

                <p className="text-muted">
                  Add, edit and delete events
                  from the website.
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate("/admin/events")
                  }
                >
                  Manage Events
                </button>

              </div>

            </div>

          </div>

          {/* ==================================================
              STUDENTS
          ================================================== */}

          <div className="col-md-6 col-lg-3">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body p-4">

                <h5 className="fw-bold">
                  👨‍🎓 Students
                </h5>

                <p className="text-muted">
                  View all students who created
                  an account.
                </p>

                <button
                  className="btn btn-success"
                  onClick={() =>
                    navigate("/admin/students")
                  }
                >
                  View Students
                </button>

              </div>

            </div>

          </div>

          {/* ==================================================
              REGISTRATIONS
          ================================================== */}

          <div className="col-md-6 col-lg-3">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body p-4">

                <h5 className="fw-bold">
                  📝 Registrations
                </h5>

                <p className="text-muted">
                  View complete details of students
                  registered for events.
                </p>

                <button
                  className="btn btn-info"
                  onClick={() =>
                    navigate(
                      "/admin/registrations"
                    )
                  }
                >
                  View Registrations
                </button>

              </div>

            </div>

          </div>

          {/* ==================================================
              NOTICES
          ================================================== */}

          <div className="col-md-6 col-lg-3">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body p-4">

                <h5 className="fw-bold">
                  📢 Notices
                </h5>

                <p className="text-muted">
                  Add, edit and manage notices
                  for students.
                </p>

                <button
                  className="btn btn-warning"
                  onClick={() =>
                    navigate(
                      "/admin/notices"
                    )
                  }
                >
                  Manage Notices
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* ==================================================
            QUICK SUMMARY
        ================================================== */}

        <div className="card border-0 shadow-sm mt-5">

          <div className="card-body p-4">

            <h5 className="fw-bold mb-4">
              Quick Summary
            </h5>

            <div className="row">

              <div className="col-md-4 mb-3 mb-md-0">

                <div className="d-flex align-items-center">

                  <div
                    className="bg-primary bg-opacity-10 text-primary rounded p-3 me-3"
                  >
                    👨‍🎓
                  </div>

                  <div>

                    <small className="text-muted">
                      Students
                    </small>

                    <h5 className="fw-bold mb-0">
                      {students.length}
                    </h5>

                  </div>

                </div>

              </div>

              <div className="col-md-4 mb-3 mb-md-0">

                <div className="d-flex align-items-center">

                  <div
                    className="bg-success bg-opacity-10 text-success rounded p-3 me-3"
                  >
                    📅
                  </div>

                  <div>

                    <small className="text-muted">
                      Events
                    </small>

                    <h5 className="fw-bold mb-0">
                      {events.length}
                    </h5>

                  </div>

                </div>

              </div>

              <div className="col-md-4">

                <div className="d-flex align-items-center">

                  <div
                    className="bg-info bg-opacity-10 text-info rounded p-3 me-3"
                  >
                    📝
                  </div>

                  <div>

                    <small className="text-muted">
                      Registrations
                    </small>

                    <h5 className="fw-bold mb-0">
                      {registrations.length}
                    </h5>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Admin;
