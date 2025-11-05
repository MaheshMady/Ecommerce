import React from "react";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios"

export default function PaymentFailure() {

  const [searchParams] = useSearchParams()
  const sessionid = searchParams.get("session_id")


useEffect(() => {
    if (!sessionid) return;

    axios
      .delete(`${import.meta.env.VITE_APP_API}/updatestripesession/${sessionid}`,{ headers : { Authorization :`Bearer ${localStorage.getItem("token")}`}})
      .catch((err) => {
        toast.error("Server Error: " + (err.response?.data?.message || err.message));
      });
  }, [sessionid]);

  return (

    <>
     
     <Navbar/>
      
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-4 shadow-lg p-5 text-center"
        style={{ maxWidth: "420px", width: "100%" }}
      >
        <motion.div
          initial={{ rotate: -20, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
          className="mb-4"
        >
          <XCircle className="text-danger" size={80} />
        </motion.div>

        <h2 className="fw-bold mb-3 text-dark">Payment Failed</h2>
        <p className="text-secondary mb-4">
          Oops! Something went wrong while processing your payment. Please try
          again or contact support.
        </p>

        <Link
          to="/"
          className="btn btn-danger px-4 py-2 rounded-pill shadow-sm"
        >
          Try Again
        </Link>
      </motion.div>
    </div>

    <Footer/>
    </>
    
  );
}
