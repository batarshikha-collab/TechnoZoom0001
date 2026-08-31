import React, { useEffect, useState } from "react";

function NoticeBoard() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/notices"
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Unable to fetch notices");
        return;
      }

      setNotices(data.notices || []);
    } catch (error) {
      console.error("Notice fetch error:", error);
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="container py-5">

      <div className="text-center mb-5">
        <h2 className="fw-bold">Notice Board</h2>

        <p className="text-muted">
          Latest announcements from TechnoZoom
        </p>
      </div>

      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
          <p className="mt-2">Loading notices...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {!loading && !error && notices.length === 0 && (
        <div className="alert alert-info text-center">
          No notices available right now.
        </div>
      )}

      {!loading && !error && notices.length > 0 && (
        <div className="row g-4">

          {notices.map((notice) => (
            <div
              className="col-md-6 col-lg-4"
              key={notice._id}
            >
              <div className="card shadow-sm h-100 border-0">

                <div className="card-body">

                  <span className="badge bg-primary mb-3">
                    Notice
                  </span>

                  <h4 className="fw-bold">
                    {notice.title}
                  </h4>

                  <p className="text-muted">
                    {notice.message}
                  </p>

                  <hr />

                  <small className="text-secondary">
                    Posted on:{" "}
                    {new Date(
                      notice.createdAt
                    ).toLocaleDateString()}
                  </small>

                </div>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default NoticeBoard;