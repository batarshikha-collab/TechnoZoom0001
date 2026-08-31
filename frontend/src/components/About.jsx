import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div>

      {/* Hero */}

      <section className="bg-light py-5">

        <div className="container py-4 text-center">

          <span className="badge bg-primary mb-3">
            About TechnoZoom
          </span>

          <h1 className="display-5 fw-bold">
            Making Campus Events
            <span className="text-primary">
              {" "}Simple
            </span>
          </h1>

          <p className="lead text-muted mt-3 mx-auto"
             style={{ maxWidth: "750px" }}>
            TechnoZoom is a college event management platform
            designed to make discovering, registering and
            managing campus events easier.
          </p>

        </div>

      </section>


      {/* About Content */}

      <section className="py-5">

        <div className="container">

          <div className="row align-items-center g-5">

            <div className="col-lg-6">

              <h2 className="fw-bold mb-3">
                What is TechnoZoom?
              </h2>

              <p className="text-muted">
                TechnoZoom provides a centralized platform where
                students can discover upcoming college events,
                register online and receive important announcements.
              </p>

              <p className="text-muted">
                Administrators can manage events, students,
                registrations and notices from a dedicated
                admin panel.
              </p>

            </div>


            <div className="col-lg-6">

              <div className="card border-0 shadow-sm">

                <div className="card-body p-5 text-center">

                  <div className="display-1 mb-3">
                    🎓
                  </div>

                  <h3 className="fw-bold">
                    One Platform
                  </h3>

                  <p className="text-muted mb-0">
                    Everything related to campus events
                    in one place.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Features */}

      <section className="bg-light py-5">

        <div className="container">

          <div className="text-center mb-5">

            <h2 className="fw-bold">
              What We Provide
            </h2>

            <p className="text-muted">
              Simple tools for students and administrators.
            </p>

          </div>

          <div className="row g-4">

            <div className="col-md-4">

              <div className="card border-0 shadow-sm h-100">

                <div className="card-body p-4 text-center">

                  <div className="fs-1 mb-3">
                    🎫
                  </div>

                  <h4 className="fw-bold">
                    Event Registration
                  </h4>

                  <p className="text-muted">
                    Students can register for events
                    and receive a unique registration ID.
                  </p>

                </div>

              </div>

            </div>


            <div className="col-md-4">

              <div className="card border-0 shadow-sm h-100">

                <div className="card-body p-4 text-center">

                  <div className="fs-1 mb-3">
                    📢
                  </div>

                  <h4 className="fw-bold">
                    Notices
                  </h4>

                  <p className="text-muted">
                    Important announcements are available
                    directly on the student dashboard.
                  </p>

                </div>

              </div>

            </div>


            <div className="col-md-4">

              <div className="card border-0 shadow-sm h-100">

                <div className="card-body p-4 text-center">

                  <div className="fs-1 mb-3">
                    ⚙️
                  </div>

                  <h4 className="fw-bold">
                    Admin Management
                  </h4>

                  <p className="text-muted">
                    Admins can manage events, students,
                    registrations and notices.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="bg-primary text-white py-5">

        <div className="container text-center py-4">

          <h2 className="fw-bold">
            Ready to explore campus events?
          </h2>

          <p className="mb-4">
            Discover what's happening around your campus.
          </p>

          <Link
            to="/events"
            className="btn btn-light btn-lg"
          >
            Explore Events
          </Link>

        </div>

      </section>

    </div>
  );
}

export default About;