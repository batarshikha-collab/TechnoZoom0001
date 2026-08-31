import React from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (
      email === "admin@technozoom.com" &&
      password === "admin123"
    ) {
      localStorage.setItem("adminLoggedIn", "true");

      alert("Admin Login Successful!");

      navigate("/admin");
    } else {
      alert("Invalid Admin Email or Password!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">

          <div className="card shadow p-4">

            <h2 className="text-center fw-bold mb-4">
              Admin Login
            </h2>

            <form onSubmit={handleAdminLogin}>

              <div className="mb-3">
                <label className="form-label">
                  Admin Email
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter admin email"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter admin password"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-dark w-100"
              >
                Admin Login
              </button>

            </form>

          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminLogin;