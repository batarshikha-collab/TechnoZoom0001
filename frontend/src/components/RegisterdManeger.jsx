import React, { useEffect, useState } from "react";

function RegistrationManager() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  // ======================================================
  // FETCH REGISTRATIONS FROM BACKEND
  // ======================================================

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      setError("");

      if (!API_URL) {
        setError(
          "API URL is not configured. Please check the frontend environment settings."
        );
        return;
      }

      const response = await fetch(
        `${API_URL}/api/registrations`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message ||
            "Unable to fetch registrations."
        );
        return;
      }

      setRegistrations(
        data.registrations || []
      );
    } catch (error) {
      console.error(
        "Fetch registrations error:",
        error
      );

      setError(
        "Unable to connect to server."
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // LOAD DATA
  // ======================================================

  useEffect(() => {
    fetchRegistrations();
  }, []);

  // ======================================================
  // FORMAT DATE
  // ======================================================

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
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
          Loading registrations...
        </p>

      </div>
    );
  }

  // ======================================================
  // PAGE
  // ======================================================

  return (
    <div className="container-fluid bg-light min-vh-100 py-5">

      <div className="container">

        {/* HEADER */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h2 className="fw-bold mb-1">
              Event Registrations
            </h2>

            <p className="text-muted mb-0">
              Students registered for TechnoZoom events
            </p>
          </div>

          <button
            className="btn btn-outline-primary"
            onClick={fetchRegistrations}
          >
            🔄 Refresh
          </button>

        </div>

        {/* ERROR */}

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {/* NO DATA */}

        {!error && registrations.length === 0 ? (

          <div className="alert alert-info text-center">
            No event registrations found.
          </div>

        ) : (

          /* TABLE */

          registrations.length > 0 && (

            <div className="card border-0 shadow-sm">

              <div className="table-responsive">

                <table className="table table-hover align-middle mb-0">

                  <thead className="table-dark">

                    <tr>
                      <th>#</th>
                      <th>Student Name</th>
                      <th>Email</th>
                      <th>Registration No.</th>
                      <th>Roll No.</th>
                      <th>Course</th>
                      <th>Branch</th>
                      <th>Year</th>
                      <th>Semester</th>
                      <th>Event</th>
                      <th>Date</th>
                      <th>Venue</th>
                      <th>Status</th>
                      <th>Registered On</th>
                    </tr>

                  </thead>

                  <tbody>

                    {registrations.map(
                      (registration, index) => {

                        const studentName =
                          registration.name ||
                          registration.studentId?.name ||
                          "N/A";

                        const email =
                          registration.email ||
                          registration.studentId?.email ||
                          "N/A";

                        const registrationNo =
                          registration.registrationNo ||
                          registration.studentId?.registrationNo ||
                          "N/A";

                        return (
                          <tr
                            key={
                              registration._id ||
                              index
                            }
                          >

                            <td>
                              {index + 1}
                            </td>

                            <td>
                              <strong>
                                {studentName}
                              </strong>
                            </td>

                            <td>
                              {email}
                            </td>

                            <td>
                              <span className="badge bg-primary">
                                {registrationNo}
                              </span>
                            </td>

                            <td>
                              {registration.rollNo ||
                                "N/A"}
                            </td>

                            <td>
                              {registration.course ||
                                "N/A"}
                            </td>

                            <td>
                              {registration.branch ||
                                "N/A"}
                            </td>

                            <td>
                              {registration.year ||
                                "N/A"}
                            </td>

                            <td>
                              {registration.semester ||
                                "N/A"}
                            </td>

                            <td>
                              <strong>
                                {registration.eventId?.title ||
                                  "Event unavailable"}
                              </strong>
                            </td>

                            <td>
                              {registration.eventId?.date ||
                                "N/A"}
                            </td>

                            <td>
                              {registration.eventId?.venue ||
                                "N/A"}
                            </td>

                            <td>

                              {registration.status ===
                              "Cancelled" ? (

                                <span className="badge bg-danger">
                                  Cancelled
                                </span>

                              ) : (

                                <span className="badge bg-success">
                                  Registered
                                </span>

                              )}

                            </td>

                            <td>
                              {formatDate(
                                registration.createdAt
                              )}
                            </td>

                          </tr>
                        );
                      }
                    )}

                  </tbody>

                </table>

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default RegistrationManager;