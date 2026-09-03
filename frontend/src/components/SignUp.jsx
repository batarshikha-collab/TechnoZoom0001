import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  // ======================================================
  // API URL
  // ======================================================

  const API_URL = import.meta.env.VITE_API_URL;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ======================================================
  // HANDLE SIGNUP
  // ======================================================

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");

    // Check API URL
    if (!API_URL) {
      setError(
        "API URL is not configured. Please check the frontend .env file."
      );
      return;
    }

    // Password check
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // ==================================================
      // SEND DATA TO BACKEND
      // ==================================================

      const response = await fetch(
        `${API_URL}/api/signup`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("SIGNUP RESPONSE:", data);

      // ==================================================
      // BACKEND ERROR
      // ==================================================

      if (!response.ok || !data.success) {
        setError(
          data.message || "Signup failed."
        );
        return;
      }

      // ==================================================
      // SUCCESS
      // ==================================================

      alert(
        `Account created successfully!\nYour Registration No. is: ${
          data.student?.registrationNo || "N/A"
        }`
      );

      // Go to login
      navigate("/login");

    } catch (error) {
      console.error(
        "Signup error:",
        error
      );

      setError(
        "Unable to connect to server. Please make sure backend is running."
      );

    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // PAGE
  // ======================================================

  return (
    <div className="bg-light min-vh-100">

      <div className="container py-5">

        <div className="row justify-content-center">

          <div className="col-md-7 col-lg-5">

            <div className="card border-0 shadow-sm">

              <div className="card-body p-4 p-md-5">

                {/* HEADING */}

                <div className="text-center mb-4">

                  <h2 className="fw-bold">
                    Create Student Account
                  </h2>

                  <p className="text-muted">
                    Join TechnoZoom today
                  </p>

                </div>

                {/* ERROR */}

                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                {/* FORM */}

                <form onSubmit={handleSignup}>

                  {/* NAME */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Full Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      required
                    />

                  </div>

                  {/* EMAIL */}

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

                  {/* PASSWORD */}

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Password
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      required
                      minLength="6"
                    />

                  </div>

                  {/* CONFIRM PASSWORD */}

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      Confirm Password
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(
                          e.target.value
                        )
                      }
                      required
                    />

                  </div>

                  {/* SIGNUP BUTTON */}

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >

                    {loading
                      ? "Creating Account..."
                      : "Create Account"}

                  </button>

                </form>

                {/* LOGIN */}

                <div className="text-center mt-4">

                  <span className="text-muted">
                    Already have an account?
                  </span>{" "}

                  <Link
                    to="/login"
                    className="text-primary fw-semibold text-decoration-none"
                  >
                    Login
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

export default SignUp;