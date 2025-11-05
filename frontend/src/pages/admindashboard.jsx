import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "../components/adminnavbar";
import Footer from "../components/footer";
import Modal from "../components/modal";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

export default function AdminDashboard() {
  const [employee, setEmployee] = useState({
    product: "",
    sellername: "",
    price: 0,
    description: "",
  });

  const [ loadingProducts ,setLoadingProducts] = useState(false)

  const [error, setError] = useState({
    product: "",
    sellername: "",
    price: "",
    description: "",
    image: ""
  });

  const [image, setImage] = useState(null);
  const [employeesList, setEmployeesList] = useState([]);

  const [employeeshow,setEmployeeshow] = useState(null)
  const [showmodal,setShowmodal] = useState(false)

  const [delmodal,setDelmodal] = useState(false)
  const [ delid,setDelid] = useState(null)


  const openmodal = (Details)=>{ setEmployeeshow({...Details}) ;setShowmodal(true)}
  const hidemodal = ()=>{setShowmodal(false) ; setDelmodal(false)}

  const navigate = useNavigate()

  const fetchEmployees = async () => {
    try {
      setLoadingProducts(true)
      const res = await axios.get(import.meta.env.VITE_APP_API + "/employees", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setEmployeesList(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch employees");
    }
    finally{
     setLoadingProducts(false)
    }
  };

  const validateform = function(formdata,setError){

    const errors = {}


  if (!formdata.product || !/^[A-Za-z\s]+$/.test(formdata.product)) {
    errors.product = "Product Name must contain only letters and spaces.";
  }

  if (!formdata.sellername || !/^[A-Za-z\s]+$/.test(formdata.sellername.trim())) {
    errors.sellername = " Name must contain only letters and spaces.";
  }

  if (!formdata.image) {
    errors.image = "Image is required.";
  }


  if (!formdata.price || Number(formdata.price) <= 200) {
    errors.price = "Price must be greater than 200.";
  }


  if (!formdata.description || formdata.description.trim() === "") {
    errors.description = "Description cannot be empty.";
  }

  setError(errors);

  return Object.keys(errors).length === 0;
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  const employeedetail = (eve) => {
    setEmployee({ ...employee, [eve.target.name]: eve.target.value });
  };

  const employeeimage = (eve) => {
    setImage(eve.target.files[0]);
  };

  const addemp = async (eve) => {
    eve.preventDefault();

     const formValues = {
    product: employee.product,
    sellername: employee.sellername,
    price: employee.price,
    description: employee.description,
    image: image
  };
      
   if(!validateform(formValues,setError)){
      return;
    }

    const formdata = new FormData();
    formdata.append("image", image);
    formdata.append("product", employee.product);
    formdata.append("price", employee.price);
    formdata.append("sellername", employee.sellername);
    formdata.append("description", employee.description);

   

    try {
      const res = await axios.post(
        import.meta.env.VITE_APP_API + "/addemployee",
        formdata,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        setEmployee({
          product: "",
          sellername: "",
          price: 0,
          description: "",
        });
        setImage(null);
        fetchEmployees();
      }
    } catch (err) {
      toast.error(err.response.data.message || "Error submitting form");
    }
  };
 

  const deleteEmployee = async (id) => {

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_APP_API}/employee/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.status === 200) {
        toast.success("Employee deleted");
        fetchEmployees();
      }
    } catch (err) {
      toast.error("Failed to delete employee");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="p-4 bg-light min-vh-100 mt-5 pt-5">
        <div className="container">
          <div className="card shadow-sm mb-5">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                Enter Product Details
              </h2>

              <form className="row g-3" onSubmit={addemp}>
                <div className="col-12 mb-3">
                  <label className="form-label h5">File Image</label>
                  <input
                    type="file"
                    name="image"
                    className="form-control"
                    onChange={employeeimage}
                    accept="image/*"
                  />
                  {error.image && <p className="error">{error.image}</p>}
                </div>
                

                <div className="col-md-6">
                  <label className="form-label h5">Product Name</label>
                  <input
                    type="text"
                    name="product"
                    value={employee.product}
                    className="form-control input-animated"
                    onChange={employeedetail}
                    placeholder="Product"
                  />
                  {error.product && <p className="error">{error.product}</p>}
                </div>

                <div className="col-md-6">
                  <label className="form-label h5">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={employee.price}
                    className="form-control input-animated"
                    onChange={employeedetail}
                    placeholder="Price"
                  />
                  {error.price && <p className="error">{error.price}</p>}
                </div>

                <div className="col-md-6">
                  <label className="form-label h5">Seller Name</label>
                  <input
                    type="text"
                    name="sellername"
                    value={employee.sellername}
                    className="form-control input-animated"
                    onChange={employeedetail}
                    placeholder="Seller Name"
                  />
                  {error.sellername && <p className="error">{error.sellername}</p>}
                </div>
               

                <div className="col-12">
                  <label className="form-label h5">Description</label>
                  <textarea
                    name="description"
                    className="form-control input-animated"
                    placeholder="description"
                    onChange={employeedetail}
                    value={employee.description}
                    rows="3"
                  />
                  {error.description && <p className="error">{error.description}</p>}
                </div>
                

                <div className="col-12 d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary px-5 py-2 fw-semibold btn-animated"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
         { loadingProducts ? (
             <Loading/>
         ) : (
                     <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-4 text-center">Product List</h3>

              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Seller</th>
                      <th>Description</th>
                      <th>Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeesList.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center text-muted py-4">
                          No Products found.
                        </td>
                      </tr>
                    ) : (
                      employeesList.map((emp) => (
                        <tr key={emp._id}>
                          <td>{emp.product}</td>
                          <td>{emp.price}</td>
                          <td>{emp.sellername}</td>
                          <td>{emp.description.slice(0,100)+"..."}</td>
                          <td>
                            {emp.image ? (
                              <img
                                src={
                                  import.meta.env.VITE_APP_API + "/" + emp.image
                                }
                                alt={emp.product}
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              "No image"
                            )}
                          </td>
                          <td >
                            <div className="d-flex gap-2">
                              <button
                                onClick={() =>{ setDelid(emp._id); setDelmodal(true)}}
                                className="btn btn-link text-danger p-0"
                                title="Delete employee"
                                aria-label={`Delete employee ${emp.name}`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="currentColor"
                                  className="bi bi-trash"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6zm3 .5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5z" />
                                  <path
                                    fillRule="evenodd"
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 1 1 0-2h3.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1H14.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118z"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() =>
                                  navigate("/productview",{ state:{ product : emp._id}})
                                }
                                className="btn btn-link text-primary p-0"
                                title="View employee"
                                aria-label={`View employee ${emp.name}`}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>
                              </button>
                              <button onClick={()=>openmodal(emp)} className="btn">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="currentColor"
                                  className="bi bi-eye"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
         )}


          

      <Modal show={showmodal} onClose={hidemodal}>
        { employeeshow ? ( <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title mb-4">Product Details</h3>
          <div className="row">
            <div className="col-md-4">
              {employeeshow.image && (
                <img
                  src={import.meta.env.VITE_APP_API+"/"+employeeshow.image}
                  alt={employeeshow.name}
                  className="img-fluid rounded"
                />
              )}
            </div>
            <div className="col-md-8">
              <p><strong>Product Name:</strong> {employeeshow.product}</p>
              <p><strong>Price:</strong> {employeeshow.price}</p>
              <p><strong>Seller Name:</strong> {employeeshow.sellername}</p>
              <p><strong>Description:</strong> {employeeshow.description}</p>
            </div>
          </div>
        </div>
      </div>
    ):null}
       
      </Modal>

      <Modal show={delmodal} onClose={hidemodal}>
          <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
       <h1 class="modal-title fs-5" id="exampleModalLabel">Are you sure you want to delete ?</h1>
      </div>
      <div class="modal-footer d-flex gap-2">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={hidemodal}>Cancel</button>
        <button type="button" class="btn btn-primary" onClick={()=>{ deleteEmployee(delid); hidemodal()}}>Ok</button>
      </div>
    </div>
  </div>
      </Modal>

          <ToastContainer />
        </div>

        <style jsx>{`
          .input-animated {
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
          }

          .input-animated:focus {
            border-color: #0d6efd;
            box-shadow: 0 0 8px rgba(13, 110, 253, 0.3);
            outline: none;
          }

          .btn-animated {
            transition: background-color 0.3s ease, transform 0.2s ease;
          }

          .btn-animated:hover {
            background-color: #0b5ed7;
            transform: scale(1.05);
          }

          tbody tr:hover {
            background-color: #f8f9fa;
            cursor: pointer;
          }


          button.btn-link:hover {
            color: #dc3545;
          }
          
          .error{
          color: #dc3545;
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
}
