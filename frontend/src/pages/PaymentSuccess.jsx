import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "react-toastify/dist/ReactToastify.css";

export default function PaymentSuccess() {
  const [details, setDetails] = useState(null);
  const [searchParams] = useSearchParams();
  const sessionid = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionid) return;

    axios
      .get(`${import.meta.env.VITE_APP_API}/stripesession/${sessionid}`,{ headers : { Authorization : `Bearer ${localStorage.getItem("token")}`}})
      .then((res) => {
        if (res.data.status === 200) {
          setDetails(res.data.data);
        } else {
          toast.error("Invalid session details");
        }
      })
      .catch((err) => {
        toast.error("Server Error: " + (err.response?.data?.message || err.message));
      });
  }, [sessionid]);

  return (
    <>
      <Navbar />
      <ToastContainer position="top-center " />
      <div className="d-flex align-items-center py-5 justify-content-center min-vh-100 bg-light">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white rounded-4 shadow-lg p-5 text-center"
          style={{ maxWidth: "480px", width: "100%" }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
            className="mb-4"
          >
            <CheckCircle2 className="text-success" size={80} />
          </motion.div>

          <h2 className="fw-bold mb-3 text-dark">Payment Successful!</h2>
          <p className="text-secondary mb-4">
            Thank you for your purchase. Your transaction was completed successfully.
          </p>

          {details ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-light p-4 rounded-3 text-start mb-4"
            >
              <h5 className="fw-bold mb-3 text-success">Transaction Details</h5>
              <p className="mb-1 text-break">
                <strong>Payment ID:</strong> {details.payment_intent || details.id}
              </p>
              <p className="mb-1">
                <strong>Amount:</strong>{" "}
                {details.amount_total
                  ? `₹${(details.amount_total / 100).toFixed(2)}`
                  : "N/A"}
              </p>
              <p className="mb-1">
                <strong>Status:</strong>{" "}
                <span className="text-success text-capitalize">
                  {details.payment_status || "succeeded"}
                </span>
              </p>
            </motion.div>
          ) : (
            <p className="text-muted">Fetching transaction details...</p>
          )}

          <Link to="/" className="btn btn-success px-4 py-2 rounded-pill shadow-sm">
            Go to Dashboard
          </Link>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
