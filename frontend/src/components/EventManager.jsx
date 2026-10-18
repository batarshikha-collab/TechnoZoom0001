
import React, { useEffect, useState } from "react";

function EventManager() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [events, setEvents] = useState([]);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  // Image state
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/events`);
      const data = await response.json();

      if (data.success) {
        setEvents(data.events || []);
      } else {
        alert(data.message || "Unable to fetch events");
      }
    } catch (error) {
      console.error("Fetch Events Error:", error);
      alert("Unable to connect to server.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Compress selected image and convert it to Base64
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const originalImage = new Image();

      originalImage.onload = () => {
        const maxWidth = 1000;
        const maxHeight = 700;

        let width = originalImage.width;
        let height = originalImage.height;

        const scale = Math.min(
          maxWidth / width,
          maxHeight / height,
          1
        );

        width = Math.round(width * scale);
        height = Math.round(height * scale);

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");

        if (!context) {
          alert("Unable to process this image.");
          return;
        }

        context.drawImage(originalImage, 0, 0, width, height);

        // JPEG compression reduces image size
        const compressedImage = canvas.toDataURL(
          "image/jpeg",
          0.7
        );

        setImage(compressedImage);
        setImagePreview(compressedImage);
      };

      originalImage.onerror = () => {
        alert("Unable to read this image.");
      };

      originalImage.src = event.target.result;
    };

    reader.onerror = () => {
      alert("Unable to load the selected image.");
    };

    reader.readAsDataURL(file);
  };

  // Reset form
  const resetForm = () => {
    setTitle("");
    setDate("");
    setVenue("");
    setDescription("");
    setCategory("");
    setImage("");
    setImagePreview("");
    setEditId(null);
  };

  // Add or update event
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
        image,
      };

      let response;

      if (editId) {
        response = await fetch(
          `${API_URL}/api/events/${editId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(eventData),
          }
        );
      } else {
        response = await fetch(
          `${API_URL}/api/events`,
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

      if (!response.ok || !data.success) {
        alert(data.message || "Unable to save event");
        return;
      }

      alert(
        editId
          ? "Event updated successfully!"
          : "Event added successfully!"
      );

      resetForm();
      await fetchEvents();
    } catch (error) {
      console.error("Save Event Error:", error);
      alert(
        "Unable to save event. Check your server and image size."
      );
    } finally {
      setLoading(false);
    }
  };

  // Edit event
  const handleEdit = (event) => {
    setEditId(event._id);

    setTitle(event.title || "");
    setDate(event.date || "");
    setVenue(event.venue || "");
    setDescription(event.description || "");
    setCategory(event.category || "");

    // Keep the existing image unless a new one is selected
    setImage(event.image || "");
    setImagePreview(event.image || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete event
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/api/events/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Event deleted successfully!");
        await fetchEvents();
      } else {
        alert(data.message || "Unable to delete event");
      }
    } catch (error) {
      console.error("Delete Event Error:", error);
      alert("Unable to connect to server.");
    }
  };

  // Cancel editing
  const handleCancel = () => {
    resetForm();
  };

  return (
    <div className="container py-5">
      {/* Page heading */}
      <div className="mb-4">
        <h2 className="fw-bold">
          {editId ? "Edit Event" : "Add New Event"}
        </h2>

        <p className="text-muted">
          Manage TechnoZoom events
        </p>
      </div>

      {/* Add/Edit form */}
      <div className="card shadow-sm border-0 p-4 mb-5">
        <form onSubmit={handleSubmit}>
          {/* Event name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Event Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter event name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Date */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Event Date
            </label>

            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Venue */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Venue
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Category
            </label>

            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select category</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Coding">Coding</option>
              <option value="Workshop">Workshop</option>
              <option value="Quiz">Quiz</option>
              <option value="Sports">Sports</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Description
            </label>

            <textarea
              className="form-control"
              rows="4"
              placeholder="Enter event description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Image upload */}
          <div className="mb-4">
            <label className="form-label fw-semibold">
              Event Image
            </label>

            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />

            <small className="text-muted">
              Select an image for your event card.
            </small>

            {imagePreview && (
              <div className="mt-3">
                <p className="fw-semibold mb-2">
                  Image Preview
                </p>

                <img
                  src={imagePreview}
                  alt="Event preview"
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    height: "220px",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />

                <div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger mt-2"
                    onClick={() => {
                      setImage("");
                      setImagePreview("");
                    }}
                  >
                    Remove Image
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
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

          {/* Cancel edit */}
          {editId && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Events list */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">All Events</h3>
          <p className="text-muted mb-0">
            Events stored in MongoDB
          </p>
        </div>

        <button
          type="button"
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
              <div className="card shadow-sm border-0 h-100 overflow-hidden">
                {/* Event image */}
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="card-img-top"
                    style={{
                      width: "100%",
                      height: "210px",
                      objectFit: "cover",
                    }}
                  />
                )}

                <div className="card-body">
                  <span className="badge bg-primary mb-3">
                    {event.category}
                  </span>

                  <h4 className="fw-bold">
                    {event.title}
                  </h4>

                  <p>
                    <strong>📅 Date:</strong>{" "}
                    {event.date}
                  </p>

                  <p>
                    <strong>📍 Venue:</strong>{" "}
                    {event.venue}
                  </p>

                  <p className="text-muted">
                    {event.description}
                  </p>

                  <div className="mt-3">
                    <button
                      type="button"
                      className="btn btn-warning me-2"
                      onClick={() => handleEdit(event)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(event._id)}
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
