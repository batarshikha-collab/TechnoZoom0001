import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EventRegistration() {
  const navigate = useNavigate();
  const location = useLocation();

  // ==========================================
  // EVENT
  // ==========================================

  const event = location.state?.event;

  // ==========================================
  // LOGGED-IN STUDENT
  // ==========================================

  const student =
    JSON.parse(localStorage.getItem("student")) || null;

  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({
    name: student?.name || "",
    registrationNo: student?.registrationNo || "",
    rollNo: "",
    course: "",
    branch: "",
    year: "",
    semester: "",
    mobile: "",
    college: "",
    email: student?.email || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // HANDLE CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // SUBMIT REGISTRATION
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Login check
    if (!student) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    // Event check
    if (!event || !event._id) {
      setError(
        "Event information is missing. Please go back to Events and select the event again."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/registrations",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            // Student ID
            studentId: student.id,

            // Event ID
            eventId: event._id,

            // Student information
            name: formData.name,
            registrationNo: formData.registrationNo,
            rollNo: formData.rollNo,
            course: formData.course,
            branch: formData.branch,
            year: formData.year,
            semester: formData.semester,
            mobile: formData.mobile,
            college: formData.college,
            email: formData.email,
          }),
        }
      );

      const data = await response.json();

      // Backend error
      if (!response.ok || !data.success) {
        setError(
          data.message || "Registration failed."
        );
        return;
      }

      // Success
      alert(
        "Event registration successful!"
      );

      // Dashboard par wapas
      navigate("/dashboard");

    } catch (error) {
      console.error(
        "Registration error:",
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
  // EVENT NOT FOUND
  // ==========================================

  if (!event) {
    return (
      <div className="container py-5">

        <div className="alert alert-danger">

          <h5 className="fw-bold">
            Event information not found.
          </h5>

          <p className="mb-0">
            Please go back to Events and click
            "Register for Event" again.
          </p>

        </div>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/events")}
        >
          Back to Events
        </button>

      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="bg-light min-vh-100">

      <div className="container py-5">

        <div className="row justify-content-center">

          <div className="col-lg-9">

            {/* EVENT INFORMATION */}

            <div className="card border-0 shadow-sm mb-4">

              <div className="card-body p-4">

                <h2 className="fw-bold mb-3">
                  {event.title}
                </h2>

                <p className="text-muted">
                  {event.description}
                </p>

                <div className="row">

                  <div className="col-md-4">
                    <strong>Category:</strong>
                    <p>{event.category}</p>
                  </div>

                  <div className="col-md-4">
                    <strong>Date:</strong>
                    <p>{event.date}</p>
                  </div>

                  <div className="col-md-4">
                    <strong>Venue:</strong>
                    <p>{event.venue}</p>
                  </div>

                </div>

              </div>

            </div>

            {/* REGISTRATION FORM */}

            <div className="card border-0 shadow-sm">

              <div className="card-body p-4 p-md-5">

                <h3 className="fw-bold mb-1">
                  Student Registration
                </h3>

                <p className="text-muted mb-4">
                  Fill your details to register for
                  this event.
                </p>

                {/* ERROR */}

                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>

                  {/* NAME */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* REGISTRATION NUMBER */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Registration No.
                    </label>

                    <input
                      type="text"
                      name="registrationNo"
                      className="form-control"
                      value={formData.registrationNo}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* ROLL NUMBER */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Roll No.
                    </label>

                    <input
                      type="text"
                      name="rollNo"
                      className="form-control"
                      placeholder="Enter roll number"
                      value={formData.rollNo}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* COURSE + BRANCH */}

                  <div className="row">

                    <div className="col-md-6 mb-3">

                      <label className="form-label fw-semibold">
                        Course
                      </label>

                      <input
                        type="text"
                        name="course"
                        className="form-control"
                        placeholder="B.Tech"
                        value={formData.course}
                        onChange={handleChange}
                        required
                      />

                    </div>

                    <div className="col-md-6 mb-3">

                      <label className="form-label fw-semibold">
                        Branch
                      </label>

                      <input
                        type="text"
                        name="branch"
                        className="form-control"
                        placeholder="CSE"
                        value={formData.branch}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                  {/* YEAR + SEMESTER */}

                  <div className="row">

                    <div className="col-md-6 mb-3">

                      <label className="form-label fw-semibold">
                        Year
                      </label>

                      <select
                        name="year"
                        className="form-select"
                        value={formData.year}
                        onChange={handleChange}
                        required
                      >

                        <option value="">
                          Select Year
                        </option>

                        <option value="1">
                          1st Year
                        </option>

                        <option value="2">
                          2nd Year
                        </option>

                        <option value="3">
                          3rd Year
                        </option>

                        <option value="4">
                          4th Year
                        </option>

                      </select>

                    </div>

                    <div className="col-md-6 mb-3">

                      <label className="form-label fw-semibold">
                        Semester
                      </label>

                      <select
                        name="semester"
                        className="form-select"
                        value={formData.semester}
                        onChange={handleChange}
                        required
                      >

                        <option value="">
                          Select Semester
                        </option>

                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>

                      </select>

                    </div>

                  </div>

                  {/* MOBILE */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Mobile Number
                    </label>

                    <input
                      type="tel"
                      name="mobile"
                      className="form-control"
                      placeholder="Enter mobile number"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* COLLEGE */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      College
                    </label>

                    <input
                      type="text"
                      name="college"
                      className="form-control"
                      placeholder="Enter college name"
                      value={formData.college}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* EMAIL */}

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >

                    {loading
                      ? "Registering..."
                      : "Register for Event"}

                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EventRegistration;