import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { ToastContainer , toast } from "react-toastify"
import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function Verifyemail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // verifying | success | failed
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_APP_API}/verifyemail`,
          {
            token: searchParams.get("token")
          }
        );

        if (res.data.success) {
          toast.success(res.data.message)
          setStatus("success");
          setMessage("Your email has been verified successfully!");
          setTimeout(() => navigate("/login"), 2500);
        } else {
          toast.error(res.data.message)
          setStatus("failed");
          setMessage(res.data.message || "Verification failed.");
        }
      } catch (err) {
         toast.error(res.data.message)
        setStatus("failed");
        setMessage(
          err.response?.data?.message || "Invalid or expired verification link."
        );
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  const renderContent = () => {
    switch (status) {
      case "verifying":
        return (
          <motion.div
            key="verifying"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <Loader2 className="animate-spin text-blue-600" size={60} />
            <h2 className="text-lg font-medium text-gray-700">{message}</h2>
          </motion.div>
        );

      case "success":
        return (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-3"
          >
            <CheckCircle className="text-green-600" size={70} />
            <h2 className="text-2xl font-semibold text-green-700">
              Email Verified!
            </h2>
            <p className="text-gray-600">{message}</p>
            <p className="text-gray-500 text-sm animate-pulse">
              Redirecting to login...
            </p>
          </motion.div>
        );

      case "failed":
        return (
          <motion.div
            key="failed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-3"
          >
            <XCircle className="text-red-500" size={70} />
            <h2 className="text-2xl font-semibold text-red-700">
              Verification Failed
            </h2>
            <p className="text-gray-600">{message}</p>
            <button
              onClick={() => navigate("/signin")}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition"
            >
              Go Back to Signup
            </button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Navbar/>
        <div className="min-h-screen my-5 flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md text-center"
      >
        {renderContent()}
      </motion.div>
      <ToastContainer/>
    </div>

    <Footer/>
    </>

  );
}
