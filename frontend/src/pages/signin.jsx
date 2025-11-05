import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Loader from "../components/Loader";
import { GoogleLogin } from "@react-oauth/google";

export default function Signin() {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)

  const [signin, setSignin] = useState({
    name: "",
    email: "",
    password: "",
    phoneno: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    phoneno: "",
    address: "",
  });

  const detailset = (eve) => {
    setSignin({ ...signin, [eve.target.name]: eve.target.value });
  };

  const validateForm = () => {
    const errors = {};
    const regex = {
      name: /^[A-Za-z\s]{3,30}$/,
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
      password:
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      phoneno: /^[6-9]\d{9}$/,
      address: /^[A-Za-z0-9\s,.-]{5,100}$/,
    };

    if (!signin.name.trim()) errors.name = "Name is required";
    else if (!regex.name.test(signin.name))
      errors.name = "Name must be 3–30 letters only";

    if (!signin.email.trim()) errors.email = "Email is required";
    else if (!regex.email.test(signin.email))
      errors.email = "Invalid email format";

    if (!signin.phoneno.trim()) errors.phoneno = "Phone number is required";
    else if (!regex.phoneno.test(signin.phoneno))
      errors.phoneno = "Invalid phone number";

    if (!signin.address.trim()) errors.address = "Address is required";
    else if (!regex.address.test(signin.address))
      errors.address = "Address must be 5–100 characters";

    if (!signin.password.trim()) errors.password = "Password is required";
    else if (!regex.password.test(signin.password))
      errors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const signup = (eve) => {
    eve.preventDefault();
    setLoading(true)

    if (!validateForm()) return;

    axios
      .post(import.meta.env.VITE_APP_API + "/signin", signin)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Something went wrong");
      })
      .finally(()=>{
        setLoading(false)
      })

    setSignin({
      name: "",
      email: "",
      password: "",
      phoneno: "",
      address: "",
    });
  };

  return (
    <>
      <Navbar />
      <StyledWrapper className="my-lg-5 my-5 p-3 pt-5 pt-lg-5 p-lg-1">
        <form className="form" onSubmit={signup}>
          <h2 className="text-center mb-3">Sign In</h2>

          <div className="flex-column">
            <label>Name</label>
          </div>
          <div className="inputForm">
            <input
              type="text"
              name="name"
              onChange={detailset}
              value={signin.name}
              placeholder="Enter your name"
              className="input"
              required
            />
          </div>
          {errors.name && <p className="error">{errors.name}</p>}

          <div className="flex-column">
            <label>Email</label>
          </div>
          <div className="inputForm">
            <input
              type="email"
              name="email"
              onChange={detailset}
              value={signin.email}
              placeholder="Enter your email"
              className="input"
              required
            />
          </div>
          {errors.email && <p className="error">{errors.email}</p>}

          <div className="flex-column">
            <label>Password</label>
          </div>
          <div className="inputForm">
            <input
              type="password"
              name="password"
              onChange={detailset}
              value={signin.password}
              placeholder="Enter your password"
              className="input"
              required
            />
          </div>
          {errors.password && <p className="error">{errors.password}</p>}

          <div className="flex-column">
            <label>Phone No</label>
          </div>
          <div className="inputForm">
            <input
              type="number"
              name="phoneno"
              onChange={detailset}
              value={signin.phoneno}
              placeholder="Enter your phone number"
              className="input"
              required
            />
          </div>
          {errors.phoneno && <p className="error">{errors.phoneno}</p>}

          <div className="flex-column">
            <label>Address</label>
          </div>
          <div className="inputForm">
            <textarea
              name="address"
              onChange={detailset}
              value={signin.address}
              placeholder="Enter your address"
              className="input textarea"
              required
            />
          </div>
          {errors.address && <p className="error">{errors.address}</p>}

          <button type="submit" className="button-submit" disabled={loading}>
            { loading ? <Loader/> : "Submit"}
          </button>

           <p className="p line">Or With</p>

          <GoogleLogin
            onSuccess={(credentials) => {
              axios
                .post(`${import.meta.env.VITE_APP_API}/googleauth`, {
                  id_token: credentials.credential,
                })
                .then((res) => {
                  if (res.status === 200) {
                    toast.success(res.data.message);
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("id", res.data.id);
                    localStorage.setItem("role", res.data.role);

                    setTimeout(() => {
                       if (res.data.role === "admin") navigate("/admindashboard");
                       else navigate("/");
                    }, 1500);
                  } else if (res.status === 400) {
                    toast.error(res.data.message);
                  }
                })
                .catch((err) => {
                  toast.error(err.response.data.message);
                });
            }}
            onError={() => {
              toast.error("Error Occured please try again Later");
            }}
          ></GoogleLogin>

          <p className="p">
            Already have an account?{" "}
            <Link to="/login" className="span">
              Login
            </Link>
          </p>
          
        </form>
      </StyledWrapper>
      <ToastContainer style={{ top: "100px" }}/>
      <Footer />
    </>
  );
}

const StyledWrapper = styled.div`
  min-height: 100vh;
  background-color: #f6f8fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;

  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    padding: 30px;
    width: 450px;
    border-radius: 20px;
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);
  }

  .flex-column > label {
    color: #151717;
    font-weight: 600;
  }

  .inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    transition: 0.2s ease-in-out;
  }

  .textarea {
    min-height: 80px;
    resize: none;
    padding-top: 10px;
  }

  .input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 15px;
  }

  .inputForm:focus-within {
    border-color: #2d79f3;
  }

  .error {
    color: #dc3545;
    font-size: 14px;
    margin: -5px 0 5px 5px;
  }

  .button-submit {
    margin: 20px 0 10px 0;
    background-color: #151717;
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
  }
    
  .button-submit:hover {
    background-color: #2d79f3;
  }

  .p {
    text-align: center;
    color: #000;
    font-size: 14px;
    margin-top: 10px;
  }

  .span {
    color: #2d79f3;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
  }

  .span:hover {
    text-decoration: underline;
  }
`;
