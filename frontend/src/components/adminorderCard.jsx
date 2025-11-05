import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function AdminOrderCard({ order, index }) {
  const [status, setStatus] = useState(order.orderStatus);

  const updateStatus = (id, newStatus) => {
    axios
      .patch(
        `${import.meta.env.VITE_APP_API}/updatestatus/${id}`,
        { status: newStatus },
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => toast.error("Error Occurred: " + err.response?.data?.message));
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{order.userid.name}</td>

      {/* Order Items */}
      <td className="d-flex flex-column">
        {order.items.map((item, idx) => (
          <div key={idx} className="d-flex align-items-start mb-2 gap-2">
            {item.productid.image ? (
              <img
                src={`${import.meta.env.VITE_APP_API}/${item.productid.image}`}
                alt={item.productid.product}
                className="img-fluid rounded-3"
                style={{ width: "60px", height: "60px", objectFit: "cover" }}
              />
            ) : (
              <div
                className="bg-secondary text-white d-flex justify-content-center align-items-center rounded-3"
                style={{ width: "60px", height: "60px" }}
              >
                No image
              </div>
            )}
            <div>
              <p className="mb-1"><b>Product:</b> {item.productid.product}</p>
              <p className="mb-0"><b>Qty:</b> {item.quantity}</p>
            </div>
          </div>
        ))}
      </td>

      <td>{order.address}</td>
      <td>{order.paymentStatus}</td>
      <td>{order.paymentmethod}</td>
      <td>{new Date(order.orderedAt).toLocaleDateString()}</td>

      {/* Status */}
      <td>
        {order.orderStatus === "Delivered" ? (
          <span className="badge bg-success">Delivered</span>
        ) : (
          <div className="d-flex flex-column gap-2">
            <span className="badge bg-secondary">{order.orderStatus}</span>
            <select
              className="form-select form-select-sm"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                updateStatus(order._id, e.target.value);
              }}
            >
              <option value="Packed">Packed</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        )}
      </td>
    </tr>
  );
}
