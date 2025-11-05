import React from "react";
import { Link } from "react-router-dom";

const CartIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    style={{ marginRight: "0.5rem", verticalAlign: "middle" }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="9" cy="20" r="1.5" fill="#1976d2" />
    <circle cx="17" cy="20" r="1.5" fill="#1976d2" />
    <path
      d="M6 6h15l-1.5 8.5a2 2 0 01-2 1.5H8a2 2 0 01-2-2V6zm0 0L3 3"
      stroke="#1976d2"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer-bg p-4 border-top">
      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-md-3 align-items-start g-md-3 g-2">
          {/* Logo and description */}
          <div className="col mb-3">
            <Link
              to="/"
              className="footer-logo d-flex align-items-center mb-2 text-decoration-none"
              aria-label="Company Logo"
            >
              <CartIcon />
              <span className="footer-brand">Ecommerce</span>
            </Link>
            <p className="mb-1 footer-desc">
              Your one-stop shop for modern ecommerce. Fast, secure, and always up-to-date.
            </p>
          </div>

          {/* Menu Section */}
          <div className="col mb-3">
            <h5 className="footer-heading mb-2">Menu</h5>
            <ul className="nav flex-column gap-1">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/products" className="footer-link">Products</Link></li>
              <li><Link to="/cart" className="footer-link">Cart</Link></li>
              <li><Link to="/order" className="footer-link">Orders</Link></li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="col mb-3">
            <h5 className="footer-heading mb-2">Support</h5>
            <ul className="nav flex-column gap-1">
              <li><Link to="/faq" className="footer-link">FAQ</Link></li>
              <li><Link to="/support" className="footer-link">Contact Support</Link></li>
              <li><Link to="/terms" className="footer-link">Terms of Service</Link></li>
              <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/refund" className="footer-link">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-2 footer-copy">
          © 2025 Ecommerce. All rights reserved.
        </div>
      </div>

      <style>{`
        .footer-bg {
          background: #ffffff;
          box-shadow: 0 -1px 4px rgba(0,0,0,0.05);
        }
        .footer-logo .footer-brand {
          color: #1976d2;
          font-size: 1.45rem;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        .footer-desc {
          font-size: 0.95rem;
          color: #5f6368;
          line-height: 1.4;
          max-width: 260px;
        }
        .footer-heading {
          color: #1976d2;
          font-weight: 600;
          font-size: 1.05rem;
        }
        .footer-link {
          color: #212b36;
          font-size: 1rem;
          text-decoration: none;
          transition: transform 0.2s ease, color 0.2s ease;
          display: inline-block;
          background: transparent !important;
        }
        .footer-link:hover {
          transform: scale(1.06);
          color: #1976d2;
          background: transparent !important;
        }
        .footer-copy {
          color: #9aa0a6;
          font-size: 0.9rem;
          margin-top: 0.5rem;
          border-top: 1px solid #e5e5e5;
          padding-top: 0.5rem;
        }
        @media (max-width: 768px) {
          .footer-bg .row {
            flex-direction: column !important;
            gap: 1rem;
          }
        }
      `}</style>
    </footer>
  );
}
