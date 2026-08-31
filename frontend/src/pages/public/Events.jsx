import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Events() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/events"
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Unable to fetch events");
        return;
      }

      setEvents(data.events || []);
    } catch (error) {
      console.error("Events error:", error);

      setError(
        "Unable to connect to server. Please make sure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ==========================================
  // REGISTER BUTTON
  // ==========================================

  const handleRegister = (event) => {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true";

    const student =
      JSON.parse(localStorage.getItem("student")) || null;

    // Student login check
    if (!isLoggedIn || !student) {
      alert("Please login first to register for an event.");
      navigate("/login");
      return;
    }

    // Event registration page par event bhejna
    navigate("/event-registration", {
      state: {
        event: event,
      },
    });
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
          Loading events...
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
          onClick={fetchEvents}
        >
          Try Again
        </button>
      </div>
    );
  }

  // ==========================================
  // EVENTS
  // ==========================================

  return (
    <div className="bg-light min-vh-100">

      <div className="container py-5">

        {/* Heading */}

        <div className="text-center mb-5">

          <h1 className="fw-bold">
            TechnoZoom Events
          </h1>

          <p className="text-muted">
            Explore events and register for your favourite ones.
          </p>

        </div>

        {/* No events */}

        {events.length === 0 ? (

          <div className="alert alert-info text-center">
            No events available right now.
          </div>

        ) : (

          <div className="row g-4">

            {events.map((event) => (

              <div
                className="col-md-6 col-lg-4"
                key={event._id}
              >

                <div className="card border-0 shadow-sm h-100">

                  {/* Event Image */}

                  {event.image ? (

                    <img
                      src={event.image}
                      alt={event.title}
                      className="card-img-top"
                      style={{
                        height: "220px",
                        objectFit: "cover",
                      }}
                    />

                  ) : (

                    <div
                      className="bg-secondary text-white d-flex align-items-center justify-content-center"
                      style={{
                        height: "220px",
                      }}
                    >
                      No Image
                    </div>

                  )}

                  {/* Card Body */}

                  <div className="card-body d-flex flex-column">

                    <span className="badge bg-primary align-self-start mb-2">
                      {event.category}
                    </span>

                    <h4 className="fw-bold">
                      {event.title}
                    </h4>

                    <p className="text-muted">
                      {event.description}
                    </p>

                    <p className="mb-1">
                      <strong>Date:</strong>{" "}
                      {event.date}
                    </p>

                    <p className="mb-3">
                      <strong>Venue:</strong>{" "}
                      {event.venue}
                    </p>

                    <button
                      className="btn btn-primary mt-auto"
                      onClick={() =>
                        handleRegister(event)
                      }
                    >
                      Register for Event
                    </button>

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

export default Events;