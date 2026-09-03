
import React, { useState } from "react";

function RegisterStudent({ event, onSuccess }) {
  const API_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    registrationNo: "",
    rollNo: "",
    course: "",
    branch: "",
    year: "",
    semester: "",
    mobile: "",
    college: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  // ======================================================
  // HANDLE INPUT
  // ======================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ======================================================
  // SUBMIT REGISTRATION
  // ======================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!API_URL) {
      alert(
        "API URL is not configured. Please check your frontend .env file."
      );
      return;
    }

    if (!event?._id) {
      alert("Event information is missing.");
      return;
    }

    try {
      setLoading(true);

      const loggedInStudent = JSON.parse(
        localStorage.getItem("student") || "null"
      );

      const studentId =
        loggedInStudent?._id ||
        loggedInStudent?.id ||
        null;

      if (!studentId) {
        alert("Please login before registering for an event.");
        return;
      }

      const registrationData = {
        studentId,
        eventId: event._id,

        name: formData.name.trim(),
        registrationNo: formData.registrationNo.trim(),
        rollNo: formData.rollNo.trim(),
        course: formData.course.trim(),
        branch: formData.branch.trim(),
        year: formData.year.trim(),
        semester: formData.semester.trim(),
        mobile: formData.mobile.trim(),
        college: formData.college.trim(),
        email: formData.email.trim(),
      };

      const response = await fetch(
        `${API_URL}/api/registrations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(
          data.message ||
            "Unable to register for the event."
        );
        return;
      }

      alert(
        "Registration successful! You are registered for this event."
      );

      setFormData({
        name: "",
        registrationNo: "",
        rollNo: "",
        course: "",
        branch: "",
        year: "",
        semester: "",
        mobile: "",
        college: "",
        email: "",
      });

      if (onSuccess) {
        onSuccess(data.registration);
      }
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      alert(
        "Unable to connect to server. Please make sure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // PAGE
  // ======================================================

  return (
    <div className="container py-4">

      <div className="card border-0 shadow-sm">

        <div className="card-body p-4">

          <h3 className="fw-bold mb-1">
            Event Registration
          </h3>

          <p className="text-muted mb-4">
            {event?.title
              ? `Register for ${event.title}`
              : "Fill in your details to register"}
          </p>

          <form onSubmit={handleSubmit}>

            {/* ==================================================
                PERSONAL INFORMATION
            ================================================== */}

            <h5 className="fw-bold mb-3">
              Personal Information
            </h5>

            <div className="row">

              {/* NAME */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Full Name *
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* EMAIL */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Email *
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* MOBILE */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Mobile Number *
                </label>

                <input
                  type="tel"
                  name="mobile"
                  className="form-control"
                  placeholder="Enter mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  maxLength="10"
                  required
                />

              </div>

              {/* COLLEGE */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  College *
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

            </div>

            <hr className="my-4" />

            {/* ==================================================
                ACADEMIC INFORMATION
            ================================================== */}

            <h5 className="fw-bold mb-3">
              Academic Information
            </h5>

            <div className="row">

              {/* REGISTRATION NUMBER */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Registration No. *
                </label>

                <input
                  type="text"
                  name="registrationNo"
                  className="form-control"
                  placeholder="Enter registration number"
                  value={formData.registrationNo}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* ROLL NUMBER */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Roll No. *
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

              {/* COURSE */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Course *
                </label>

                <input
                  type="text"
                  name="course"
                  className="form-control"
                  placeholder="Example: B.Tech"
                  value={formData.course}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* BRANCH */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Branch *
                </label>

                <input
                  type="text"
                  name="branch"
                  className="form-control"
                  placeholder="Example: CSE"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* YEAR */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Year *
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

                  <option value="1st Year">
                    1st Year
                  </option>

                  <option value="2nd Year">
                    2nd Year
                  </option>

                  <option value="3rd Year">
                    3rd Year
                  </option>

                  <option value="4th Year">
                    4th Year
                  </option>

                </select>

              </div>

              {/* SEMESTER */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Semester *
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

                  <option value="1st Semester">
                    1st Semester
                  </option>

                  <option value="2nd Semester">
                    2nd Semester
                  </option>

                  <option value="3rd Semester">
                    3rd Semester
                  </option>

                  <option value="4th Semester">
                    4th Semester
                  </option>

                  <option value="5th Semester">
                    5th Semester
                  </option>

                  <option value="6th Semester">
                    6th Semester
                  </option>

                  <option value="7th Semester">
                    7th Semester
                  </option>

                  <option value="8th Semester">
                    8th Semester
                  </option>

                </select>

              </div>

            </div>

            {/* ==================================================
                EVENT INFORMATION
            ================================================== */}

            {event && (

              <div className="alert alert-primary mt-3">

                <strong>
                  Event:
                </strong>{" "}
                {event.title}

                {event.date && (
                  <>
                    <br />

                    <strong>
                      Date:
                    </strong>{" "}
                    {event.date}
                  </>
                )}

                {event.venue && (
                  <>
                    <br />

                    <strong>
                      Venue:
                    </strong>{" "}
                    {event.venue}
                  </>
                )}

              </div>

            )}

            {/* ==================================================
                SUBMIT
            ================================================== */}

            <div className="d-flex justify-content-end mt-4">

              <button
                type="submit"
                className="btn btn-primary px-4"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>

                    Registering...
                  </>
                ) : (
                  "Register for Event"
                )}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default RegisterStudent;
