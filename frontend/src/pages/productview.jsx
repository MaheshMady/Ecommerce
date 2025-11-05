import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';

const Productview = () => {
  const location = useLocation()
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  const [error,setError] = useState({
    product: "",
    sellername: "",
    price: "",
    description: "",
    image: ""
  })

  const [image, setImage] = useState(null);

   const employeedetail = (eve) => {
    setEmployee({ ...employee, [eve.target.name]: eve.target.value });
  };

  const employeeimage = (eve) => {
    setImage(eve.target.files[0]);
  };

  const validateform = function(formdata,setError){

    const errors = {}


  if (!formdata.product || !/^[A-Za-z\s]+$/.test(formdata.product)) {
    errors.product = "Product Name must contain only letters and spaces.";
  }

  if (!formdata.sellername || !/^[A-Za-z\s]+$/.test(formdata.sellername.trim())) {
    errors.sellername = " Name must contain only letters and spaces.";
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

  const updateemp = async (eve) => {
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

    if(image){
       formdata.append("image", image || null)
    }

    formdata.append("product", employee.product);
    formdata.append("price", employee.price);
    formdata.append("sellername", employee.sellername);
    formdata.append("description", employee.description);


    try {
      const res = await axios.put(
        import.meta.env.VITE_APP_API + "/updateproduct/"+employee._id,
        formdata,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        setImage(null)
        fetchEmployee();
      }
    } catch (err) {
      toast.error(err.response.data.message || "Error submitting form");
    }
  };
 
  const fetchEmployee = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API}/employee/${location.state?.product}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setEmployee(res.data.data);
      } catch (err) {
        console.error("Failed to fetch employee", err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {

    fetchEmployee();
  }, []);

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (!employee) return <div className="container mt-5">Products not found</div>;

  return (
    <div className="container mt-5">
      <Link to="/admindashboard" className="btn btn-secondary mb-4">← Back</Link>
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title mb-4 ">Product Details</h3>
          <div className="row">
            <div className="col-md-4 d-flex align-items-center justify-content-center">
              {employee.image && (
                <img
                  src={import.meta.env.VITE_APP_API+"/"+employee.image}
                  alt={employee.name}
                  className="img-fluid rounded"
                />
              )}
            </div>
            <div className="col-md-8">
             <div className="card shadow-sm mb-5">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                Update Product Details
              </h2>

              <form className="row g-3" onSubmit={updateemp}>
                <div className="col-12 mb-3">
                  <label className="form-label h5">File Image</label>
                  <input
                    type="file"
                    name="image"
                    className="form-control"
                    onChange={employeeimage}
                    accept="image/*"
                  />
                  {error.image && <p className="text-danger">{error.image}</p>}
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
                  {error.product && <p className="text-danger">{error.product}</p>}
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
                  {error.price && <p className="text-danger">{error.price}</p>}
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
                  {error.sellername && <p className="text-danger">{error.sellername}</p>}
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
                  {error.description && <p className="text-danger">{error.description}</p>}
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
            </div>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>

  );
};

export default Productview;
