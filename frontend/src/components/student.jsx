import React, { useEffect, useState } from "react";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // API URL
  // ==========================================

  const API_URL = import.meta.env.VITE_API_URL;

  // ==========================================
  // FETCH STUDENTS
  // ==========================================

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      // Check API URL
      if (!API_URL) {
        setError(
          "API URL is not configured. Please check the frontend .env file."
        );
        return;
      }

      const response = await fetch(
        `${API_URL}/api/students`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message || "Unable to fetch students"
        );
        return;
      }

      setStudents(data.students || []);

    } catch (error) {
      console.error(
        "Fetch students error:",
        error
      );

      setError(
        "Unable to connect to server. Please make sure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD STUDENTS
  // ==========================================

  useEffect(() => {
    fetchStudents();
  }, []);

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="container py-5 text-center">

        <div
          className="spinner-border text-primary"
          role="status"
        ></div>

        <p className="mt-3 text-muted">
          Loading students...
        </p>

      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="container py-5">

        <div className="alert alert-danger">
          {error}
        </div>

        <button
          className="btn btn-primary"
          onClick={fetchStudents}
        >
          Try Again
        </button>

      </div>
    );
  }

  // ==========================================
  // MAIN
  // ==========================================

  return (
    <div className="bg-light min-vh-100">

      <div className="container py-5">

        {/* HEADER */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h2 className="fw-bold mb-1">
              Registered Students
            </h2>

            <p className="text-muted mb-0">
              Students who have created an account on TechnoZoom
            </p>

          </div>

          <button
            className="btn btn-outline-primary"
            onClick={fetchStudents}
          >
            Refresh
          </button>

        </div>

        {/* STUDENT COUNT */}

        <div className="alert alert-primary mb-4">

          <strong>Total Students:</strong>{" "}
          {students.length}

        </div>

        {/* NO STUDENTS */}

        {students.length === 0 ? (

          <div className="alert alert-info text-center">
            No students have signed up yet.
          </div>

        ) : (

          /* TABLE */

          <div className="card border-0 shadow-sm">

            <div className="card-header bg-white py-3">

              <h5 className="fw-bold mb-0">
                Student Accounts
              </h5>

            </div>

            <div className="table-responsive">

              <table className="table table-hover align-middle mb-0">

                <thead className="table-dark">

                  <tr>

                    <th>#</th>

                    <th>Student Name</th>

                    <th>Email</th>

                    <th>Registration No.</th>

                    <th>Registered On</th>

                  </tr>

                </thead>

                <tbody>

                  {students.map(
                    (student, index) => (

                      <tr
                        key={
                          student._id || index
                        }
                      >

                        <td>
                          {index + 1}
                        </td>

                        <td className="fw-semibold">
                          {student.name || "N/A"}
                        </td>

                        <td>
                          {student.email || "N/A"}
                        </td>

                        <td>

                          <span className="badge bg-primary">
                            {student.registrationNo ||
                              "N/A"}
                          </span>

                        </td>

                        <td>
                          {formatDate(
                            student.createdAt
                          )}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Students;