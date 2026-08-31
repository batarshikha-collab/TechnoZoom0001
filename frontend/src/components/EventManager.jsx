import React, { useEffect, useState } from "react";

function EventManager() {
  const [events, setEvents] = useState([]);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // =====================================================
  // FETCH EVENTS FROM MONGODB
  // =====================================================

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/events"
      );

      const data = await response.json();

      if (data.success) {
        setEvents(data.events);
      } else {
        alert(data.message || "Unable to fetch events");
      }
    } catch (error) {
      console.log("Fetch Events Error:", error);
      alert("Unable to connect to server.");
    }
  };

  // =====================================================
  // LOAD EVENTS
  // =====================================================

  useEffect(() => {
    fetchEvents();
  }, []);

  // =====================================================
  // ADD / UPDATE EVENT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const eventData = {
        title,
        date,
        venue,
        description,
        category,
      };

      let response;

      // UPDATE
      if (editId) {
        response = await fetch(
          `http://localhost:5000/api/events/${editId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(eventData),
          }
        );
      }

      // ADD
      else {
        response = await fetch(
          "http://localhost:5000/api/events",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(eventData),
          }
        );
      }

      const data = await response.json();

      if (!data.success) {
        alert(
          data.message ||
            "Unable to save event"
        );
        return;
      }

      if (editId) {
        alert("Event updated successfully!");
      } else {
        alert("Event added successfully!");
      }

      // Clear form
      setTitle("");
      setDate("");
      setVenue("");
      setDescription("");
      setCategory("");
      setEditId(null);

      // MongoDB se fresh events
      fetchEvents();

    } catch (error) {
      console.log("Save Event Error:", error);
      alert("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (event) => {
    setEditId(event._id);

    setTitle(event.title);
    setDate(event.date);
    setVenue(event.venue);
    setDescription(event.description);
    setCategory(event.category);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/events/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Event deleted successfully!");

        fetchEvents();
      } else {
        alert(
          data.message ||
            "Unable to delete event"
        );
      }

    } catch (error) {
      console.log("Delete Event Error:", error);

      alert("Unable to connect to server.");
    }
  };

  // =====================================================
  // CANCEL EDIT
  // =====================================================

  const handleCancel = () => {
    setEditId(null);

    setTitle("");
    setDate("");
    setVenue("");
    setDescription("");
    setCategory("");
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="container py-5">

      {/* PAGE HEADING */}

      <div className="mb-4">

        <h2 className="fw-bold">
          {editId
            ? "Edit Event"
            : "Add New Event"}
        </h2>

        <p className="text-muted">
          Manage TechnoZoom events
        </p>

      </div>


      {/* EVENT FORM */}

      <div className="card shadow-sm border-0 p-4 mb-5">

        <form onSubmit={handleSubmit}>

          {/* EVENT NAME */}

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Event Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter event name"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              required
            />

          </div>


          {/* DATE */}

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Event Date
            </label>

            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
              required
            />

          </div>


          {/* VENUE */}

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Venue
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter venue"
              value={venue}
              onChange={(e) =>
                setVenue(e.target.value)
              }
              required
            />

          </div>


          {/* CATEGORY */}

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Category
            </label>

            <select
              className="form-select"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              required
            >

              <option value="">
                Select category
              </option>

              <option value="Hackathon">
                Hackathon
              </option>

              <option value="Coding">
                Coding
              </option>

              <option value="Workshop">
                Workshop
              </option>

              <option value="Quiz">
                Quiz
              </option>

              <option value="Sports">
                Sports
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>


          {/* DESCRIPTION */}

          <div className="mb-4">

            <label className="form-label fw-semibold">
              Description
            </label>

            <textarea
              className="form-control"
              rows="4"
              placeholder="Enter event description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              required
            />

          </div>


          {/* BUTTON */}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >

            {loading
              ? "Saving..."
              : editId
              ? "Update Event"
              : "Add Event"}

          </button>


          {/* CANCEL EDIT */}

          {editId && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}

        </form>

      </div>


      {/* EVENT LIST */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h3 className="fw-bold mb-1">
            All Events
          </h3>

          <p className="text-muted mb-0">
            Events stored in MongoDB
          </p>

        </div>

        <button
          className="btn btn-outline-primary"
          onClick={fetchEvents}
        >
          Refresh
        </button>

      </div>


      {events.length === 0 ? (

        <div className="alert alert-info">
          No events available.
        </div>

      ) : (

        <div className="row g-4">

          {events.map((event) => (

            <div
              className="col-md-6 col-lg-4"
              key={event._id}
            >

              <div className="card shadow-sm border-0 h-100">

                <div className="card-body">

                  <span className="badge bg-primary mb-3">
                    {event.category}
                  </span>

                  <h4 className="fw-bold">
                    {event.title}
                  </h4>

                  <p>
                    <strong>
                      📅 Date:
                    </strong>{" "}
                    {event.date}
                  </p>

                  <p>
                    <strong>
                      📍 Venue:
                    </strong>{" "}
                    {event.venue}
                  </p>

                  <p className="text-muted">
                    {event.description}
                  </p>

                  <div className="mt-3">

                    <button
                      className="btn btn-warning me-2"
                      onClick={() =>
                        handleEdit(event)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        handleDelete(event._id)
                      }
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

export default EventManager;