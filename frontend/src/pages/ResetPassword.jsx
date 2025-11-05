import React, { useState } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Loader } from "lucide-react";

export default function ResetPassword() {
  const [ loading , setLoading ] = useState(false)
  const navigate = useNavigate()
  const { token } = useParams();
  const [admin, setAdmin] = useState("");
  const [waitmsg, setWaitmsg] = useState(false);
  const [errmsg, setErrmsg] = useState(false);

  function adminset(eve) {
    setAdmin(eve.target.value);
    setErrmsg(false);
  }

  function login(eve) {
    eve.preventDefault();
    setLoading(true)

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(admin)) {
      setErrmsg(true);
      return;
    }

    setWaitmsg(true);

    axios
      .post(import.meta.env.VITE_APP_API + "/resetpassword", {
        password: admin,
        token: token,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          setWaitmsg(false);
          setTimeout(()=>{
            navigate("/login")
          },1500)
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
    <Navbar/>
      <StyledWrapper>
        <form className="form" onSubmit={login}>
          <h2 className="text-center mb-3">Enter New Password</h2>

          <div className="flex-column">
            <label>New Password</label>
          </div>
          <div className="inputForm">
            <input
              type="password"
              name="password"
              onChange={adminset}
              value={admin}
              className="input"
              placeholder="********"
              required
              autoComplete="new-password"
            />
          </div>

          {errmsg && (
            <p className="error">
              Password must contain at least 8 characters, including uppercase,
              lowercase, number, and special character.
            </p>
          )}
          {waitmsg && <p className="wait">Please Wait...</p>}

          <button type="submit" className="button-submit" disabled={loading}>
            { loading ? <Loader/> : "Submit"}
          </button>

          <p className="p">
            <Link to="/login" className="span">
              If you changed your password, please login
            </Link>
          </p>
        </form>
      </StyledWrapper>
      <ToastContainer />
      <Footer/>
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

  .error {
    color: #dc3545;
    font-size: 13px;
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
