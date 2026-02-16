import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [activeLink, setActiveLink] = useState("");

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top fe-navbar"
    >
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="media/images/logo.svg"
            style={{ height: "30px" }}
            alt="Finedge Logo"
            className="me-2"
          />
          <span className="fw-bold" style={{ color: "#14978B", fontSize: "1.2rem", letterSpacing: "0.02em" }}>
            Finedge
          </span>
        </Link>
        
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ boxShadow: "none" }}
        >
          <i className="fas fa-bars" style={{ color: "#14978B" }}></i>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {[
              { to: "/signup", label: "Signup", icon: "fas fa-user-plus" },
              { to: "/about", label: "About", icon: "fas fa-info-circle" },
              { to: "/product", label: "Products", icon: "fas fa-cube" },
              { to: "/pricing", label: "Pricing", icon: "fas fa-tag" },
              { to: "/support", label: "Support", icon: "fas fa-headset" }
            ].map((item, index) => (
              <li className="nav-item mx-1" key={index}>
                <Link 
                  className={`nav-link px-3 py-2 rounded-pill d-flex align-items-center gap-2 ${activeLink === item.to ? 'active' : ''}`}
                  to={item.to}
                  onClick={() => setActiveLink(item.to)}
                  style={{
                    color: activeLink === item.to ? "#fff" : "#6c757d",
                    backgroundColor: activeLink === item.to ? "#0d9488" : "transparent",
                    fontWeight: "500",
                    textDecoration: "none"
                  }}
                  onMouseOver={(e) => {
                    if (activeLink !== item.to) {
                      e.target.style.backgroundColor = "rgba(13, 148, 136, 0.08)";
                      e.target.style.color = "#0d9488";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (activeLink !== item.to) {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#6c757d";
                    }
                  }}
                >
                  <i className={item.icon} style={{ fontSize: "0.9rem" }}></i>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="ms-3">
            <Link 
              to="/dashboard" 
              className="btn d-flex align-items-center gap-2 fe-btn fe-btn-primary fe-animate"
              style={{
                borderRadius: "25px",
                padding: "8px 20px",
                textDecoration: "none",
              }}
              onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
              onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
            >
              <i className="fas fa-chart-line"></i>
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
