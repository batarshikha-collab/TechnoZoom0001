import React, { useEffect, useState } from "react";

function Registrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  // ======================================================
  // FETCH ALL REGISTRATIONS
  // ======================================================

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      setError("");

      if (!API_URL) {
        setError(
          "API URL is not configured. Please check the frontend .env file."
        );
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${API_URL}/api/registrations`
      );

      const data = await response.json();

      console.log("ADMIN REGISTRATIONS:", data);

      if (!response.ok || !data.success) {
        setError(
          data.message || "Failed to load registrations."
        );
        setLoading(false);
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

  // ======================================================
  // LOAD REGISTRATIONS
  // ======================================================

  useEffect(() => {
    fetchRegistrations();
  }, []);

  // ======================================================
  // PAGE
  // ======================================================

  return (
    <div className="container-fluid py-5">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            Event Registrations
          </h2>

          <p className="text-muted mb-0">
            All students registered for events
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={fetchRegistrations}
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh"}
        </button>

      </div>

      {/* ==================================================
          TOTAL REGISTRATIONS
      ================================================== */}

      {!loading && !error && (
        <div className="alert alert-info mb-4">
          <strong>Total Registrations:</strong>{" "}
          {registrations.length}
        </div>
      )}

      {/* ==================================================
          LOADING
      ================================================== */}

      {loading && (
        <div className="text-center py-5">

          <div
            className="spinner-border text-primary"
            role="status"
          ></div>

          <p className="mt-3 text-muted">
            Loading registrations...
          </p>

        </div>
      )}

      {/* ==================================================
          ERROR
      ================================================== */}

      {!loading && error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* ==================================================
          EMPTY
      ================================================== */}

      {!loading &&
        !error &&
        registrations.length === 0 && (

          <div className="alert alert-warning">
            No event registrations found.
          </div>

        )}

      {/* ==================================================
          REGISTRATION TABLE
      ================================================== */}

      {!loading &&
        !error &&
        registrations.length > 0 && (

          <div className="card shadow-sm border-0">

            <div className="card-body p-0">

              {/* Horizontal scrolling */}
              <div
                className="table-responsive"
                style={{
                  maxHeight: "650px",
                  overflow: "auto",
                }}
              >

                <table className="table table-bordered table-hover align-middle mb-0">

                  {/* ==================================================
                      TABLE HEADER
                  ================================================== */}

                  <thead className="table-dark sticky-top">

                    <tr>

                      <th className="text-center">
                        #
                      </th>

                      <th>
                        Student Name
                      </th>

                      <th>
                        Registration No.
                      </th>

                      <th>
                        Roll No.
                      </th>

                      <th>
                        Course
                      </th>

                      <th>
                        Branch
                      </th>

                      <th>
                        Year
                      </th>

                      <th>
                        Semester
                      </th>

                      <th>
                        Mobile
                      </th>

                      <th>
                        College
                      </th>

                      <th>
                        Email
                      </th>

                      <th>
                        Event
                      </th>

                      <th>
                        Event Date
                      </th>

                      <th>
                        Venue
                      </th>

                      <th>
                        Category
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Registered On
                      </th>

                    </tr>

                  </thead>

                  {/* ==================================================
                      TABLE BODY
                  ================================================== */}

                  <tbody>

                    {registrations.map(
                      (registration, index) => {

                        const student =
                          registration.studentId || {};

                        const event =
                          registration.eventId || {};

                        return (
                          <tr
                            key={
                              registration._id ||
                              index
                            }
                          >

                            {/* NUMBER */}

                            <td className="text-center fw-bold">
                              {index + 1}
                            </td>

                            {/* STUDENT NAME */}

                            <td className="fw-semibold">
                              {registration.name ||
                                student.name ||
                                "-"}
                            </td>

                            {/* REGISTRATION NUMBER */}

                            <td>
                              <span className="badge bg-primary">
                                {registration.registrationNo ||
                                  student.registrationNo ||
                                  "-"}
                              </span>
                            </td>

                            {/* ROLL NUMBER */}

                            <td>
                              {registration.rollNo ||
                                "-"}
                            </td>

                            {/* COURSE */}

                            <td>
                              {registration.course ||
                                "-"}
                            </td>

                            {/* BRANCH */}

                            <td>
                              {registration.branch ||
                                "-"}
                            </td>

                            {/* YEAR */}

                            <td>
                              {registration.year ||
                                "-"}
                            </td>

                            {/* SEMESTER */}

                            <td>
                              {registration.semester ||
                                "-"}
                            </td>

                            {/* MOBILE */}

                            <td>
                              {registration.mobile ||
                                "-"}
                            </td>

                            {/* COLLEGE */}

                            <td>
                              {registration.college ||
                                "-"}
                            </td>

                            {/* EMAIL */}

                            <td>
                              {registration.email ||
                                student.email ||
                                "-"}
                            </td>

                            {/* EVENT */}

                            <td className="fw-semibold">
                              {event.title ||
                                "-"}
                            </td>

                            {/* EVENT DATE */}

                            <td>
                              {event.date ||
                                "-"}
                            </td>

                            {/* VENUE */}

                            <td>
                              {event.venue ||
                                "-"}
                            </td>

                            {/* CATEGORY */}

                            <td>
                              {event.category ||
                                "-"}
                            </td>

                            {/* STATUS */}

                            <td>

                              <span
                                className={`badge ${
                                  registration.status ===
                                  "Cancelled"
                                    ? "bg-danger"
                                    : "bg-success"
                                }`}
                              >
                                {registration.status ||
                                  "Registered"}
                              </span>

                            </td>

                            {/* REGISTERED DATE */}

                            <td>
                              {registration.createdAt
                                ? new Date(
                                    registration.createdAt
                                  ).toLocaleString(
                                    "en-IN"
                                  )
                                : "-"}
                            </td>

                          </tr>
                        );
                      }
                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        )}

    </div>
  );
}

export default Registrations;