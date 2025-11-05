import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Cartcard(props) {
   
   const navigate = useNavigate()
   
    const {removeitem,changequantity,item} = props
    const [products,setProducts] = useState({...item})

    const setquantity = function(eve){
         setProducts({...products,[eve.target.name]:eve.target.value})
         changequantity(products._id,eve.target.value)
    }


    const incrementQuantity = () => {
      const newQty = Math.min(Number(products.quantity) + 1, 10)
      setProducts({...products, quantity: newQty})
      changequantity(products._id, newQty)
    }

    const decrementQuantity = () => {
      const newQty = Math.max(Number(products.quantity) - 1, 1)
      setProducts({...products, quantity: newQty})
      changequantity(products._id, newQty)
    }


  return (
      <div class="col-12 col-md-6 mx-2 card mb-3" style={{ maxWidth: "540px"}}>
                    <div class="row g-0">
                        <div class="col-md-4 d-flex justify-content-center align-items-center">
                        <img src={import.meta.env.VITE_APP_API+"/"+products.image} class="img-fluid rounded-start" alt="..."/>
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{products.product}</h5>
                            <p class="card-text"><b>₹</b>{products.price*products.quantity}</p>
                            <p class="card-text"><b>Quantity : </b>{products.quantity}</p>
                            <p class="card-text">{products.description.slice(0,50)+"..."}</p>
                            
                            <label className='form-label'><b>Quantity</b></label>
                            <div className="d-flex align-items-center gap-2 mb-2">
                              <button 
                                type="button" 
                                className="btn btn-light rounded-pill btn-md fw-bold "
                                onClick={decrementQuantity}
                              >
                                −
                              </button>
                              <span className="px-3 fw-semibold fs-6 border rounded">{products.quantity}</span>
                              <button 
                                type="button" 
                                className="btn btn-light rounded-pill btn-md fw-bold"
                                onClick={incrementQuantity}
                              >
                                +
                              </button>
                            </div>
                           

                            <button
                              type="button"
                              class="btn btn-sm btn-outline-secondary"
                              onClick={()=>navigate("/productdetailview",{ state : { product : products._id}}) }
                            >
                              More Details
                            </button>
                            <button className='btn btn-sm m-2 btn-danger' onClick={()=>removeitem(products._id)}>Remove</button>
                        </div>
                        </div>
                    </div>
                </div>
  )
}
