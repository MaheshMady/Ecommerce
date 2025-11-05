import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Logout() {

    const navigate = useNavigate()

    useEffect(()=>{
         
        localStorage.removeItem("token")
        localStorage.removeItem("id")
        localStorage.removeItem("role");
        navigate("/login")
    },[navigate])
  
    

}
