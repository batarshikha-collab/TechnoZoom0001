import React, { useEffect, useState } from "react";

function RegisteredStudents() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedRegistration, setSelectedRegistration] =
    useState(null);

  // ======================================================
  // FETCH REGISTRATIONS
  // ======================================================

  const fetchRegistrations = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/registrations"
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(
          data.message || "Unable to fetch registrations"
        );
        return;
      }

      setRegistrations(data.registrations || []);
    } catch (error) {
      console.error(
        "Fetch registrations error:",
        error
      );

      alert(
        "Unable to connect to server. Please make sure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  // ======================================================
  // SEARCH
  // ======================================================

  const filteredRegistrations =
    registrations.filter((registration) => {
      const studentName =
        registration.name ||
        registration.studentId?.name ||
        "";

      const email =
        registration.email ||
        registration.studentId?.email ||
        "";

      const registrationNo =
        registration.registrationNo ||
        registration.studentId?.registrationNo ||
        "";

      const rollNo =
        registration.rollNo || "";

      const eventName =
        registration.eventId?.title || "";

      const searchText =
        search.toLowerCase();

      return (
        studentName
          .toLowerCase()
          .includes(searchText) ||
        email
          .toLowerCase()
          .includes(searchText) ||
        registrationNo
          .toLowerCase()
          .includes(searchText) ||
        rollNo
          .toLowerCase()
          .includes(searchText) ||
        eventName
          .toLowerCase()
          .includes(searchText)
      );
    });

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
  // GET PROFILE PHOTO
  // ======================================================

  const getStudentPhoto = (registration) => {
    return (
      registration.studentId?.photo ||
      registration.studentId?.profilePhoto ||
      ""
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

        <p className="mt-3 text-muted">
          Loading registrations...
        </p>

      </div>
    );
  }

  // ======================================================
  // PAGE
  // ======================================================

  return (
    <div className="bg-light min-vh-100">

      <div className="container-fluid py-5">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="container">

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">

            <div>
              <h2 className="fw-bold mb-1">
                Event Registrations
              </h2>

              <p className="text-muted mb-0">
                Students registered for TechnoZoom events
              </p>
            </div>

            <button
              className="btn btn-outline-primary mt-3 mt-md-0"
              onClick={fetchRegistrations}
            >
              🔄 Refresh
            </button>

          </div>

          {/* ==================================================
              SEARCH + COUNT
          ================================================== */}

          <div className="card border-0 shadow-sm mb-4">

            <div className="card-body">

              <div className="row align-items-center">

                <div className="col-md-8">

                  <label className="form-label fw-semibold">
                    Search Student
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name, email, registration no, roll no or event..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                  />

                </div>

                <div className="col-md-4 mt-3 mt-md-0">

                  <div className="text-md-end">

                    <span className="text-muted">
                      Total Registrations
                    </span>

                    <h3 className="fw-bold text-primary mb-0">
                      {registrations.length}
                    </h3>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ==================================================
            NO DATA
        ================================================== */}

        {registrations.length === 0 ? (

          <div className="container">

            <div className="alert alert-info text-center">
              No students have registered for any event yet.
            </div>

          </div>

        ) : (

          <div className="container-fluid">

            {/* ==================================================
                TABLE
            ================================================== */}

            <div className="card border-0 shadow-sm">

              <div className="table-responsive">

                <table className="table table-hover align-middle mb-0">

                  <thead className="table-dark">

                    <tr>

                      <th className="px-3">
                        #
                      </th>

                      <th>
                        Student
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
                        Event
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Details
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredRegistrations.length === 0 ? (

                      <tr>

                        <td
                          colSpan="11"
                          className="text-center py-5 text-muted"
                        >
                          No registration found for "{search}"
                        </td>

                      </tr>

                    ) : (

                      filteredRegistrations.map(
                        (registration, index) => {

                          const studentName =
                            registration.name ||
                            registration.studentId?.name ||
                            "N/A";

                          const registrationNo =
                            registration.registrationNo ||
                            registration.studentId?.registrationNo ||
                            "N/A";

                          const rollNo =
                            registration.rollNo ||
                            "N/A";

                          const course =
                            registration.course ||
                            "N/A";

                          const branch =
                            registration.branch ||
                            "N/A";

                          const year =
                            registration.year ||
                            "N/A";

                          const semester =
                            registration.semester ||
                            "N/A";

                          const eventName =
                            registration.eventId?.title ||
                            "Event unavailable";

                          const photo =
                            getStudentPhoto(
                              registration
                            );

                          return (

                            <tr
                              key={
                                registration._id
                              }
                            >

                              <td className="px-3">
                                {index + 1}
                              </td>

                              {/* STUDENT */}

                              <td>

                                <div className="d-flex align-items-center gap-2">

                                  {photo ? (

                                    <img
                                      src={photo}
                                      alt={studentName}
                                      style={{
                                        width: "45px",
                                        height: "45px",
                                        objectFit: "cover",
                                        borderRadius: "50%",
                                      }}
                                    />

                                  ) : (

                                    <div
                                      className="bg-secondary text-white d-flex align-items-center justify-content-center"
                                      style={{
                                        width: "45px",
                                        height: "45px",
                                        borderRadius: "50%",
                                        fontSize: "20px",
                                      }}
                                    >
                                      👤
                                    </div>

                                  )}

                                  <div>

                                    <div className="fw-bold">
                                      {studentName}
                                    </div>

                                    <small className="text-muted">
                                      {registration.email ||
                                        registration.studentId?.email ||
                                        "N/A"}
                                    </small>

                                  </div>

                                </div>

                              </td>

                              <td>

                                <span className="badge bg-primary">
                                  {registrationNo}
                                </span>

                              </td>

                              <td>
                                {rollNo}
                              </td>

                              <td>
                                {course}
                              </td>

                              <td>
                                {branch}
                              </td>

                              <td>
                                {year}
                              </td>

                              <td>
                                {semester}
                              </td>

                              <td>

                                <span className="fw-semibold">
                                  {eventName}
                                </span>

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

                                <button
                                  className="btn btn-sm btn-primary"
                                  onClick={() =>
                                    setSelectedRegistration(
                                      registration
                                    )
                                  }
                                >
                                  View Full Details
                                </button>

                              </td>

                            </tr>

                          );
                        }
                      )

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        )}

      </div>

      {/* ======================================================
          DETAILS MODAL
      ====================================================== */}

      {selectedRegistration && (

        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            backgroundColor:
              "rgba(0,0,0,0.6)",
          }}
        >

          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">

            <div className="modal-content">

              {/* ==================================================
                  MODAL HEADER
              ================================================== */}

              <div className="modal-header">

                <div>

                  <h4 className="modal-title fw-bold">
                    Student Details
                  </h4>

                  <small className="text-muted">
                    Complete event registration information
                  </small>

                </div>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() =>
                    setSelectedRegistration(null)
                  }
                ></button>

              </div>

              {/* ==================================================
                  MODAL BODY
              ================================================== */}

              <div className="modal-body">

                {/* ==================================================
                    PROFILE SECTION
                ================================================== */}

                <div className="text-center mb-4">

                  {getStudentPhoto(
                    selectedRegistration
                  ) ? (

                    <img
                      src={getStudentPhoto(
                        selectedRegistration
                      )}
                      alt={
                        selectedRegistration.name ||
                        "Student"
                      }
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        border: "4px solid #dee2e6",
                      }}
                    />

                  ) : (

                    <div
                      className="mx-auto bg-secondary text-white d-flex align-items-center justify-content-center"
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        fontSize: "50px",
                      }}
                    >
                      👤
                    </div>

                  )}

                  <h4 className="fw-bold mt-3 mb-1">

                    {selectedRegistration.name ||
                      selectedRegistration.studentId?.name ||
                      "N/A"}

                  </h4>

                  <p className="text-muted mb-2">

                    {selectedRegistration.email ||
                      selectedRegistration.studentId?.email ||
                      "N/A"}

                  </p>

                  <span className="badge bg-primary">
                    {selectedRegistration.registrationNo ||
                      selectedRegistration.studentId?.registrationNo ||
                      "N/A"}
                  </span>

                </div>

                {/* ==================================================
                    BIO
                ================================================== */}

                <div className="card bg-light border-0 mb-4">

                  <div className="card-body">

                    <h5 className="fw-bold mb-2">
                      About Student
                    </h5>

                    <p className="text-muted mb-0">

                      {selectedRegistration.studentId?.bio
                        ? selectedRegistration.studentId.bio
                        : "No bio added by the student."}

                    </p>

                  </div>

                </div>

                {/* ==================================================
                    STUDENT INFORMATION
                ================================================== */}

                <h5 className="fw-bold mb-3">
                  Student Information
                </h5>

                <div className="table-responsive mb-4">

                  <table className="table table-bordered">

                    <tbody>

                      <tr>

                        <th style={{ width: "35%" }}>
                          Full Name
                        </th>

                        <td>
                          {selectedRegistration.name ||
                            selectedRegistration.studentId?.name ||
                            "N/A"}
                        </td>

                      </tr>

                      <tr>

                        <th>
                          Registration No.
                        </th>

                        <td>
                          {selectedRegistration.registrationNo ||
                            selectedRegistration.studentId?.registrationNo ||
                            "N/A"}
                        </td>

                      </tr>

                      <tr>

                        <th>
                          Roll No.
                        </th>

                        <td>
                          {selectedRegistration.rollNo ||
                            "N/A"}
                        </td>

                      </tr>

                      <tr>

                        <th>
                          Course
                        </th>

                        <td>
                          {selectedRegistration.course ||
                            "N/A"}
                        </td>

                      </tr>

                      <tr>

                        <th>
                          Branch
                        </th>

                        <td>
                          {selectedRegistration.branch ||
                            "N/A"}
                        </td>

                      </tr>

                      <tr>

                        <th>
                          Year
                        </th>

                        <td>
                          {selectedRegistration.year ||
                            "N/A"}
                        </td>

                      </tr>

                      <tr>

                        <th>
                          Semester
                        </th>

                        <td>
                          {selectedRegistration.semester ||
                            "N/A"}
                        </td>

                      </tr>

                      <tr>

                        <th>
                          Mobile
                        </th>

                        <td>
                          {selectedRegistration.mobile ||
                            "N/A"}
                        </td>

                      </tr>

                      <tr>

                        <th>
                          College
                        </th>

                        <td>
                          {selectedRegistration.college ||
                            "N/A"}
                        </td>

                      </tr>

                      <tr>

                        <th>
                          Email
                        </th>

                        <td>
                          {selectedRegistration.email ||
                            selectedRegistration.studentId?.email ||
                            "N/A"}
                        </td>

                      </tr>

                    </tbody>

                  </table>

                </div>

                {/* ==================================================
                    EVENT INFORMATION
                ================================================== */}

                <h5 className="fw-bold mb-3">
                  Event Information
                </h5>

                <div className="table-responsive">

                  <table className="table table-bordered">

                    <tbody>

                      <tr>

                        <th style={{ width: "35%" }}>
                          Event Name
                        </th>

                        <td>
                          {selectedRegistration.eventId?.title ||
                            "Event unavailable"}
                        </td>

                      </tr>

                      <tr>

                        <th>
                          Category
                        </th>

                        <td>
                          {selectedRegistration.eventId?.category ||
                            "N/A"}
                        </td>

                      </tr>

                      <tr>

                        <th>
                          Event Date
                        </th>

                        <td>
                          {selectedRegistration.eventId?.date ||
                            "N/A"}
                        </td>

                      </tr>

                      <tr>

                        <th>
                          Venue
                        </th>

                        <td>
                          {selectedRegistration.eventId?.venue ||
                            "N/A"}
                        </td>

                      </tr>

                      <tr>

                        <th>
                          Registration Status
                        </th>

                        <td>

                          {selectedRegistration.status ===
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

                      </tr>

                      <tr>

                        <th>
                          Registered On
                        </th>

                        <td>
                          {formatDate(
                            selectedRegistration.createdAt
                          )}
                        </td>

                      </tr>

                    </tbody>

                  </table>

                </div>

              </div>

              {/* ==================================================
                  MODAL FOOTER
              ================================================== */}

              <div className="modal-footer">

                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setSelectedRegistration(null)
                  }
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default RegisteredStudents;
