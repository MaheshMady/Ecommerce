import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "lucide-react";

export default function Forgotpassword() {
  const [ loading,setLoading] = useState(false)
  const [admin, setAdmin] = useState("");
  const [waitmsg, setWaitmsg] = useState(false);

  function adminset(eve) {
    setAdmin(eve.target.value);
  }

  function login(eve) {
    eve.preventDefault();
    setLoading(true)
    setWaitmsg(true);

    axios
      .post(import.meta.env.VITE_APP_API + "/forgotpassword", { email: admin })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          setWaitmsg(false);
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Something went wrong");
      })
      .finally(()=>{
        setLoading(false)
      })

    setAdmin("");
  }

  return (
    <>
      <Navbar />
      <StyledWrapper>
        <form className="form" onSubmit={login}>
          <h2 className="text-center mb-3">Forgot Password</h2>

          <div className="flex-column">
            <label>Enter Email</label>
          </div>
          <div className="inputForm">
            <input
              type="email"
              name="email"
              onChange={adminset}
              value={admin}
              placeholder="sample@gmail.com"
              className="input"
              required
              autoComplete="username"
            />
          </div>

          {waitmsg && <p className="wait">Please Wait...</p>}

          <button type="submit" className="button-submit" disabled={loading}>
            { loading ? <Loader/> : "Submit"}
          </button>

          <p className="p">
            <Link to="/login" className="span">
              Back to Login
            </Link>
          </p>
        </form>
      </StyledWrapper>
      <ToastContainer />
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
    width: 400px;
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

  .input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 15px;
  }

  .inputForm:focus-within {
    border-color: #2d79f3;
  }

  .wait {
    color: #dc3545;
    font-size: 14px;
    margin-top: -5px;
  }

  .button-submit {
    margin-top: 10px;
    background-color: #151717;
    border: none;
    color: white;
    font-size: 16px;
    font-weight: 500;
    border-radius: 10px;
    height: 50px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
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
