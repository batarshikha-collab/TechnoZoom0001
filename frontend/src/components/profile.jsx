import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    course: "",
    branch: "",
    year: "",
    mobile: "",
    college: "",
    profilePhoto: "",
  });

  // ======================================================
  // LOAD PROFILE
  // ======================================================

  useEffect(() => {
    const savedStudent = localStorage.getItem("student");

    if (!savedStudent) {
      navigate("/login");
      return;
    }

    const loggedInStudent = JSON.parse(savedStudent);

    if (!loggedInStudent.id) {
      navigate("/login");
      return;
    }

    fetchProfile(loggedInStudent.id);
  }, [navigate]);

  // ======================================================
  // FETCH PROFILE FROM MONGODB
  // ======================================================

  const fetchProfile = async (studentId) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/students/${studentId}`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(
          data.message ||
            "Unable to load profile"
        );

        return;
      }

      const profile = data.student;

      setStudent(profile);

      setFormData({
        name: profile.name || "",
        bio: profile.bio || "",
        course: profile.course || "",
        branch: profile.branch || "",
        year: profile.year || "",
        mobile: profile.mobile || "",
        college: profile.college || "",
        profilePhoto: profile.profilePhoto || "",
      });
    } catch (error) {
      console.log(
        "Profile fetch error:",
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
  // HANDLE INPUT
  // ======================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ======================================================
  // UPDATE PHOTO
  // ======================================================

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // Image check
    if (!file.type.startsWith("image/")) {
      alert(
        "Please select an image file."
      );

      return;
    }

    // Size check - 2 MB
    if (file.size > 2 * 1024 * 1024) {
      alert(
        "Image size should be less than 2 MB."
      );

      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((previous) => ({
        ...previous,
        profilePhoto: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  // ======================================================
  // REMOVE PHOTO
  // ======================================================

  const handleRemovePhoto = async () => {
    if (!student?.id && !student?._id) {
      return;
    }

    const confirmRemove =
      window.confirm(
        "Are you sure you want to remove your profile photo?"
      );

    if (!confirmRemove) {
      return;
    }

    try {
      const studentId =
        student.id || student._id;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/students/${studentId}/photo`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(
          data.message ||
            "Unable to remove photo"
        );

        return;
      }

      setStudent(data.student);

      setFormData((previous) => ({
        ...previous,
        profilePhoto: "",
      }));

      // Update localStorage
      const savedStudent =
        JSON.parse(
          localStorage.getItem("student")
        ) || {};

      localStorage.setItem(
        "student",
        JSON.stringify({
          ...savedStudent,
          ...data.student,
          id:
            data.student._id ||
            savedStudent.id,
        })
      );

      alert(
        "Profile photo removed successfully!"
      );
    } catch (error) {
      console.log(
        "Remove photo error:",
        error
      );

      alert(
        "Unable to connect to server."
      );
    }
  };

  // ======================================================
  // SAVE PROFILE
  // ======================================================

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Name is required.");
      return;
    }

    try {
      setSaving(true);

      const studentId =
        student.id || student._id;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/students/${studentId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(
          data.message ||
            "Unable to update profile"
        );

        return;
      }

      const updatedStudent =
        data.student;

      setStudent(updatedStudent);

      setFormData({
        name:
          updatedStudent.name || "",
        bio:
          updatedStudent.bio || "",
        course:
          updatedStudent.course || "",
        branch:
          updatedStudent.branch || "",
        year:
          updatedStudent.year || "",
        mobile:
          updatedStudent.mobile || "",
        college:
          updatedStudent.college || "",
        profilePhoto:
          updatedStudent.profilePhoto ||
          "",
      });

      // Update localStorage
      const savedStudent =
        JSON.parse(
          localStorage.getItem("student")
        ) || {};

      localStorage.setItem(
        "student",
        JSON.stringify({
          ...savedStudent,
          ...updatedStudent,
          id:
            updatedStudent._id ||
            savedStudent.id,
        })
      );

      setIsEditing(false);

      alert(
        "Profile updated successfully!"
      );
    } catch (error) {
      console.log(
        "Update profile error:",
        error
      );

      alert(
        "Unable to connect to server."
      );
    } finally {
      setSaving(false);
    }
  };

  // ======================================================
  // CANCEL EDITING
  // ======================================================

  const handleCancelEdit = () => {
    if (!student) {
      return;
    }

    setFormData({
      name: student.name || "",
      bio: student.bio || "",
      course: student.course || "",
      branch: student.branch || "",
      year: student.year || "",
      mobile: student.mobile || "",
      college: student.college || "",
      profilePhoto:
        student.profilePhoto || "",
    });

    setIsEditing(false);
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
          Loading your profile...
        </p>

      </div>
    );
  }

  // ======================================================
  // PROFILE NOT FOUND
  // ======================================================

  if (!student) {
    return (
      <div className="container py-5">

        <div className="alert alert-danger">
          Profile could not be loaded.
        </div>

        <button
          className="btn btn-primary"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Back to Dashboard
        </button>

      </div>
    );
  }

  // ======================================================
  // PAGE
  // ======================================================

  return (
    <div
      className="container py-5"
      style={{
        maxWidth: "1100px",
      }}
    >

      {/* ==================================================
          BACK BUTTON
      ================================================== */}

      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() =>
          navigate("/dashboard")
        }
      >
        ← Back to Dashboard
      </button>


      {/* ==================================================
          PROFILE HEADER
      ================================================== */}

      <div className="card shadow border-0 overflow-hidden mb-4">

        <div
          className="bg-primary"
          style={{
            height: "150px",
          }}
        ></div>

        <div className="card-body px-4 pb-4">

          <div
            className="d-flex flex-column flex-md-row align-items-center align-items-md-end"
            style={{
              marginTop: "-80px",
            }}
          >

            {/* PROFILE PHOTO */}

            <div className="text-center">

              {formData.profilePhoto ? (

                <img
                  src={formData.profilePhoto}
                  alt="Profile"
                  className="rounded-circle border border-5 border-white shadow"
                  style={{
                    width: "160px",
                    height: "160px",
                    objectFit: "cover",
                  }}
                />

              ) : (

                <div
                  className="rounded-circle bg-light border border-5 border-white shadow d-flex align-items-center justify-content-center"
                  style={{
                    width: "160px",
                    height: "160px",
                    fontSize: "55px",
                  }}
                >
                  👤
                </div>

              )}

            </div>


            {/* NAME */}

            <div className="ms-md-4 mt-3 mt-md-0 flex-grow-1">

              <h1 className="fw-bold mb-1">
                {student.name}
              </h1>

              <p className="text-muted mb-1">
                {student.course ||
                  "Computer Science Student"}

                {student.branch
                  ? ` • ${student.branch}`
                  : ""}
              </p>

              <p className="text-muted mb-0">
                {student.college ||
                  "College information not added"}
              </p>

            </div>


            {/* EDIT BUTTON */}

            {!isEditing && (

              <button
                className="btn btn-primary mt-3 mt-md-0"
                onClick={() =>
                  setIsEditing(true)
                }
              >
                ✏️ Edit Profile
              </button>

            )}

          </div>


          {/* PHOTO BUTTONS */}

          <div className="mt-4 ms-md-3">

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handlePhotoChange}
              style={{
                display: "none",
              }}
            />

            <button
              className="btn btn-outline-primary btn-sm me-2"
              onClick={() =>
                fileInputRef.current.click()
              }
            >
              📸 Update Photo
            </button>

            {formData.profilePhoto && (

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleRemovePhoto}
              >
                🗑️ Remove Photo
              </button>

            )}

            <small className="text-muted ms-2">
              Optional • JPG, PNG • Max 2MB
            </small>

          </div>

        </div>

      </div>


      {/* ==================================================
          EDIT FORM
      ================================================== */}

      {isEditing ? (

        <form
          onSubmit={handleSaveProfile}
        >

          {/* ABOUT */}

          <div className="card shadow-sm border-0 mb-4">

            <div className="card-body p-4">

              <h3 className="fw-bold mb-4">
                About Me
              </h3>

              <label className="form-label fw-semibold">
                Bio
              </label>

              <textarea
                name="bio"
                className="form-control"
                rows="5"
                placeholder="Write something about yourself, your interests, skills and career goals..."
                value={formData.bio}
                onChange={handleChange}
              ></textarea>

              <div className="form-text">
                Tell others about your interests,
                skills and goals.
              </div>

            </div>

          </div>


          {/* PERSONAL INFORMATION */}

          <div className="card shadow-sm border-0 mb-4">

            <div className="card-body p-4">

              <h3 className="fw-bold mb-4">
                Personal Information
              </h3>

              <div className="row g-3">

                {/* NAME */}

                <div className="col-md-6">

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


                {/* EMAIL */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    value={student.email}
                    disabled
                  />

                  <div className="form-text">
                    Email cannot be changed.
                  </div>

                </div>


                {/* REGISTRATION */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Registration No.
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={
                      student.registrationNo ||
                      ""
                    }
                    disabled
                  />

                </div>


                {/* COURSE */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Course
                  </label>

                  <input
                    type="text"
                    name="course"
                    className="form-control"
                    placeholder="e.g. B.Tech"
                    value={formData.course}
                    onChange={handleChange}
                  />

                </div>


                {/* BRANCH */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Branch
                  </label>

                  <input
                    type="text"
                    name="branch"
                    className="form-control"
                    placeholder="e.g. Computer Science & Engineering"
                    value={formData.branch}
                    onChange={handleChange}
                  />

                </div>


                {/* YEAR */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Year
                  </label>

                  <select
                    name="year"
                    className="form-select"
                    value={formData.year}
                    onChange={handleChange}
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


                {/* MOBILE */}

                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Mobile
                  </label>

                  <input
                    type="tel"
                    name="mobile"
                    className="form-control"
                    placeholder="Enter mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                  />

                </div>


                {/* COLLEGE */}

                <div className="col-md-6">

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
                  />

                </div>

              </div>

            </div>

          </div>


          {/* SAVE / CANCEL */}

          <div className="d-flex gap-2 mb-5">

            <button
              type="submit"
              className="btn btn-primary px-4"
              disabled={saving}
            >

              {saving ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>

                  Saving...
                </>
              ) : (
                "💾 Save Changes"
              )}

            </button>

            <button
              type="button"
              className="btn btn-outline-secondary px-4"
              onClick={handleCancelEdit}
              disabled={saving}
            >
              Cancel
            </button>

          </div>

        </form>

      ) : (

        <>

          {/* ==================================================
              ABOUT SECTION
          ================================================== */}

          <div className="card shadow-sm border-0 mb-4">

            <div className="card-body p-4">

              <h3 className="fw-bold mb-3">
                About Me
              </h3>

              {student.bio ? (

                <p
                  className="text-muted mb-0"
                  style={{
                    whiteSpace: "pre-wrap",
                    lineHeight: "1.8",
                  }}
                >
                  {student.bio}
                </p>

              ) : (

                <p className="text-muted mb-0">
                  No bio added yet. Click
                  <strong> Edit Profile </strong>
                  to add something about yourself.
                </p>

              )}

            </div>

          </div>


          {/* ==================================================
              INFORMATION
          ================================================== */}

          <div className="card shadow-sm border-0 mb-5">

            <div className="card-body p-4">

              <h3 className="fw-bold mb-4">
                Personal Information
              </h3>

              <div className="row g-4">

                <InfoItem
                  label="Full Name"
                  value={student.name}
                />

                <InfoItem
                  label="Email"
                  value={student.email}
                />

                <InfoItem
                  label="Registration No."
                  value={student.registrationNo}
                />

                <InfoItem
                  label="Course"
                  value={student.course}
                />

                <InfoItem
                  label="Branch"
                  value={student.branch}
                />

                <InfoItem
                  label="Year"
                  value={student.year}
                />

                <InfoItem
                  label="Mobile"
                  value={student.mobile}
                />

                <InfoItem
                  label="College"
                  value={student.college}
                />

              </div>

            </div>

          </div>

        </>

      )}

    </div>
  );
}

// ======================================================
// INFO ITEM
// ======================================================

function InfoItem({
  label,
  value,
}) {
  return (
    <div className="col-md-6">

      <div className="border rounded p-3 h-100">

        <small className="text-muted d-block mb-1">
          {label}
        </small>

        <strong>
          {value || "Not added yet"}
        </strong>

      </div>

    </div>
  );
}

export default Profile;