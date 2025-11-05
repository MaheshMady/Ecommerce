import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminNavbar() {
  let isAuth = localStorage.getItem("token")
  return (
    <div>
        <nav class="navbar fixed-top navbar-expand-lg rounded-bottom-5 shadow-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Ecommerce</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto d-flex gap-2 align-items-center mb-2 mb-lg-0">
        <li class="nav-item">
          <Link to="/admindashboard" className='text-decoration-none'>Home</Link>
        </li>
        

        { isAuth ? (
          <>
           <li class="nav-item">
         
          <Link to="/adminorders" className='text-decoration-none'>Orders</Link>
        </li>
          <li class="nav-item">
         
          <Link to="/logout" className='btn btn-danger rounded-3'>Logout</Link>
        </li>
        
          </>
           
        ):(
          <>
           <li class="nav-item">
          <Link to="/login" className='btn btn-primary rounded-3'>Login</Link>
        </li>
        <li class="nav-item">
          <Link to="/signin" className='btn btn-outline-primary rounded-3'>Signin</Link>
        </li>
          </>
        )}
        
        
      </ul>
    </div>
  </div>
</nav>
<style>
{`

.navbar {
  backdrop-filter: blur(12px);
  background: rgba(15, 15, 15, 0.75) !important;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.4s ease;
  padding: 0.8rem 1.5rem;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.3);
}

.navbar:hover {
  background: rgba(20, 20, 20, 0.9) !important;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
}

.navbar-brand {
  font-weight: 700;
  font-size: 1.5rem;
  color: #00bfff !important;
  letter-spacing: 1px;
  text-shadow: 0 0 10px rgba(0, 191, 255, 0.5);
  transition: all 0.3s ease;
}
.navbar-brand:hover {
  transform: scale(1.05);
  text-shadow: 0 0 20px rgba(0, 191, 255, 0.8);
}

.nav-item a {
  color: #e0e0e0 !important;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 6px 12px;
  border-radius: 6px;
}

.nav-item a:hover {
  background: linear-gradient(90deg, #00bfff, #007bff);
  color: #fff !important;
  transform: translateY(-2px);
  box-shadow: 0 3px 10px rgba(0, 191, 255, 0.4);
}


.btn {
  transition: all 0.3s ease;
  border: none;
}
.btn-primary {
  background: linear-gradient(90deg, #007bff, #00bfff);
  color: #fff;
}
.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.6);
}
.btn-outline-primary {
  color: #00bfff;
  border: 1px solid #00bfff;
}
.btn-outline-primary:hover {
  background: #00bfff;
  color: #fff;
  transform: translateY(-3px);
  box-shadow: 0 0 12px rgba(0, 191, 255, 0.6);
}
.btn-danger {
  background: linear-gradient(90deg, #ff4b2b, #ff416c);
  border: none;
}
.btn-danger:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 15px rgba(255, 65, 108, 0.6);
}


@media (max-width: 991px) {
  .navbar {
    background: rgba(15, 15, 15, 0.95) !important;
  }
  .nav-item a {
    display: block;
    padding: 10px;
  }
}
`}
</style>

    </div>
  )
}
