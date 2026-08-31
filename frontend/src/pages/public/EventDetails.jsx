import Navbar from "../../components/Navbar";

function EventDetails() {
  return (
    <div>

      <Navbar />

      {/* Hero */}
      <section className="bg-dark text-white py-5">

        <div className="container">

          <div className="row align-items-center">

            <div className="col-lg-6">

              <span className="badge text-bg-primary mb-3">
                CODING
              </span>

              <h1 className="display-4 fw-bold">
                Tech Hackathon
              </h1>

              <p className="lead mt-3">
                Build innovative solutions, solve real-world
                problems and compete with talented students.
              </p>

              <button className="btn btn-primary btn-lg mt-3">
                Register Now →
              </button>

            </div>

            <div className="col-lg-6 mt-4 mt-lg-0">

              <img
                src="/images/hackathon.jpg"
                className="img-fluid rounded-4 shadow"
                alt="Tech Hackathon"
              />

            </div>

          </div>

        </div>

      </section>


      {/* Event Information */}
      <section className="py-5">

        <div className="container">

          <div className="row g-4">

            {/* Main Details */}
            <div className="col-lg-8">

              <h2 className="fw-bold mb-4">
                About This Event
              </h2>

              <p className="text-muted">
                Tech Hackathon is an exciting coding competition
                where students can showcase their programming,
                problem-solving and innovation skills.
              </p>

              <p className="text-muted">
                Participants will work on a real-world problem
                and develop a creative technology-based solution.
              </p>

              <h3 className="fw-bold mt-5">
                What You Will Get
              </h3>

              <ul className="list-group list-group-flush mt-3">

                <li className="list-group-item">
                  🏆 Certificates for participants
                </li>

                <li className="list-group-item">
                  🎁 Exciting prizes
                </li>

                <li className="list-group-item">
                  💻 Hands-on coding experience
                </li>

                <li className="list-group-item">
                  🤝 Networking with other students
                </li>

              </ul>

            </div>


            {/* Event Info Card */}
            <div className="col-lg-4">

              <div className="card shadow-sm">

                <div className="card-body p-4">

                  <h4 className="fw-bold mb-4">
                    Event Information
                  </h4>

                  <p>
                    <i className="bi bi-calendar text-primary"></i>
                    {" "}25 September 2026
                  </p>

                  <p>
                    <i className="bi bi-clock text-primary"></i>
                    {" "}10:00 AM
                  </p>

                  <p>
                    <i className="bi bi-geo-alt text-primary"></i>
                    {" "}TechnoZoom Campus
                  </p>

                  <p>
                    <i className="bi bi-trophy text-primary"></i>
                    {" "}Prize Pool: ₹25,000
                  </p>

                  <p>
                    <i className="bi bi-people text-primary"></i>
                    {" "}Team Size: 2–4 Members
                  </p>

                  <hr />

                  <button className="btn btn-primary w-100">
                    Register Now →
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Footer */}
      <footer className="bg-dark text-white py-4">

        <div className="container text-center">

          <h4>
            Techno<span className="text-primary">Zoom</span>
          </h4>

          <p className="text-secondary mb-0">
            Discover. Participate. Innovate.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default EventDetails;