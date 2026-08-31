import React, { useEffect, useState } from "react";

function StudentManager() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ======================================================
  // GET ALL STUDENTS FROM BACKEND
  // ======================================================

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/students"
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
      console.error("Fetch students error:", error);

      setError(
        "Unable to connect to server. Please make sure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // LOAD STUDENTS
  // ======================================================

  useEffect(() => {
    fetchStudents();
  }, []);

  // ======================================================
  // DELETE STUDENT
  // ======================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/students/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(
          data.message || "Unable to delete student"
        );
        return;
      }

      alert("Student deleted successfully!");

      fetchStudents();
    } catch (error) {
      console.error("Delete student error:", error);

      alert(
        "Unable to connect to server. Please make sure backend is running."
      );
    }
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
          Loading students...
        </p>

      </div>
    );
  }

  // ======================================================
  // PAGE
  // ======================================================

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
              Students who created an account on TechnoZoom
            </p>
          </div>

          <button
            className="btn btn-outline-primary"
            onClick={fetchStudents}
          >
            Refresh
          </button>

        </div>

        {/* ERROR */}

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {/* NO STUDENTS */}

        {!error && students.length === 0 ? (

          <div className="alert alert-info">
            No students registered yet.
          </div>

        ) : (

          /* STUDENT TABLE */

          <div className="card border-0 shadow-sm">

            <div className="card-body">

              <div className="table-responsive">

                <table className="table table-hover align-middle">

                  <thead className="table-dark">

                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Registration No.</th>
                      <th>Registered On</th>
                      <th>Action</th>
                    </tr>

                  </thead>

                  <tbody>

                    {students.map(
                      (student, index) => (

                        <tr key={student._id}>

                          <td>
                            {index + 1}
                          </td>

                          <td className="fw-semibold">
                            {student.name}
                          </td>

                          <td>
                            {student.email}
                          </td>

                          <td>
                            <span className="badge bg-primary">
                              {student.registrationNo}
                            </span>
                          </td>

                          <td>
                            {student.createdAt
                              ? new Date(
                                  student.createdAt
                                ).toLocaleDateString()
                              : "N/A"}
                          </td>

                          <td>

                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() =>
                                handleDelete(
                                  student._id
                                )
                              }
                            >
                              Delete
                            </button>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default StudentManager;