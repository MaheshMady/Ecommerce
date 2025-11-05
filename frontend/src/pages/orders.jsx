import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../components/Loading";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading,setLoading] = useState(false)

  const fetchOrders = () => {
    setLoading(true)
    axios
      .get(import.meta.env.VITE_APP_API + "/order/" + localStorage.getItem("id"), {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setOrders(res.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response?.data?.message || "Something went wrong");
      })
      .finally(()=>{
        setLoading(false)
      })
  };

  useEffect(() => {
    fetchOrders();
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

      <section className="container mt-5 pt-5">
        <h2 className="mb-4">Your Orders</h2>

        {orders.length === 0 ? (
          <div className="alert text-center">
            You have no orders yet.
          </div>
        ) : (
          orders.map((order) => (
            <div className="card mb-4 shadow-sm" key={order._id}>
              <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                <div>
                  <h5 className="mb-1">Order </h5>
                  <small className="text-muted">
                    {new Date(order.orderedAt).toLocaleString()}
                  </small>
                </div>
                <span
                  className={`badge ${
                    order.orderStatus === "Delivered"
                      ? "bg-success"
                      : order.orderStatus === "Packed"
                      ? "bg-warning text-dark"
                      : "bg-primary"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>

              <div className="card-body">

                <div className="row mb-3">
                  <div className="col-md-6">
                    <p className="mb-1">
                      <strong>Shipping:</strong> {order.address}, {order.pincode}
                    </p>
                    <p className="mb-1">
                      <strong>Phone:</strong> {order.phoneno}
                    </p>
                  </div>
                  <div className="col-md-6 text-md-end">
                    <p className="mb-1">
                      <strong>Payment:</strong> {order.paymentmethod}
                    </p>
                    <p className="mb-1">
                      <strong>Payment Status:</strong> {order.paymentStatus == "success"?(<strong className="text-success">Paid</strong>):(<strong className="text-danger">Unpaid</strong>)}
                    </p>
                    <p className="mb-1">
                      <strong>Total:</strong> ₹{order.totalprice}
                    </p>
                  </div>
                </div>

 
                <div className="table-responsive">
                  <table className="table table-bordered mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Product</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-end">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="d-flex align-items-center gap-3">
                            <img
                              src={ import.meta.env.VITE_APP_API+"/"+item.productid.image || "https://via.placeholder.com/60"}
                              alt={item.productid.product}
                              className="img-fluid rounded"
                              style={{ width: "60px", height: "60px", objectFit: "cover" }}
                            />
                            <div>
                              <h6 className="mb-0">{item.productid.product}</h6>
                              <small className="text-muted">
                                {item.productid.description.slice(0, 60)}...
                              </small>
                            </div>
                          </td>
                          <td className="text-center align-middle">{item.quantity}</td>
                          <td className="text-end align-middle">₹{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      <ToastContainer />
      <Footer />
    </div>
  );
}
