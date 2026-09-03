
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [notices, setNotices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [noticeLoading, setNoticeLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  // ======================================================
  // LOAD STUDENT
  // ======================================================

  useEffect(() => {
    const savedStudent = localStorage.getItem("student");

    if (!savedStudent) {
      navigate("/login");
      return;
    }

    const loggedInStudent = JSON.parse(savedStudent);

    setStudent(loggedInStudent);

    fetchRegistrations(loggedInStudent.id);
    fetchNotices();
  }, [navigate]);

  // ======================================================
  // FETCH STUDENT REGISTRATIONS
  // ======================================================

  const fetchRegistrations = async (studentId) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/registrations/student/${studentId}`
      );

      const data = await response.json();

      if (data.success) {
        setRegisteredEvents(data.registrations || []);
      } else {
        console.log(
          data.message || "Unable to fetch registrations"
        );
      }
    } catch (error) {
      console.log(
        "Fetch registrations error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // FETCH NOTICES FROM MONGODB
  // ======================================================

  const fetchNotices = async () => {
    try {
      setNoticeLoading(true);

      const response = await fetch(
        `${API_URL}/api/notices`
      );

      const data = await response.json();

      if (data.success) {
        setNotices(data.notices || []);
      } else {
        console.log(
          data.message || "Unable to fetch notices"
        );
      }
    } catch (error) {
      console.log(
        "Fetch notices error:",
        error
      );
    } finally {
      setNoticeLoading(false);
    }
  };

  // ======================================================
  // CANCEL REGISTRATION
  // ======================================================

  const handleCancelRegistration = async (
    registrationId
  ) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this registration?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/registrations/${registrationId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(
          "Registration cancelled successfully!"
        );

        if (student) {
          fetchRegistrations(student.id);
        }
      } else {
        alert(
          data.message ||
            "Unable to cancel registration"
        );
      }
    } catch (error) {
      console.log(
        "Cancel registration error:",
        error
      );

      alert("Unable to connect to server.");
    }
  };

  // ======================================================
  // EDIT REGISTRATION
  // ======================================================

  const handleEditRegistration = (
    registration
  ) => {
    localStorage.setItem(
      "editRegistration",
      JSON.stringify(registration)
    );

    navigate("/edit-registration");
  };

  // ======================================================
  // LOGOUT
  // ======================================================

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("student");

    alert("Logout successful!");

    navigate("/login");
  };

  // ======================================================
  // FORMAT DATE
  // ======================================================

  const formatDate = (date) => {
    if (!date) {
      return "Date not available";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <div className="container py-5 text-center">

        <div
          className="spinner-border text-primary"
          role="status"
        ></div>

        <p className="text-muted mt-3">
          Loading your dashboard...
        </p>

      </div>
    );
  }

  // ======================================================
  // PAGE
  // ======================================================

  return (
    <div className="container py-5">

      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-5">

        <div>

          <h1 className="fw-bold">
            Student Dashboard
          </h1>

          <p className="text-muted mb-0">
            Welcome to your student panel
          </p>

        </div>

        <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      {/* STUDENT INFORMATION */}

      <div className="card shadow-sm border-0 mb-5">

        <div className="card-body p-4">

          <h3 className="fw-bold mb-4">
            Student Information
          </h3>

          {student ? (

            <div className="row">

              <div className="col-md-6 mb-3">

                <strong>Name:</strong>

                <p className="mb-0 text-muted">
                  {student.name}
                </p>

              </div>

              <div className="col-md-6 mb-3">

                <strong>Email:</strong>

                <p className="mb-0 text-muted">
                  {student.email}
                </p>

              </div>

              <div className="col-md-6 mb-3">

                <strong>Registration No:</strong>

                <p className="mb-0 text-muted">
                  {student.registrationNo ||
                    "Not available"}
                </p>

              </div>

            </div>

          ) : (

            <p className="text-muted">
              Student information not available.
            </p>

          )}

        </div>

      </div>

      {/* NOTICES */}

      <div className="mb-4">

        <h2 className="fw-bold">
          Latest Notices 📢
        </h2>

        <p className="text-muted">
          Important announcements from TechnoZoom
        </p>

      </div>

      {noticeLoading && (

        <div className="text-center py-4 mb-5">

          <div
            className="spinner-border text-primary"
            role="status"
          ></div>

          <p className="text-muted mt-2">
            Loading notices...
          </p>

        </div>

      )}

      {!noticeLoading &&
        notices.length === 0 && (

          <div className="alert alert-info mb-5">
            No notices available right now.
          </div>

        )}

      {!noticeLoading &&
        notices.length > 0 && (

          <div className="row g-4 mb-5">

            {notices.map((notice) => (

              <div
                className="col-md-6"
                key={notice._id}
              >

                <div className="card shadow-sm border-0 h-100">

                  <div className="card-body p-4">

                    <span className="badge bg-primary mb-3">
                      Announcement
                    </span>

                    <h4 className="fw-bold">
                      {notice.title}
                    </h4>

                    <p className="text-muted">
                      {notice.message}
                    </p>

                    <small className="text-secondary">

                      Posted on:{" "}

                      {formatDate(
                        notice.createdAt
                      )}

                    </small>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      {/* REGISTERED EVENTS */}

      <div className="mb-4">

        <h2 className="fw-bold">
          My Registered Events
        </h2>

        <p className="text-muted">
          Events you have registered for
        </p>

      </div>

      {registeredEvents.length === 0 ? (

        <div className="card shadow-sm border-0 p-4 text-center mb-5">

          <h4>
            No Registered Events
          </h4>

          <p className="text-muted">
            You haven't registered for any event yet.
          </p>

          <button
            className="btn btn-primary"
            onClick={() =>
              navigate("/events")
            }
          >
            Explore Events
          </button>

          <button
            className="btn btn-outline-primary mt-2"
            onClick={() =>
              navigate("/profile")
            }
          >
            My Profile
          </button>

        </div>

      ) : (

        <div className="row g-4 mb-5">

          {registeredEvents.map(
            (registration) => {

              const event =
                registration.eventId;

              const isCancelled =
                registration.status ===
                "Cancelled";

              return (

                <div
                  className="col-md-6 col-lg-4"
                  key={registration._id}
                >

                  <div className="card shadow-sm border-0 h-100">

                    <div className="card-body p-4">

                      {isCancelled ? (

                        <span className="badge bg-danger mb-3">
                          Cancelled
                        </span>

                      ) : (

                        <span className="badge bg-success mb-3">
                          Registered ✓
                        </span>

                      )}

                      <h4 className="fw-bold">
                        {event?.title ||
                          "Event"}
                      </h4>

                      <p>
                        <strong>
                          📅 Date:
                        </strong>{" "}

                        {event?.date ||
                          "Not available"}
                      </p>

                      <p>
                        <strong>
                          📍 Venue:
                        </strong>{" "}

                        {event?.venue ||
                          "Not available"}
                      </p>

                      <div className="alert alert-light border">

                        <strong>
                          Registration ID
                        </strong>

                        <br />

                        <span className="text-primary fw-bold">
                          {registration._id}
                        </span>

                      </div>

                      <div className="border rounded p-3 mb-3">

                        <h6 className="fw-bold mb-3">
                          Registration Details
                        </h6>

                        <p className="mb-1">
                          <strong>
                            Name:
                          </strong>{" "}
                          {registration.name}
                        </p>

                        <p className="mb-1">
                          <strong>
                            Roll No:
                          </strong>{" "}
                          {registration.rollNo}
                        </p>

                        <p className="mb-1">
                          <strong>
                            Registration No:
                          </strong>{" "}
                          {registration.registrationNo}
                        </p>

                        <p className="mb-1">
                          <strong>
                            Course:
                          </strong>{" "}
                          {registration.course}
                        </p>

                        <p className="mb-1">
                          <strong>
                            Branch:
                          </strong>{" "}
                          {registration.branch}
                        </p>

                        <p className="mb-1">
                          <strong>
                            Year:
                          </strong>{" "}
                          {registration.year}
                        </p>

                        <p className="mb-1">
                          <strong>
                            Semester:
                          </strong>{" "}
                          {registration.semester}
                        </p>

                        <p className="mb-1">
                          <strong>
                            Mobile:
                          </strong>{" "}
                          {registration.mobile}
                        </p>

                        <p className="mb-1">
                          <strong>
                            College:
                          </strong>{" "}
                          {registration.college}
                        </p>

                        <p className="mb-0">
                          <strong>
                            Email:
                          </strong>{" "}
                          {registration.email}
                        </p>

                      </div>

                      {event?.description && (

                        <p className="text-muted">
                          {event.description}
                        </p>

                      )}

                      {!isCancelled && (

                        <div className="d-flex gap-2 mt-3">

                          <button
                            className="btn btn-warning flex-fill"
                            onClick={() =>
                              handleEditRegistration(
                                registration
                              )
                            }
                          >
                            ✏️ Edit
                          </button>

                          <button
                            className="btn btn-danger flex-fill"
                            onClick={() =>
                              handleCancelRegistration(
                                registration._id
                              )
                            }
                          >
                            ❌ Cancel
                          </button>

                        </div>

                      )}

                    </div>

                  </div>

                </div>

              );
            }
          )}

        </div>

      )}

    </div>
  );
}

export default Dashboard;

