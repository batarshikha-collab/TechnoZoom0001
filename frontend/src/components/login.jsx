import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      // Backend ko login request
      const response = await fetch(
        "http://localhost:5000/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      // Login failed
      if (!response.ok) {
        setError(
          data.message || "Invalid email or password."
        );
        return;
      }

      // Student information save
      localStorage.setItem(
        "student",
        JSON.stringify(data.student)
      );

      // Login status save
      localStorage.setItem("isLoggedIn", "true");

      // Navbar ko immediately batana ki login ho gaya
      window.dispatchEvent(
        new Event("loginStatusChanged")
      );

      // Dashboard par bhejna
      navigate("/dashboard");

    } catch (error) {
      console.log(error);

      setError(
        "Unable to connect to server. Please make sure backend is running."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-vh-100">

      <div className="container py-5">

        <div className="row justify-content-center">

          <div className="col-md-6 col-lg-5">

            <div className="card border-0 shadow-sm">

              <div className="card-body p-4 p-md-5">

                {/* Heading */}

                <div className="text-center mb-4">

                  <h2 className="fw-bold">
                    Student Login
                  </h2>

                  <p className="text-muted">
                    Login to access your dashboard
                  </p>

                </div>

                {/* Error */}

                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                {/* Form */}

                <form onSubmit={handleLogin}>

                  {/* Email */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      required
                    />

                  </div>

                  {/* Password */}

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      Password
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      required
                    />

                  </div>

                  {/* Login Button */}

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading
                      ? "Logging in..."
                      : "Login"}
                  </button>

                </form>

                {/* Signup */}

                <div className="text-center mt-4">

                  <span className="text-muted">
                    Don't have an account?
                  </span>{" "}

                  <Link
                    to="/signup"
                    className="text-primary fw-semibold text-decoration-none"
                  >
                    Create Account
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;