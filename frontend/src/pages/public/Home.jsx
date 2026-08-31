import Navbar from "../../components/Navbar";

function Home() {
  return (
    <div>

      {/* NAVBAR */}
      {/* <Navbar /> */}


      {/* ================= HERO SECTION ================= */}

      <section className="py-5 bg-dark text-white">

        <div className="container">

          <div className="row align-items-center">

            {/* LEFT SIDE */}
            <div className="col-lg-6 col-12">

              <p className="text-primary fw-bold">
                WELCOME TO TECHNOZOOM
              </p>

              <h1 className="display-3 fw-bold">
                Discover.
                <br />
                Participate.
                <br />
                Innovate.
              </h1>

              <p className="lead mt-3">
                Discover exciting hackathons, competitions,
                workshops and gaming events.
              </p>

              <button className="btn btn-primary btn-lg mt-3">
                Explore Events
              </button>

            </div>


            {/* RIGHT SIDE */}
            <div className="col-lg-6 col-12 mt-4 mt-lg-0">

              <img
                src="/images/hero.jpg"
                className="img-fluid rounded-4 shadow"
                alt="TechnoZoom Event"
              />

            </div>

          </div>

        </div>

      </section>


      {/* ================= UPCOMING EVENTS ================= */}

      <section className="py-5">

        <div className="container">

          <div className="text-center mb-5">

            <p className="text-primary fw-bold">
              EXPLORE
            </p>

            <h2 className="display-5 fw-bold">
              Upcoming Events
            </h2>

            <p className="text-muted">
              Find an event that matches your interest.
            </p>

          </div>


          <div className="row g-4">

            {/* HACKATHON */}
            <div className="col-lg-4 col-md-6 col-12">

              <div className="card h-100 shadow-sm">

                <img
                  src="/images/hackathon.jpg"
                  className="card-img-top"
                  alt="Hackathon"
                />

                <div className="card-body">

                  <span className="badge text-bg-primary">
                    CODING
                  </span>

                  <h4 className="card-title mt-3">
                    Tech Hackathon
                  </h4>

                  <p className="card-text text-muted">
                    Build innovative solutions and compete
                    with talented students.
                  </p>

                  <button className="btn btn-outline-primary">
                    View Event →
                  </button>

                </div>

              </div>

            </div>


            {/* LUDO */}
            <div className="col-lg-4 col-md-6 col-12">

              <div className="card h-100 shadow-sm">

                <img
                  src="/images/Ludo.jpg"
                  className="card-img-top"
                  alt="Ludo"
                />

                <div className="card-body">

                  <span className="badge text-bg-success">
                    GAMING
                  </span>

                  <h4 className="card-title mt-3">
                    Ludo Championship
                  </h4>

                  <p className="card-text text-muted">
                    Challenge your friends and compete
                    for the championship.
                  </p>

                  <button className="btn btn-outline-primary">
                    View Event →
                  </button>

                </div>

              </div>

            </div>


            {/* QUIZ */}
            <div className="col-lg-4 col-md-6 col-12">

              <div className="card h-100 shadow-sm">

                <img
                  src="/images/quiz.jpg"
                  className="card-img-top"
                  alt="Quiz"
                />

                <div className="card-body">

                  <span className="badge text-bg-warning">
                    QUIZ
                  </span>

                  <h4 className="card-title mt-3">
                    Tech Quiz
                  </h4>

                  <p className="card-text text-muted">
                    Test your technical knowledge and
                    prove your skills.
                  </p>

                  <button className="btn btn-outline-primary">
                    View Event →
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= WHY TECHNOZOOM ================= */}

      <section className="py-5 bg-light">

        <div className="container">

          <div className="text-center mb-5">

            <p className="text-primary fw-bold">
              WHY TECHNOZOOM?
            </p>

            <h2 className="fw-bold">
              More than just an event platform.
            </h2>

          </div>


          <div className="row g-4">

            <div className="col-lg-4 col-md-6 col-12">

              <div className="text-center p-4">

                <i className="bi bi-rocket-takeoff fs-1 text-primary"></i>

                <h4 className="mt-3">
                  Discover
                </h4>

                <p className="text-muted">
                  Find exciting events and opportunities.
                </p>

              </div>

            </div>


            <div className="col-lg-4 col-md-6 col-12">

              <div className="text-center p-4">

                <i className="bi bi-trophy fs-1 text-primary"></i>

                <h4 className="mt-3">
                  Compete
                </h4>

                <p className="text-muted">
                  Participate and showcase your skills.
                </p>

              </div>

            </div>


            <div className="col-lg-4 col-md-6 col-12">

              <div className="text-center p-4">

                <i className="bi bi-people fs-1 text-primary"></i>

                <h4 className="mt-3">
                  Connect
                </h4>

                <p className="text-muted">
                  Meet students with similar interests.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="py-5 bg-primary text-white">

        <div className="container text-center">

          <h2 className="fw-bold">
            Ready to participate?
          </h2>

          <p className="lead">
            Join TechnoZoom and discover your next opportunity.
          </p>

          <button className="btn btn-light btn-lg">
            Explore Events →
          </button>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      {/* <footer className="bg-dark text-white py-4">

        <div className="container">

          <div className="row">

            <div className="col-md-6">

              <h3>
                Techno<span className="text-primary">Zoom</span>
              </h3>

              <p className="text-secondary">
                Discover. Participate. Innovate.
              </p>

            </div>

            <div className="col-md-6 text-md-end">

              <p className="text-secondary">
                © 2026 TechnoZoom
              </p>

            </div>

          </div>

        </div>
{/* 
      </footer> */} 
    </div>
  );
}

export default Home;