import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  let isAuth = localStorage.getItem("token") && localStorage.getItem("role")  == "user"
  return (
    <div>
        <nav class="navbar fixed-top navbar-expand-lg rounded-bottom-5 shadow-lg bg-body-tertiary">
  <div class="container-fluid">
   
    <Link to="/" className="navbar-brand">
                Ecommerce
              </Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto d-flex gap-2 align-items-center mb-2 mb-lg-0">
        <li class="nav-item">
          <Link to="/" className='text-decoration-none'>Home</Link>
        </li>
        <li class="nav-item">
          <Link to="/products" className='text-decoration-none'>Products</Link>
        </li>
        

        { isAuth ? (
          <>
           <li class="nav-item">
          <Link to="/profile" className='text-decoration-none'>Profile</Link>
        </li>
          <li class="nav-item">
          <Link to="/order" className='text-decoration-none'>Orders</Link>
        </li>
           <li class="nav-item">
          <Link to="/cart" className='text-decoration-none'>Cart</Link>
        </li>
          <li >
          <Link to="/logout" className='btn btn-danger rounded-3'>Logout</Link>
        </li>
          </>
           
        ):(
          <>
           <li >
          <Link to="/login" className='btn btn-primary rounded-3 nav-btns'>Login</Link>
        </li>
        <li >
          <Link to="/signin" className='btn btn-outline-primary nav-btns rounded-3'>Signin</Link>
        </li>
          </>
        )}
        
        
      </ul>
    </div>
  </div>
</nav>
<style>
{`
/* Base navbar */
.navbar {
  backdrop-filter: blur(15px);
  background: rgba(255, 255, 255, 0.65) !important;
  border: 1px solid rgba(255, 255, 255, 0.25);
  transition: all 0.4s ease;
  padding: 0.8rem 1.5rem;
}
.navbar:hover {
  background: rgba(255, 255, 255, 0.9) !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}

/* Brand */
.navbar-brand {
  font-weight: 700;
  font-size: 1.4rem;
  color: #0d6efd !important;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}
.navbar-brand:hover {
  color: #0056d2 !important;
  transform: translateY(-1px);
}

/* Nav links */
.nav-item {
  list-style: none;
  position: relative;
}
.nav-item a {
  color: #222 !important;
  font-weight: 500;
  position: relative;
  transition: all 0.3s ease;
  padding: 6px 10px;
  border-radius: 8px;
}

.nav-btns:hover{
  color: #fff6f6ff !important;
}

/* Line animation — left to right */
.nav-item a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0%;
  height: 2px;
  background: linear-gradient(90deg, #0d6efd, #6610f2);
  transition: width 0.3s ease;
  border-radius: 2px;
}

/* Disable line for buttons (login/logout/signin) */
.nav-item a.btn::after {
  display: none;
}

/* Hover effect for regular nav links */
.nav-item a:hover::after {
  width: 100%;
}

.nav-item a:hover {
  color: #0d6efd !important;
  transform: translateY(-1px);
}

/* Base navbar */
.navbar {
  backdrop-filter: blur(15px);
  background: rgba(255, 255, 255, 0.65) !important;
  border: 1px solid rgba(255, 255, 255, 0.25);
  transition: all 0.4s ease;
  padding: 0.8rem 1.5rem;
}
.navbar:hover {
  background: rgba(255, 255, 255, 0.9) !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}

/* Brand */
.navbar-brand {
  font-weight: 700;
  font-size: 1.4rem;
  color: #0d6efd !important;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}
.navbar-brand:hover {
  color: #0056d2 !important;
  transform: translateY(-1px);
}

/* Nav links */
.nav-item {
  list-style: none;
  position: relative;
}
.nav-item a {
  color: #222 !important;
  font-weight: 500;
  position: relative;
  transition: all 0.3s ease;
  padding: 6px 10px;
  border-radius: 8px;
}

/* Line animation — left to right */
.nav-item a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0%;
  height: 2px;
  background: linear-gradient(90deg, #0d6efd, #6610f2);
  transition: width 0.3s ease;
  border-radius: 2px;
}

/* Disable line for buttons (login/logout/signin) */
.nav-item a.btn::after {
  display: none;
}

/* Hover effect for regular nav links */
.nav-item a:hover::after {
  width: 100%;
}

.nav-item a:hover {
  color: #0d6efd !important;
  transform: translateY(-1px);
}

/* Buttons (no custom hover styling — Bootstrap default only) */
.btn {
  font-weight: 500;
  transition: none;
}
.btn:hover {
  transform: none;
  color: inherit !important;
  box-shadow: none !important;
}

/* Responsive */
@media (max-width: 991px) {
  .navbar {
    background: rgba(255, 255, 255, 0.95) !important;
    padding: 1rem;
  }
  .navbar-nav {
    text-align: center;
  }
}

@media (max-width: 768px) {
  .navbar-brand {
    font-size: 1.2rem;
  }
  .nav-item a {
    padding: 10px;
    font-size: 1rem;
  }
}

/* Scroll shadow */
.navbar.fixed-top.scrolled {
  background: rgba(255, 255, 255, 0.98) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
}


/* Responsive */
@media (max-width: 991px) {
  .navbar {
    background: rgba(255, 255, 255, 0.95) !important;
    padding: 1rem;
  }
  .navbar-nav {
    text-align: center;
  }
}

@media (max-width: 768px) {
  .navbar-brand {
    font-size: 1.2rem;
  }
  .nav-item a {
    padding: 10px;
    font-size: 1rem;
  }
}

/* Scroll shadow */
.navbar.fixed-top.scrolled {
  background: rgba(255, 255, 255, 0.98) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
}

`}
</style>
    </div>
  )
}
