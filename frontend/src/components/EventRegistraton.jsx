
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EventRegistration() {
  const navigate = useNavigate();
  const location = useLocation();

  // ======================================================
  // API URL
  // ======================================================

  const API_URL = import.meta.env.VITE_API_URL;

  // ======================================================
  // EVENT
  // ======================================================

  const event = location.state?.event;

  // ======================================================
  // LOGGED-IN STUDENT
  // ======================================================

  let student = null;

  try {
    student = JSON.parse(
      localStorage.getItem("student") || "null"
    );
  } catch (error) {
    console.error("Student data error:", error);
    student = null;
  }

  // ======================================================
  // FORM DATA
  // ======================================================

  const [formData, setFormData] = useState({
    name: student?.name || "",
    registrationNo:
      student?.registrationNo || "",
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

  // ======================================================
  // HANDLE INPUT CHANGE
  // ======================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
  };

  // ======================================================
  // SUBMIT REGISTRATION
  // ======================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // ----------------------------------------------------
    // CHECK LOGIN
    // ----------------------------------------------------

    if (!student) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    // ----------------------------------------------------
    // CHECK EVENT
    // ----------------------------------------------------

    if (!event?._id) {
      setError(
        "Event information is missing. Please go back to Events and select the event again."
      );
      return;
    }

    // ----------------------------------------------------
    // CHECK API URL
    // ----------------------------------------------------

    if (!API_URL) {
      setError(
        "API URL is not configured. Please check the frontend .env file."
      );
      return;
    }

    // ----------------------------------------------------
    // GET STUDENT ID
    // ----------------------------------------------------

    const studentId =
      student._id ||
      student.id ||
      student.studentId ||
      null;

    if (!studentId) {
      setError(
        "Student ID not found. Please logout and login again."
      );
      return;
    }

    // ----------------------------------------------------
    // MOBILE VALIDATION
    // ----------------------------------------------------

    const mobile = formData.mobile.trim();

    if (!/^[0-9]{10}$/.test(mobile)) {
      setError(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    // ----------------------------------------------------
    // SUBMIT
    // ----------------------------------------------------

    try {
      setLoading(true);

      const registrationData = {
        studentId: studentId,
        eventId: event._id,

        name: formData.name.trim(),
        registrationNo:
          formData.registrationNo.trim(),
        rollNo: formData.rollNo.trim(),
        course: formData.course.trim(),
        branch: formData.branch.trim(),
        year: formData.year,
        semester: formData.semester,
        mobile: mobile,
        college: formData.college.trim(),
        email: formData.email.trim(),
      };

      console.log(
        "Sending registration:",
        registrationData
      );

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

      console.log(
        "Registration response:",
        data
      );

      // ----------------------------------------------------
      // SERVER ERROR
      // ----------------------------------------------------

      if (!response.ok || !data.success) {
        setError(
          data.message ||
            "Registration failed. Please try again."
        );
        return;
      }

      // ----------------------------------------------------
      // SUCCESS
      // ----------------------------------------------------

      alert(
        "Event registration successful!"
      );

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

  // ======================================================
  // EVENT NOT FOUND
  // ======================================================

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

  // ======================================================
  // PAGE
  // ======================================================

  return (
    <div className="bg-light min-vh-100">

      <div className="container py-5">

        <div className="row justify-content-center">

          <div className="col-lg-9">

            {/* ==================================================
                EVENT INFORMATION
            ================================================== */}

            <div className="card border-0 shadow-sm mb-4">

              <div className="card-body p-4">

                <h2 className="fw-bold mb-3">
                  {event.title || "Event"}
                </h2>

                <p className="text-muted">
                  {event.description ||
                    "No description available."}
                </p>

                <div className="row">

                  {/* CATEGORY */}

                  <div className="col-md-4 mb-3 mb-md-0">

                    <strong>
                      Category:
                    </strong>

                    <p className="mb-0">
                      {event.category || "N/A"}
                    </p>

                  </div>

                  {/* DATE */}

                  <div className="col-md-4 mb-3 mb-md-0">

                    <strong>
                      Date:
                    </strong>

                    <p className="mb-0">
                      {event.date || "N/A"}
                    </p>

                  </div>

                  {/* VENUE */}

                  <div className="col-md-4">

                    <strong>
                      Venue:
                    </strong>

                    <p className="mb-0">
                      {event.venue || "N/A"}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* ==================================================
                REGISTRATION FORM
            ================================================== */}

            <div className="card border-0 shadow-sm">

              <div className="card-body p-4 p-md-5">

                <h3 className="fw-bold mb-1">
                  Student Registration
                </h3>

                <p className="text-muted mb-4">
                  Fill in your details to register
                  for this event.
                </p>

                {/* ERROR */}

                {error && (
                  <div
                    className="alert alert-danger"
                    role="alert"
                  >
                    {error}
                  </div>
                )}

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
                        placeholder="10-digit mobile number"
                        value={formData.mobile}
                        onChange={handleChange}
                        maxLength="10"
                        pattern="[0-9]{10}"
                        inputMode="numeric"
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
                        value={
                          formData.registrationNo
                        }
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

                        <option value="1">
                          1st Semester
                        </option>

                        <option value="2">
                          2nd Semester
                        </option>

                        <option value="3">
                          3rd Semester
                        </option>

                        <option value="4">
                          4th Semester
                        </option>

                        <option value="5">
                          5th Semester
                        </option>

                        <option value="6">
                          6th Semester
                        </option>

                        <option value="7">
                          7th Semester
                        </option>

                        <option value="8">
                          8th Semester
                        </option>

                      </select>

                    </div>

                  </div>

                  {/* ==================================================
                      EVENT SUMMARY
                  ================================================== */}

                  <div className="alert alert-primary mt-3">

                    <h6 className="fw-bold">
                      Event Summary
                    </h6>

                    <p className="mb-1">
                      <strong>Event:</strong>{" "}
                      {event.title || "N/A"}
                    </p>

                    <p className="mb-1">
                      <strong>Date:</strong>{" "}
                      {event.date || "N/A"}
                    </p>

                    <p className="mb-0">
                      <strong>Venue:</strong>{" "}
                      {event.venue || "N/A"}
                    </p>

                  </div>

                  {/* ==================================================
                      SUBMIT BUTTON
                  ================================================== */}

                  <button
                    type="submit"
                    className="btn btn-primary w-100 mt-3"
                    disabled={loading}
                  >

                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>

                        Registering...
                      </>
                    ) : (
                      "Register for Event"
                    )}

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
