import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { useState } from 'react'
import { useEffect } from 'react'
import Cartcard from '../components/cartcard'
import { useNavigate } from 'react-router-dom'


export default function Cart() {
 
   const navigate = useNavigate()

    const [cartitems,setCartitems] = useState([])

    useEffect(()=>{
         setCartitems(JSON.parse(localStorage.getItem("cart")) || [])
    },[])

    const changequantity = function(id,quan){

      const addedquantity = cartitems.map((val)=> val._id == id ? {...val,quantity: quan}: val )
      setCartitems(addedquantity) 
      localStorage.setItem("cart",JSON.stringify(addedquantity))
    }
  
    const totalprice = cartitems && cartitems.reduce((tot,val)=> tot + val.price * val.quantity,0)
  
    const removeitem = function(id){
         const removedarray = cartitems.filter((val)=>val._id !== id)
         console.log(removedarray)
         setCartitems(removedarray)
         localStorage.setItem("cart",JSON.stringify(removedarray))
    }


  return (
    <div>
        <Navbar/>
          
          <section className='container mt-5  pt-5'>
            <h1 className="fw-light">Cart</h1>

             { cartitems.length > 0 ? (
               <div className='row '>
                 
                { cartitems && cartitems.map((val)=>{return(
                  <Cartcard key={val._id} changequantity={changequantity} removeitem={removeitem} item={val} />

                )})}
                
              </div>
             ) : (
               <div className='row '>
                 <section className='container my-5 p-5 border-dark rounded shadow-sm'><p className='text-center'>No more Products in cart</p></section>
               </div>
             )}
              
             
  <div className="card shadow-sm p-4 mb-3">
    <h4 className="mb-3">Order Summary</h4>
    <div className="d-flex justify-content-between">
      <span>Total Items:</span>
      <span>{cartitems.length}</span>
    </div>
    <div className="d-flex justify-content-between mb-3">
      <span>Total Price:</span>
      <strong>₹{totalprice.toFixed(2)}</strong>
    </div>
    { cartitems.length > 0 && <button className="btn btn-primary w-100" onClick={ ()=> navigate("/payment")}>Buy Now</button>}
    
  </div>

 
          </section>
        <Footer/>
    </div>
  )
}
