import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditRegistration() {
  const navigate = useNavigate();

  const [registration, setRegistration] = useState(null);

  const [formData, setFormData] = useState({
    rollNo: "",
    course: "",
    branch: "",
    year: "",
    semester: "",
    mobile: "",
    college: "",
  });

  const [loading, setLoading] = useState(false);

  // ======================================================
  // LOAD REGISTRATION
  // ======================================================

  useEffect(() => {
    const savedRegistration =
      localStorage.getItem("editRegistration");

    if (!savedRegistration) {
      alert("Registration data not found.");
      navigate("/dashboard");
      return;
    }

    const data = JSON.parse(savedRegistration);

    setRegistration(data);

    setFormData({
      rollNo: data.rollNo || "",
      course: data.course || "",
      branch: data.branch || "",
      year: data.year || "",
      semester: data.semester || "",
      mobile: data.mobile || "",
      college: data.college || "",
    });
  }, [navigate]);

  // ======================================================
  // HANDLE INPUT
  // ======================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ======================================================
  // UPDATE REGISTRATION
  // ======================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!registration?._id) {
      alert("Registration ID not found.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/api/registrations/${registration._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(
          "Registration updated successfully!"
        );

        // Old edit data remove
        localStorage.removeItem(
          "editRegistration"
        );

        // Dashboard par wapas
        navigate("/dashboard");
      } else {
        alert(
          data.message ||
            "Unable to update registration"
        );
      }
    } catch (error) {
      console.log(
        "Update registration error:",
        error
      );

      alert(
        "Unable to connect to server."
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // LOADING / NO DATA
  // ======================================================

  if (!registration) {
    return (
      <div className="container py-5 text-center">

        <div
          className="spinner-border text-primary"
          role="status"
        ></div>

        <p className="text-muted mt-3">
          Loading registration...
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

      <div className="mb-5">

        <h1 className="fw-bold">
          Edit Registration
        </h1>

        <p className="text-muted">
          Update your event registration details.
        </p>

      </div>


      {/* EVENT INFORMATION */}

      <div className="card shadow-sm border-0 mb-4">

        <div className="card-body p-4">

          <h4 className="fw-bold mb-3">
            Event Information
          </h4>

          <div className="row">

            <div className="col-md-6">

              <p className="mb-2">
                <strong>Event:</strong>{" "}
                {registration.eventId?.title ||
                  "Event"}
              </p>

            </div>

            <div className="col-md-6">

              <p className="mb-2">
                <strong>Registration ID:</strong>{" "}
                {registration._id}
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* STUDENT INFORMATION */}

      <div className="card shadow-sm border-0 mb-4">

        <div className="card-body p-4">

          <h4 className="fw-bold mb-4">
            Student Information
          </h4>

          <div className="row">

            <div className="col-md-6 mb-3">

              <label className="form-label fw-semibold">
                Name
              </label>

              <input
                type="text"
                className="form-control"
                value={registration.name || ""}
                disabled
              />

            </div>


            <div className="col-md-6 mb-3">

              <label className="form-label fw-semibold">
                Registration Number
              </label>

              <input
                type="text"
                className="form-control"
                value={
                  registration.registrationNo ||
                  ""
                }
                disabled
              />

            </div>


            <div className="col-md-6 mb-3">

              <label className="form-label fw-semibold">
                Email
              </label>

              <input
                type="email"
                className="form-control"
                value={registration.email || ""}
                disabled
              />

            </div>


            <div className="col-md-6 mb-3">

              <label className="form-label fw-semibold">
                Roll Number
              </label>

              <input
                type="text"
                className="form-control"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                required
              />

            </div>

          </div>

        </div>

      </div>


      {/* EDITABLE DETAILS */}

      <div className="card shadow-sm border-0 mb-4">

        <div className="card-body p-4">

          <h4 className="fw-bold mb-4">
            Academic & Contact Details
          </h4>

          <form onSubmit={handleSubmit}>

            <div className="row">

              {/* COURSE */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Course
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="course"
                  placeholder="Example: B.Tech"
                  value={formData.course}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* BRANCH */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Branch
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="branch"
                  placeholder="Example: CSE"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* YEAR */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Year
                </label>

                <select
                  className="form-select"
                  name="year"
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
                  Semester
                </label>

                <select
                  className="form-select"
                  name="semester"
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


              {/* MOBILE */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Mobile
                </label>

                <input
                  type="tel"
                  className="form-control"
                  name="mobile"
                  placeholder="Enter mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* COLLEGE */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  College
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="college"
                  placeholder="Enter college name"
                  value={formData.college}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* BUTTONS */}

            <div className="d-flex gap-2 mt-4">

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >

                {loading
                  ? "Updating..."
                  : "Update Registration"}

              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>
                  navigate("/dashboard")
                }
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditRegistration;


