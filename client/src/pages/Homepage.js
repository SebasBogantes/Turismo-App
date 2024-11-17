import React from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  const handleNavigateToDestinos = () => {
    navigate("/destinos"); // Redirige a "/destinos"
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-primary text-white text-center py-4">
        <div className="container">
          <h1 className="display-4">Explorando Costa Rica</h1>
          <p className="lead">Descubre las maravillas de este hermoso destino.</p>
          <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mx-auto">
                  <li className="nav-item">
                    <a className="nav-link text-white" href="#inicio">
                      Inicio
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="#destinos">
                      Destinos
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="#galeria">
                      Galería
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="#contacto">
                      Contacto
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="my-5">
        {/* Inicio Section */}
        <section id="inicio" className="py-5 bg-light">
          <div className="container text-center">
            <h2 className="mb-4">Explora Costa Rica</h2>
            <p className="fs-5">
              Planifica tu próxima aventura y vive experiencias inolvidables.
            </p>
          </div>
        </section>

        {/* Destinos Section */}
        <section id="destinos" className="py-5">
          <div className="container">
            <h2 className="text-center mb-4">Destinos Populares</h2>
            <div className="row g-4">
              <div className="col-lg-4 col-md-6">
                <div className="card shadow-sm">
                  <img
                    src="/images/nosara/playa/bonita.jpeg"
                    className="card-img-top"
                    alt="Playa paradisíaca"
                    style={{ objectFit: "cover", height: "250px", width: "100%" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Playas de Costa Rica</h5>
                    <p className="card-text">
                      Disfruta de las playas más hermosas del país.
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={handleNavigateToDestinos}
                    >
                      Saber más
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="card shadow-sm">
                  <img
                    src="/images/tropicales.jpeg"
                    className="card-img-top"
                    alt="Bosque tropical"
                    style={{ objectFit: "cover", height: "250px", width: "100%" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Bosques Tropicales</h5>
                    <p className="card-text">
                      Explora la naturaleza y su biodiversidad única.
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={handleNavigateToDestinos}
                    >
                      Saber más
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="card shadow-sm">
                  <img
                    src="/images/la-fortuna-downtown.jpg"
                    className="card-img-top"
                    alt="Volcán en erupción"
                    style={{ objectFit: "cover", height: "250px", width: "100%" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Volcanes</h5>
                    <p className="card-text">
                      Admira los majestuosos volcanes activos.
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={handleNavigateToDestinos}
                    >
                      Saber más
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Galería Section */}
        <section id="galeria" className="py-5 bg-light">
          <div className="container text-center">
            <h2 className="mb-4">Galería de Fotos</h2>
            <div className="row g-3">
              <div className="col-sm-6 col-md-4">
                <img
                  src="/images/nosara/playa/nosaraplaya1.jpeg"
                  className="img-fluid rounded shadow"
                  alt="Playa paradisíaca"
                  style={{ objectFit: "cover", height: "250px", width: "100%" }}
                />
              </div>
              <div className="col-sm-6 col-md-4">
                <img
                  src="/images/quepos/GlampingTomaselli/image-manuel.jpg"
                  className="img-fluid rounded shadow"
                  alt="Bosque tropical"
                  style={{ objectFit: "cover", height: "250px", width: "100%" }}
                />
              </div>
              <div className="col-sm-6 col-md-4">
                <img
                  src="/images/la-fortuna-downtown.jpg"
                  className="img-fluid rounded shadow"
                  alt="Volcán en erupción"
                  style={{ objectFit: "cover", height: "250px", width: "100%" }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contacto" className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5>Contacto</h5>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@explorandocostarica.com"
                  className="text-white"
                >
                  info@explorandocostarica.com
                </a>
              </p>
              <p>Call Center: (866) 405-4646</p>
            </div>
            <div className="col-md-6 text-md-end">
              <h5>Síguenos</h5>
              <a href="#" className="text-white me-3">
                Facebook
              </a>
              <a href="#" className="text-white me-3">
                Instagram
              </a>
              <a href="#" className="text-white">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
