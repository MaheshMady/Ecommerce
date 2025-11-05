import React from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import mensimage from "./assets/images/with-backpack.jpg";
import womensimage from "./assets/images/pink-wall.jpg";
import kidsimage from "./assets/images/child-having-fun-camera.jpg";
import bgimage from "./assets/images/woman.jpg";

export default function App() {
  const navigate = useNavigate();

  const staticProducts = [
    {
      id: 1,
      product: "Men’s Clothing",
      description: "Stylish and comfortable apparel designed for every occasion.",
      image: mensimage,
    },
    {
      id: 2,
      product: "Women’s Clothing",
      description: "Elegant, trendy, and timeless fashion for all seasons.",
      image: womensimage,
    },
    {
      id: 3,
      product: "Kids’ Clothing",
      description: "Bright, fun, and comfy outfits for the little ones.",
      image: kidsimage,
    },
  ];

  return (
    <div>
      <Navbar />

      <main>
        {/* --- HERO SECTION --- */}
        <section className="container px-4 py-2 hero-section">
          <div className="row align-items-center justify-content-center g-5 py-5">
            <div className="col-12 col-md-6 d-flex justify-content-center">
              <img
                src={bgimage}
                className="hero-image shadow-sm"
                alt="Hero"
                loading="lazy"
              />
            </div>

            <div className="col-12 col-md-6 text-md-start text-center hero-text ps-md-5">
              <h1 className="display-4 fw-bold lh-sm mb-3 text-dark">
                Welcome to <br /> Our Store
              </h1>
              <p className="lead mb-4 text-secondary">
                Discover carefully curated collections that match your lifestyle.
                We bring premium quality, comfort, and style — all in one place.
              </p>
              <div className="d-flex justify-content-md-start justify-content-center">
                <Link
                  to="/products"
                  className="btn btn-primary btn-lg px-4 rounded-pill"
                >
                  View All Products
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* --- FEATURED SECTION --- */}
        <div className="album-section py-5 bg-body-tertiary">
          <div className="container">
            <h2 className="text-center mb-5 fw-semibold section-title fade-in-up">
              Featured Categories
            </h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 fade-in">
              {staticProducts.map((val) => (
                <div className="col" key={val.id}>
                  <div className="card product-card h-100 shadow-sm border-0">
                    <img
                      src={val.image}
                      className="card-img-top product-img"
                      alt={val.product}
                    />
                    <div className="card-body text-center">
                      <p className="fw-bold fs-5 mb-1">{val.product}</p>
                      <p className="card-text text-muted">{val.description}</p>
                      <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-sm btn-outline-primary px-4 py-2 rounded-4 view-btn"
                          onClick={() => navigate("/products")}
                        >
                          View More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <ToastContainer />
      <Footer />

      <style>{`
/* --- HERO SECTION --- */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: #f8f9fa;
  padding-top: 5rem !important;
  padding-bottom: 5rem !important;
}

.hero-image {
  width: 100%;
  max-width: 500px;
  height: auto;
  object-fit: contain;
  border-radius: 20px;
  transition: transform 0.5s ease;
}
.hero-image:hover {
  transform: scale(1.04);
}

.hero-text {
  max-width: 600px;
}
.hero-text h1 {
  font-size: 2.8rem;
  line-height: 1.2;
}
.hero-text p {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 1.5rem;
}

/* Button */
.btn-primary {
  background: linear-gradient(90deg, #0d6efd, #6610f2);
  border: none;
  box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
  transition: all 0.3s ease;
}
.btn-primary:hover {
  background: linear-gradient(90deg, #6610f2, #0d6efd);
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(13, 110, 253, 0.4);
}

/* --- FEATURED SECTION --- */
.section-title {
  color: #222;
  position: relative;
  font-size: 1.9rem;
  letter-spacing: 0.5px;
}
.section-title::after {
  content: "";
  position: absolute;
  width: 70px;
  height: 3px;
  background: linear-gradient(90deg, #0d6efd, #6610f2);
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
}

.product-card {
  background: #ffffff;
  border-radius: 18px;
  overflow: hidden;
  transition: all 0.4s ease;
  border: 1px solid #e9ecef;
}
.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 22px rgba(25, 118, 210, 0.15);
}

.product-img {
  height: 220px;
  object-fit: cover;
  border-radius: 18px 18px 0 0;
  transition: transform 0.4s ease;
}
.product-card:hover .product-img {
  transform: scale(1.04);
}

.view-btn {
  transition: all 0.3s ease;
  border-color: #0d6efd;
  color: #0d6efd;
  font-weight: 500;
  border-radius: 30px;
}
.view-btn:hover {
  transform: translateY(-2px);
  background: linear-gradient(90deg, #0d6efd, #6610f2);
  color: #fff;
  box-shadow: 0 0 10px rgba(13, 110, 253, 0.3);
}

/* --- RESPONSIVE --- */
@media (max-width: 992px) {
  .hero-section {
    text-align: center;
    justify-content: center;
  }
  .hero-text {
    text-align: center !important;
    padding: 2rem 1rem;
  }
  .hero-text h1 {
    font-size: 2.2rem;
  }
}

@media (max-width: 576px) {
  .hero-section {
    min-height: 85vh;
  }
  .hero-image {
    max-width: 340px;
  }
  .hero-text h1 {
    font-size: 1.8rem;
  }
  .hero-text p {
    font-size: 1rem;
  }
}
      `}</style>
    </div>
  );
}
