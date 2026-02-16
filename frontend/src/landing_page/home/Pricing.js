import React from "react";

function Pricing() {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-lg-5">
          <h1 className="display-5 fw-bold mb-4" style={{ color: "#2c3e50" }}>
            Unbeatable pricing
          </h1>
          <p className="lead text-muted mb-4">
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
          <a 
            href="/pricing" 
            className="btn btn-primary btn-lg d-inline-flex align-items-center gap-2"
            style={{ 
              backgroundColor: "#387ed1",
              border: "none",
              borderRadius: "8px",
              padding: "12px 24px",
              textDecoration: "none",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#2c5aa0";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#387ed1";
              e.target.style.transform = "translateY(0)";
            }}
          >
            See pricing 
            <i className="fas fa-arrow-right"></i>
          </a>
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-6">
          <div className="row g-4">
            <div className="col-md-6">
              <div 
                className="card h-100 text-center border-0 shadow-lg"
                style={{ 
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
                  color: "white",
                  transition: "transform 0.3s ease"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div className="card-body p-4">
                  <div className="mb-3">
                    <i className="fas fa-rupee-sign fa-2x opacity-75"></i>
                  </div>
                  <h1 className="display-4 fw-bold mb-3">₹0</h1>
                  <p className="mb-0 opacity-90">
                    Free account opening and<br />
                    equity delivery trades
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div 
                className="card h-100 text-center border-0 shadow-lg"
                style={{ 
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
                  color: "white",
                  transition: "transform 0.3s ease"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div className="card-body p-4">
                  <div className="mb-3">
                    <i className="fas fa-chart-line fa-2x opacity-75"></i>
                  </div>
                  <h1 className="display-4 fw-bold mb-3">₹20</h1>
                  <p className="mb-0 opacity-90">
                    Intraday and F&O trades
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <small className="text-muted">
              <i className="fas fa-shield-alt me-2"></i>
              All investments are subject to market risks
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;