import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../components/modal";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import Loading from "../components/Loading";

export default function Payment() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ordered, setordered] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const [paymentdetail, setPaymentdetail] = useState({
    phoneno: 0,
    address: "",
    pincode: 0,
    paymentmethod: "",
  });

  const [error, seterror] = useState({
    phoneno: false,
    pincode: false,
    address: false,
    paymentmethod: false,
  });

  const paymentdetailset = function (eve) {
    setPaymentdetail({ ...paymentdetail, [eve.target.name]: eve.target.value });
  };

  const validatepayment = function () {
    const errors = {};

    const phoneRegex = /^[6-9]\d{9}$/;
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    const addressRegex = /^[a-zA-Z0-9\s,.-/]{5,}$/;

    if (!phoneRegex.test(paymentdetail.phoneno)) {
      errors.phoneno = "Please enter a valid 10-digit phone number";
    }

    if (!pincodeRegex.test(paymentdetail.pincode)) {
      errors.pincode =
        "Please enter a valid 6-digit pincode (should not start with 0)";
    }

    if (!addressRegex.test(paymentdetail.address)) {
      errors.address = "Address must be at least 5 characters long";
    }

    if (!paymentdetail.paymentmethod) {
      errors.paymentmethod = "Please Choose A payment Method";
    }

    seterror(errors);

    return Object.keys(errors).length === 0;
  };

  const placeOrder = async function () {
    if (!validatepayment()) {
      return;
    }

    try {
      let stripe = await loadStripe(import.meta.env.VITE_APP_PUBLISHABLE_KEY);

      let cartitemsdetails = cartItems.map((item) => ({
        productid: item._id,
        name: item.product,
        image: item.image,
        quantity: item.quantity,
        price: item.price,
      }));

      let orderdetails = { products: cartitemsdetails, ...paymentdetail };

      try {
        setLoading(true);

        const res = await axios.post(
          `${import.meta.env.VITE_APP_API}/order/${localStorage.getItem("id")}`,
          orderdetails,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("Backend Response:", res.data);

        if (res.status === 200 && res.data.url) {
          localStorage.removeItem("cart");
          window.location.href = res.data.url;
        } else if (res.status === 200 && res.data.message) {
          localStorage.removeItem("cart");
          setordered(true);
        } else {
          toast.error("Unexpected response from server");
        }
      } catch (err) {
        console.error(err);
        toast.error(
          err.response?.data?.message || "Order failed. Try again later."
        );
      } finally {
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Error Occured ! TRY AGAIN LATER");
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );


  const openmodal = () => setordered(true);
  const hidemodal = () => setordered(false);

  if (loading)
    return (
      <>
        <Navbar />
        <Loading />
        <Footer />
      </>
    );

  return (
    <div>
      <Navbar />

      <div className="container mt-5 pt-5">
        <h2 className="mb-4">Payment</h2>

        <div className="row">
          <div className="col-md-7">
            <div className="card p-4 shadow-sm mb-4">
              <h4>Order Summary</h4>
              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center mb-3 border-bottom pb-3"
                  >
                    <img
                      src={import.meta.env.VITE_APP_API + "/" + item.image}
                      alt={item.product}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                      className="me-3 rounded"
                    />
                    <div className="flex-grow-1">
                      <h6>{item.product}</h6>
                      <p className="mb-1">Qty: {item.quantity}</p>
                      <p className="mb-0">₹{item.price} each</p>
                    </div>
                    <div>
                      <strong>
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </strong>
                    </div>
                  </div>
                ))
              )}
              <div className="d-flex justify-content-between pt-3 border-top">
                <strong>Total:</strong>
                <strong>₹{totalPrice.toFixed(2)}</strong>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="card p-4 shadow-sm mb-2">
              <h4>Payment Address</h4>
              <div className="d-flex flex-column gap-3 mt-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Phone Number"
                  name="phoneno"
                  onChange={paymentdetailset}
                  required
                />
                {error.phoneno && (
                  <p className="text-danger">{error.phoneno}</p>
                )}
                <input
                  type="number"
                  className="form-control"
                  placeholder="Pincode"
                  onChange={paymentdetailset}
                  name="pincode"
                  required
                />
                {error.pincode && (
                  <p className="text-danger">{error.pincode}</p>
                )}
                <textarea
                  className="form-control"
                  placeholder="Address"
                  name="address"
                  onChange={paymentdetailset}
                  required
                ></textarea>
                {error.address && (
                  <p className="text-danger">{error.address}</p>
                )}
              </div>
            </div>

            <div className="card p-4 my-3 shadow-sm">
              <h4>Choose Payment Method</h4>
              <div className="d-grid gap-3 mt-3">
                {/* <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentmethod"
                    id="upi"
                    value="UPI"
                    onClick={paymentdetailset}
                  />
                  <label className="form-check-label" htmlFor="upi">
                    UPI
                  </label>
                </div> */}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentmethod"
                    id="card"
                    value="Card"
                    onClick={paymentdetailset}
                  />
                  <label className="form-check-label" htmlFor="card">
                    Debit / Credit Card
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentmethod"
                    id="cod"
                    value="CashOnDelivery"
                    onClick={paymentdetailset}
                  />
                  <label className="form-check-label" htmlFor="cod">
                    Cash on Delivery
                  </label>
                </div>
                {error.paymentmethod && (
                  <p className="text-danger">{error.paymentmethod}</p>
                )}
              </div>

              <div className="mt-4 text-center">
                {cartItems.length > 0 && (
                  <button
                    className="btn btn-primary w-100"
                    onClick={placeOrder}
                  >
                    Pay ₹{totalPrice.toFixed(2)}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={ordered}>
        <div className="modal-content">
          <div className="modal-body">
            <p>
              Thank you for your purchase! Your order has been placed
              successfully.
            </p>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => {
                setordered(false);
                setCartItems([]);
                localStorage.removeItem("cart");
                navigate("/");
              }}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      <ToastContainer />
      <Footer />
    </div>
  );
}
