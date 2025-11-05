import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useEffect } from "react";
import axios from "axios";
import Modal from "../components/modal";
import {toast,ToastContainer} from "react-toastify"
import Loading from "../components/Loading";

export default function Profile() {
  const [user, setUser] = useState({});
  const [ loading,setLoading] = useState(false)

  const [modal, setModal] = useState(false);

  const [formData, setformData] = useState({
    name: "",
    phoneno: "",
    address: ""
  });

  const [error,setError] = useState({
     name: "",
    email: "",
    phoneno: "",
    address: ""
  })

  const openmodal = () =>{  setformData({
    name: user.name || "",
    email: user.email || "",
    phoneno: user.phoneno || "",
    address: user.address || "",
  }); setModal(true); }
  const closemodal = () => setModal(false);

  const fetchuser = () => {
    setLoading(true)
    axios
      .get(import.meta.env.VITE_APP_API + "/userdetail", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setUser(res.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response?.data?.message || "Something went wrong");
      })
      .finally(()=>{
        setLoading(false)
      })
  };

  useEffect(() => {
    fetchuser();
  }, []);

  const handleChange = (eve) => {
    setformData({ ...formData, [eve.target.name]: eve.target.value });
  };

  const validateform = () => {
    const errors = {};

    const regex = {
      name: /^[A-Za-z\s]{3,30}$/,
      password:
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      phoneno: /^[6-9]\d{9}$/,
      address: /^[A-Za-z0-9\s,.-]{5,100}$/
    };

    if (!regex.name.test(formData.name)) errors.name = "Invalid Name";
if (!regex.phoneno.test(formData.phoneno)) errors.phoneno = "Invalid Phone Number";
if (!regex.address.test(formData.address)) errors.address = "Invalid Address";


    
    setError(errors)
    return Object.keys(errors).length === 0;
  };

  const handleUpdate = (eve) => {
    eve.preventDefault();

    if(!validateform()){
      return
    }
   
    const updateddata = {
      name:formData.name,
      address:formData.address,
      phoneno:formData.phoneno
    }
    axios
      .patch(import.meta.env.VITE_APP_API + "/userdetailupdate",updateddata, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        if (res.data.status === 200) {
          toast.success(res.data.message);
          fetchuser()
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response?.data?.message || "Something went wrong");
      });


  };

   if (loading) return(
    <>
     <Navbar/>
        <Loading/>
     <Footer/>
    </>
  ) ;

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5 d-flex justify-content-center mb-3">
        <div
          className="card shadow-lg border-0 rounded-4 p-4"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <div className="card-body text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="User Avatar"
              className="rounded-circle mb-3"
              width="100"
              height="100"
            />
            <h4 className="card-title mb-3 text-capitalize">{user.name}</h4>

            <div className="text-start">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone No:</strong> {user.phoneno}
              </p>
              <p>
                <strong>Address:</strong> {user.address}
              </p>
            </div>

            <button className="btn btn-secondary mt-3 px-4" onClick={openmodal}>
              <i className="bi bi-pencil-square me-2"></i>Edit Profile
            </button>
          </div>

        </div>
        <ToastContainer/>
      </div>
      <Modal onClose={closemodal} show={modal}>

                <div className="modal-header ">
                  <h5 className="modal-title" id="editModalLabel">
                    Edit User Details
                  </h5>
                </div>
                <div className="modal-body ">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {error.name && <p className="error text-danger">{error.name}</p>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        readOnly
                      />
                      {error.email && <p className="error text-danger">{error.email}</p>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Phone No</label>
                      <input
                        type="number"
                        className="form-control"
                        name="phoneno"
                        value={formData.phoneno}
                        onChange={handleChange}
                      />
                      {error.phoneno && <p className="error text-danger">{error.phoneno}</p>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                      {error.address && <p className="error text-danger">{error.address}</p>}
                    </div>
                  </form>
                </div>
                <div className="modal-footer ">
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={closemodal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleUpdate}
                  >
                    Save Changes
                  </button>
                </div>


          </Modal>
      <Footer />
    </>
  );
}
