import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading,setLoading] = useState(false)

  const filteredProducts = products.filter((item) =>
    item.product.toLowerCase().includes(filter.toLowerCase())
  );

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await axios.get(import.meta.env.VITE_APP_API + "/employees", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setProducts(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch Products");
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return(
    <>
     <Navbar/>
        <Loading/>
     <Footer/>
    </>
  ) ;

  return (
    <div>
      <Navbar />

      <section className="container mt-5 pt-5 product-section">
        <h1 className="fw-bold text-center mb-4 text-primary title-animate">
          Explore Our Products
        </h1>

        <div className="search-wrapper">
          <input
            className="form-control search-bar"
            placeholder=" Search for a product ..."
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <main>
          <div className="album py-5 bg-body-tertiary">
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((val) => (
                    <div className="col" key={val._id}>
                      <div className="card product-card shadow-sm">
                        <div className="img-container">
                          <img
                            src={import.meta.env.VITE_APP_API + "/" + val.image}
                            className="card-img-top product-img"
                            alt={val.product}
                          />
                        </div>
                        <div className="card-body">
                          <h5 className="fw-semibold text-dark">
                            {val.product}
                          </h5>
                          <p className="card-text text-muted small">
                            {val.description.length > 80
                              ? val.description.slice(0, 80) + "..."
                              : val.description}
                          </p>
                          <div className="d-flex justify-content-between align-items-center">
                            <button
                              className="btn btn-outline-primary btn-sm rounded-pill"
                              onClick={() =>
                                navigate("/productdetailview", {
                                  state: { product: val._id },
                                })
                              }
                            >
                              View Details
                            </button>
                            <span className="price-tag fw-bold text-success">
                              ₹{val.price || "—"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center mx-auto text-muted py-5">
                    <h5>No products found</h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </section>

      <ToastContainer />
      <Footer />

      <style>{`
   
        
        .product-section {
          animation: fadeIn 1s ease-in-out;
        }

        .title-animate {
          animation: slideDown 0.8s ease-out;
        }

        .search-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .search-bar {
          width: 60%;
          max-width: 500px;
          border: 2px solid #0d6efd;
          border-radius: 30px;
          padding: 10px 20px;
          transition: all 0.3s ease;
          box-shadow: 0px 4px 10px rgba(13, 110, 253, 0.15);
        }

        .search-bar:focus {
          border-color: #0a58ca;
          box-shadow: 0px 4px 20px rgba(13, 110, 253, 0.25);
          outline: none;
          transform: scale(1.02);
        }

        .product-card {
          border: none;
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s ease;
          background: #ffffff;
        }

        .product-card:hover {
          transform: translateY(-10px) scale(1.03);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .img-container {
           overflow: hidden;
  height: 260px;
  border-radius: 20px 20px 0 0;
  display: flex;
  justify-content: center; /* center horizontally */
  align-items: center; 
        }

        .product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .product-card:hover .product-img {
          transform: scale(1.1);
        }

        .price-tag {
          font-size: 1.1rem;
        }


        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

       
        @media (max-width: 768px) {
          .search-bar {
            width: 90%;
          }
          .product-card {
            border-radius: 15px;
          }
        }
      `}</style>
    </div>
  );
}
