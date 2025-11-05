import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/adminnavbar";
import Footer from "../components/footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import AdminorderCard from "../components/adminorderCard";
import Loading from "../components/Loading";

export default function Adminorders() {

  const [orders, setOrders] = useState([]);
  const [ loading,setLoading] = useState(false)

  const fetchOrders = function () {
    setLoading(true)
    axios
      .get(import.meta.env.VITE_APP_API + "/adminorders", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setOrders(res.data.data);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(()=>{
        setLoading(false)
      })
      
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <>
     <AdminNavbar />
        <Loading/>
     <Footer/>
    </>

  return (
    <div>
      <AdminNavbar />

      <section className="container mt-5 pt-5 mb-3">
        <h2 className="mb-4">Orders</h2>
        <div className="card shadow-sm">
          <div className="card-body">
            <h3 className="card-title mb-4 text-center">Orders List</h3>

            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Sno</th>
                    <th>User Name</th>
                    <th>Product</th>
                    <th>Address</th>
                    <th>Payment Status</th>
                    <th>Payment Method</th>
                    <th>Order Date</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center text-muted py-4">
                        No Orders found.
                      </td>
                    </tr>
                  ) : (
                    orders.map((order,index) => {
                        return(
                            <AdminorderCard key={order._id} index={index} order={order} />
                        )
                   })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <ToastContainer></ToastContainer>
      <Footer />
    </div>
  );
}
