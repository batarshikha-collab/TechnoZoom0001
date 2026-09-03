import React, { useEffect, useState } from "react";

function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/notices`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message || "Unable to fetch notices"
        );
        return;
      }

      setNotices(data.notices || []);
    } catch (error) {
      console.error("Notices error:", error);

      setError(
        "Unable to connect to server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="bg-light min-vh-100">

      <div className="container py-5">

        {/* Heading */}

        <div className="text-center mb-5">

          <h1 className="fw-bold">
            📢 Notice Board
          </h1>

          <p className="text-muted">
            Latest announcements and important updates
            from TechnoZoom.
          </p>

        </div>

        {/* Loading */}

        {loading && (
          <div className="text-center py-5">

            <div
              className="spinner-border text-primary"
              role="status"
            ></div>

            <p className="mt-3 text-muted">
              Loading notices...
            </p>

          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}

        {/* No Notices */}

        {!loading &&
          !error &&
          notices.length === 0 && (

            <div className="alert alert-info text-center">
              No notices available right now.
            </div>

          )}

        {/* Notices */}

        {!loading &&
          !error &&
          notices.length > 0 && (

            <div className="row g-4">

              {notices.map((notice) => (

                <div
                  className="col-md-6 col-lg-4"
                  key={notice._id}
                >

                  <div className="card shadow-sm border-0 h-100">

                    <div className="card-body">

                      {/* Notice Icon */}

                      <div className="mb-3">
                        <span
                          className="badge bg-primary"
                        >
                          NOTICE
                        </span>
                      </div>

                      {/* Title */}

                      <h4 className="fw-bold">
                        {notice.title}
                      </h4>

                      {/* Message */}

                      <p className="text-muted">
                        {notice.message}
                      </p>

                      {/* Date */}

                      <hr />

                      <small className="text-secondary">
                        Posted on:{" "}
                        {notice.createdAt
                          ? new Date(
                              notice.createdAt
                            ).toLocaleDateString()
                          : "N/A"}
                      </small>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

      </div>

    </div>
  );
}

export default Notices;