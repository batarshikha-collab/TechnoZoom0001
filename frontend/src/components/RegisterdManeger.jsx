import React, { useEffect, useState } from "react";

function RegistrationManager() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const savedRegistrations =
      JSON.parse(localStorage.getItem("registeredEvents")) || [];

    setRegistrations(savedRegistrations);
  }, []);

  return (
    <div className="container mt-5">

      <h2 className="fw-bold mb-4">
        Event Registrations
      </h2>

      {registrations.length === 0 ? (

        <div className="alert alert-info">
          No event registrations found.
        </div>

      ) : (

        <div className="card shadow-sm">

          <div className="table-responsive">

            <table className="table table-hover mb-0">

              <thead className="table-dark">

                <tr>
                  <th>#</th>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Registration ID</th>
                  <th>Registered On</th>
                </tr>

              </thead>

              <tbody>

                {registrations.map((registration, index) => (

                  <tr key={`${registration.id}-${registration.studentEmail}`}>

                    <td>
                      {index + 1}
                    </td>

                    <td>
                      {registration.studentName || "N/A"}
                    </td>

                    <td>
                      {registration.studentEmail || "N/A"}
                    </td>

                    <td>
                      {registration.title}
                    </td>

                    <td>
                      {registration.date}
                    </td>

                    <td>
                      {registration.venue}
                    </td>

                    <td>
                      <span className="badge bg-success">
                        {registration.registrationId || "N/A"}
                      </span>
                    </td>

                    <td>
                      {registration.registeredAt || "N/A"}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>
  );
}

export default RegistrationManager;