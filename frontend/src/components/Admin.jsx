import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError("");

      // Get all students
      const studentsResponse = await fetch(
        "http://localhost:5000/api/students"
      );

      const studentsData = await studentsResponse.json();

      if (studentsResponse.ok) {
        setStudents(studentsData.students || []);
      }

      // Get all events
      const eventsResponse = await fetch(
        "http://localhost:5000/api/events"
      );

      const eventsData = await eventsResponse.json();

      if (eventsResponse.ok) {
        setEvents(eventsData.events || []);
      }

      // Get all registrations
      const registrationsResponse = await fetch(
        "http://localhost:5000/api/registrations"
      );

      const registrationsData =
        await registrationsResponse.json();

      if (registrationsResponse.ok) {
        setRegistrations(
          registrationsData.registrations || []
        );
      }

    } catch (error) {
      console.log("Admin data error:", error);

      setError(
        "Unable to load admin data. Please make sure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin-login");
  };

  return (
    <div className="container mt-5">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-5">

        <div>
          <h1 className="fw-bold">
            Admin Dashboard
          </h1>

          <p className="text-muted">
            Welcome to TechnoZoom Admin Panel
          </p>
        </div>

        <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      {/* Error */}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* Loading */}

      {loading && (
        <div className="alert alert-info">
          Loading admin data...
        </div>
      )}

      {/* Statistics */}

      {!loading && (
        <div className="row g-4 mb-5">

          {/* Students */}

          <div className="col-md-3">

            <div className="card shadow-sm text-center h-100">

              <div className="card-body">

                <h2 className="fw-bold text-primary">
                  {students.length}
                </h2>

                <p className="mb-0">
                  Total Students
                </p>

              </div>

            </div>

          </div>

          {/* Events */}

          <div className="col-md-3">

            <div className="card shadow-sm text-center h-100">

              <div className="card-body">

                <h2 className="fw-bold text-success">
                  {events.length}
                </h2>

                <p className="mb-0">
                  Total Events
                </p>

              </div>

            </div>

          </div>

          {/* Registrations */}

          <div className="col-md-3">

            <div className="card shadow-sm text-center h-100">

              <div className="card-body">

                <h2 className="fw-bold text-info">
                  {registrations.length}
                </h2>

                <p className="mb-0">
                  Registrations
                </p>

              </div>

            </div>

          </div>

          {/* Notices */}

          <div className="col-md-3">

            <div className="card shadow-sm text-center h-100">

              <div className="card-body">

                <h2 className="fw-bold text-warning">
                  0
                </h2>

                <p className="mb-0">
                  Notices
                </p>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Management */}

      <h3 className="fw-bold mb-4">
        Management
      </h3>

      <div className="row g-4">

        {/* Events */}

        <div className="col-md-6 col-lg-3">

          <div className="card shadow-sm h-100">

            <div className="card-body">

              <h5 className="fw-bold">
                Manage Events
              </h5>

              <p className="text-muted">
                Add, edit and delete events.
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

        {/* Students */}

        <div className="col-md-6 col-lg-3">

          <div className="card shadow-sm h-100">

            <div className="card-body">

              <h5 className="fw-bold">
                Students
              </h5>

              <p className="text-muted">
                View all registered students.
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

        {/* Registrations */}

        <div className="col-md-6 col-lg-3">

          <div className="card shadow-sm h-100">

            <div className="card-body">

              <h5 className="fw-bold">
                Registrations
              </h5>

              <p className="text-muted">
                View all event registrations.
              </p>

              <button
                className="btn btn-info"
                onClick={() =>
                  navigate("/admin/registrations")
                }
              >
                View Registrations
              </button>

            </div>

          </div>

        </div>

        {/* Notices */}

        <div className="col-md-6 col-lg-3">

          <div className="card shadow-sm h-100">

            <div className="card-body">

              <h5 className="fw-bold">
                Notices
              </h5>

              <p className="text-muted">
                Add and manage notices.
              </p>

              <button
                className="btn btn-warning"
                onClick={() =>
                  navigate("/admin/notices")
                }
              >
                Manage Notices
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Admin;