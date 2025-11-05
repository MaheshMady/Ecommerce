import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Loader from "../components/Loader";
import { GoogleLogin } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  function adminset(e) {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  }

  function login(e) {
    e.preventDefault();
    setLoading(true);

    axios
      .post(import.meta.env.VITE_APP_API + "/login", admin)
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
        toast.error(err?.response?.data?.message || "Login failed");
      })
      .finally(() => {
        setLoading(false);
      });

    setAdmin({ email: "", password: "" });
  }

  return (
    <>
      <Navbar />
      <StyledWrapper className="d-flex my-lg-5 my-5 p-3 pt-5 pt-lg-5  p-lg-1 justify-content-center align-items-center vh-100 bg-light">
        <form className="form shadow" onSubmit={login}>
          <h2 className="text-center mb-3">Log In</h2>

          <div className="flex-column">
            <label>Email</label>
          </div>
          <div className="inputForm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 32 32"
            >
              <g data-name="Layer 3" id="Layer_3">
                <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
              </g>
            </svg>
            <input
              placeholder="Enter your Email"
              className="input"
              type="email"
              name="email"
              value={admin.email}
              onChange={adminset}
              required
              autoComplete="username"
            />
          </div>

          <div className="flex-column">
            <label>Password</label>
          </div>
          <div className="inputForm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="-64 0 512 512"
            >
              <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
              <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
            </svg>
            <input
              placeholder="Enter your Password"
              className="input"
              type="password"
              name="password"
              value={admin.password}
              onChange={adminset}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="flex-row d-flex justify-content-center">
            <Link to="/forgotpassword" className="span">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="button-submit" disabled={loading}>
            {loading ? <Loader /> : "Sign In"}
          </button>

          <p className="p">
            Don't have an account?
            <Link to="/signin" className="span">
              Sign Up
            </Link>
          </p>
          <p className="p line">Or With</p>
          <div className="d-flex justify-content-center">
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
          </div>

         
        </form>
        <ToastContainer style={{ top: "100px" }} />
      </StyledWrapper>
      <Footer />
    </>
  );
}

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    padding: 30px;
    width: 450px;
    border-radius: 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  ::placeholder {
    font-family: inherit;
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
    padding-left: 10px;
    transition: 0.2s ease-in-out;
  }

  .input {
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    width: 100%;
    height: 100%;
  }

  .input:focus {
    outline: none;
  }

  .inputForm:focus-within {
    border: 1.5px solid #2d79f3;
  }

  .flex-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .span {
    font-size: 14px;
    color: #2d79f3;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
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

  .button-submit:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }

  .button-submit:hover:not(:disabled) {
    background-color: #2d79f3;
  }

  .p {
    text-align: center;
    color: black;
    font-size: 14px;
    margin: 5px 0;
  }

  .btn {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    gap: 10px;
    border: 1px solid #ededef;
    background-color: white;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  .btn:hover {
    border: 1px solid #2d79f3;
  }
`;
