
import React, { useEffect, useState } from "react";

function NoticeManager() {
  const [notices, setNotices] = useState([]);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  // ======================================================
  // LOAD NOTICES FROM MONGODB
  // ======================================================

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notices`
      );

      const data = await response.json();

      if (data.success) {
        setNotices(data.notices || []);
      } else {
        alert(data.message || "Unable to fetch notices");
      }
    } catch (error) {
      console.log("Fetch notices error:", error);

      alert(
        "Unable to connect to server. Make sure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // ADD NOTICE
  // ======================================================

  const handleAddNotice = async (e) => {
    e.preventDefault();

    if (!title.trim() || !message.trim()) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notices`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            title,
            message,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Notice added successfully!");

        setTitle("");
        setMessage("");

        fetchNotices();
      } else {
        alert(
          data.message || "Unable to add notice"
        );
      }
    } catch (error) {
      console.log("Add notice error:", error);

      alert(
        "Unable to connect to server."
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // DELETE NOTICE
  // ======================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notices/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Notice deleted successfully!");

        fetchNotices();
      } else {
        alert(
          data.message || "Unable to delete notice"
        );
      }
    } catch (error) {
      console.log("Delete notice error:", error);

      alert(
        "Unable to connect to server."
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // FORMAT DATE
  // ======================================================

  const formatDate = (date) => {
    if (!date) {
      return "Date not available";
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
  // PAGE
  // ======================================================

  return (
    <div className="container py-5">

      <div className="mb-5">

        <h1 className="fw-bold">
          Manage Notices
        </h1>

        <p className="text-muted">
          Add and manage important announcements
          for TechnoZoom students.
        </p>

      </div>

      {/* ADD NOTICE */}

      <div className="card shadow-sm border-0 mb-5">

        <div className="card-body p-4">

          <h3 className="fw-bold mb-4">
            Add New Notice
          </h3>

          <form onSubmit={handleAddNotice}>

            <div className="mb-3">

              <label className="form-label fw-semibold">
                Notice Title
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter notice title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />

            </div>

            <div className="mb-4">

              <label className="form-label fw-semibold">
                Notice Message
              </label>

              <textarea
                className="form-control"
                rows="5"
                placeholder="Enter notice details"
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
              ></textarea>

            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : "Add Notice"}
            </button>

          </form>

        </div>

      </div>

      {/* ALL NOTICES */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h3 className="fw-bold mb-1">
            All Notices
          </h3>

          <p className="text-muted mb-0">
            Notices stored in MongoDB
          </p>

        </div>

        <span className="badge bg-primary fs-6">
          {notices.length} Notices
        </span>

      </div>

      {loading && notices.length === 0 && (

        <div className="text-center py-5">

          <div
            className="spinner-border text-primary"
            role="status"
          ></div>

          <p className="text-muted mt-3">
            Loading notices...
          </p>

        </div>

      )}

      {!loading && notices.length === 0 && (

        <div className="alert alert-info">

          No notices available yet.

        </div>

      )}

      {notices.length > 0 && (

        <div className="row g-4">

          {notices.map((notice) => (

            <div
              className="col-md-6"
              key={notice._id}
            >

              <div className="card shadow-sm border-0 h-100">

                <div className="card-body p-4">

                  <h4 className="fw-bold">
                    {notice.title}
                  </h4>

                  <p className="text-muted">
                    {notice.message}
                  </p>

                  <small className="text-secondary">

                    Posted on:{" "}

                    {formatDate(
                      notice.createdAt
                    )}

                  </small>

                  <div className="mt-4">

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleDelete(
                          notice._id
                        )
                      }
                      disabled={loading}
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default NoticeManager;
