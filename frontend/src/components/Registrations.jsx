
import React, { useEffect, useState } from "react";

function Registrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/registrations"
      );

      const data = await response.json();

      console.log("ADMIN REGISTRATIONS:", data);

      if (!response.ok || !data.success) {
        setError(
          data.message || "Failed to load registrations"
        );
        return;
      }

      setRegistrations(data.registrations || []);
    } catch (error) {
      console.error("Fetch registrations error:", error);

      setError(
        "Unable to connect to server. Please make sure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <div className="container-fluid py-5">

      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            Event Registrations
          </h2>

          <p className="text-muted mb-0">
            Complete details of students registered for events
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={fetchRegistrations}
        >
          Refresh
        </button>

      </div>

      {/* LOADING */}

      {loading && (
        <div className="text-center py-5">

          <div
            className="spinner-border text-primary"
            role="status"
          ></div>

          <p className="mt-3">
            Loading registrations...
          </p>

        </div>
      )}

      {/* ERROR */}

      {!loading && error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* EMPTY */}

      {!loading &&
        !error &&
        registrations.length === 0 && (

          <div className="alert alert-info">
            No event registrations found.
          </div>
        )}

      {/* REGISTRATIONS */}

      {!loading &&
        !error &&
        registrations.length > 0 && (

          <div>

            {registrations.map((registration, index) => {

              const student = registration.studentId || {};
              const event = registration.eventId || {};

              return (

                <div
                  className="card shadow-sm border-0 mb-4"
                  key={registration._id || index}
                >

                  <div className="card-body p-4">

                    {/* TOP HEADER */}

                    <div className="d-flex justify-content-between align-items-center mb-4">

                      <div>

                        <h4 className="fw-bold mb-2">
                          Registration #{index + 1}
                        </h4>

                        <span className="badge bg-primary">
                          {registration.registrationNo || "-"}
                        </span>

                      </div>

                      <div className="text-end">

                        <span
                          className={`badge ${
                            registration.status === "Cancelled"
                              ? "bg-danger"
                              : "bg-success"
                          }`}
                        >
                          {registration.status || "Registered"}
                        </span>

                        <div className="small text-muted mt-2">
                          {registration.createdAt
                            ? new Date(
                                registration.createdAt
                              ).toLocaleString()
                            : "-"}
                        </div>

                      </div>

                    </div>


                    {/* EVENT DETAILS */}

                    <div className="card bg-light border-0 mb-4">

                      <div className="card-body">

                        <h5 className="fw-bold mb-3">
                          Event Details
                        </h5>

                        <div className="row">

                          <div className="col-md-3 mb-2">
                            <strong>Event:</strong>
                            <br />
                            {event.title || "-"}
                          </div>

                          <div className="col-md-3 mb-2">
                            <strong>Date:</strong>
                            <br />
                            {event.date || "-"}
                          </div>

                          <div className="col-md-3 mb-2">
                            <strong>Venue:</strong>
                            <br />
                            {event.venue || "-"}
                          </div>

                          <div className="col-md-3 mb-2">
                            <strong>Category:</strong>
                            <br />
                            {event.category || "-"}
                          </div>

                        </div>

                      </div>

                    </div>


                    {/* STUDENT DETAILS */}

                    <h5 className="fw-bold border-bottom pb-2 mb-4">
                      Student Registration Details
                    </h5>

                    <div className="row">

                      {/* NAME */}

                      <div className="col-md-4 mb-4">

                        <small className="text-muted">
                          Full Name
                        </small>

                        <div className="fw-semibold">
                          {registration.name ||
                            student.name ||
                            "-"}
                        </div>

                      </div>


                      {/* REGISTRATION NUMBER */}

                      <div className="col-md-4 mb-4">

                        <small className="text-muted">
                          Registration No.
                        </small>

                        <div className="fw-semibold text-primary">
                          {registration.registrationNo ||
                            student.registrationNo ||
                            "-"}
                        </div>

                      </div>


                      {/* ROLL NUMBER */}

                      <div className="col-md-4 mb-4">

                        <small className="text-muted">
                          Roll No.
                        </small>

                        <div className="fw-semibold">
                          {registration.rollNo || "-"}
                        </div>

                      </div>


                      {/* COURSE */}

                      <div className="col-md-4 mb-4">

                        <small className="text-muted">
                          Course
                        </small>

                        <div className="fw-semibold">
                          {registration.course || "-"}
                        </div>

                      </div>


                      {/* BRANCH */}

                      <div className="col-md-4 mb-4">

                        <small className="text-muted">
                          Branch
                        </small>

                        <div className="fw-semibold">
                          {registration.branch || "-"}
                        </div>

                      </div>


                      {/* YEAR */}

                      <div className="col-md-4 mb-4">

                        <small className="text-muted">
                          Year
                        </small>

                        <div className="fw-semibold">
                          {registration.year || "-"}
                        </div>

                      </div>


                      {/* SEMESTER */}

                      <div className="col-md-4 mb-4">

                        <small className="text-muted">
                          Semester
                        </small>

                        <div className="fw-semibold">
                          {registration.semester || "-"}
                        </div>

                      </div>


                      {/* MOBILE */}

                      <div className="col-md-4 mb-4">

                        <small className="text-muted">
                          Mobile
                        </small>

                        <div className="fw-semibold">
                          {registration.mobile || "-"}
                        </div>

                      </div>


                      {/* COLLEGE */}

                      <div className="col-md-4 mb-4">

                        <small className="text-muted">
                          College
                        </small>

                        <div className="fw-semibold">
                          {registration.college || "-"}
                        </div>

                      </div>


                      {/* EMAIL */}

                      <div className="col-md-6 mb-4">

                        <small className="text-muted">
                          Email
                        </small>

                        <div className="fw-semibold">
                          {registration.email ||
                            student.email ||
                            "-"}
                        </div>

                      </div>


                      {/* STUDENT ID */}

                      <div className="col-md-6 mb-4">

                        <small className="text-muted">
                          Student ID
                        </small>

                        <div className="fw-semibold">
                          {student._id || "-"}
                        </div>

                      </div>

                    </div>


                    {/* REGISTRATION ID */}

                    <div className="alert alert-light border mb-0">

                      <strong>
                        Registration ID:
                      </strong>

                      <span className="ms-2 text-primary">
                        {registration._id || "-"}
                      </span>

                    </div>

                  </div>

                </div>

              );
            })}

          </div>
        )}

    </div>
  );
}

export default Registrations;