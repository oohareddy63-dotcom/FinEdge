import React, { useState } from "react";

function Signup() {
  const [mobile, setMobile] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (mobile.length !== 10) {
      setMessage("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    // Simulate API call
    setTimeout(() => {
      setMessage("OTP sent successfully! Check your mobile.");
      setIsSubmitting(false);
    }, 1500);
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 10) {
      setMobile(value);
    }
  };

  return (
    <div className="container-fluid" style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", minHeight: "100vh" }}>
      <div className="container py-5">
        <div className="row align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
          <div className="col-lg-5 text-center mb-5 mb-lg-0">
            <img
              src="media/images/signup.png"
              alt="Signup illustration"
              style={{ 
                width: "100%", 
                maxWidth: "400px",
                filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.1))"
              }}
            />
          </div>
          <div className="col-lg-6 offset-lg-1">
            <div 
              className="card border-0 shadow-lg"
              style={{ 
                borderRadius: "20px",
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)"
              }}
            >
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h1 className="display-6 fw-bold mb-3" style={{ color: "#2c3e50" }}>
                    Join Finedge
                  </h1>
                  <p className="text-muted lead">
                    Start your investment journey today
                  </p>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label fw-semibold text-muted mb-2">
                      Mobile Number
                    </label>
                    <div className="input-group input-group-lg">
                      <span 
                        className="input-group-text bg-light border-end-0"
                        style={{ 
                          borderRadius: "12px 0 0 12px",
                          border: "2px solid #e9ecef"
                        }}
                      >
                        <i className="fas fa-mobile-alt text-muted"></i>
                      </span>
                      <input
                        type="tel"
                        className="form-control border-start-0"
                        placeholder="Enter 10 digit mobile number"
                        value={mobile}
                        onChange={handleMobileChange}
                        maxLength="10"
                        required
                        style={{ 
                          borderRadius: "0 12px 12px 0",
                          border: "2px solid #e9ecef",
                          borderLeft: "none",
                          fontSize: "1.1rem",
                          padding: "12px 16px"
                        }}
                      />
                    </div>
                  </div>
                  
                  {message && (
                    <div 
                      className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'} d-flex align-items-center`}
                      style={{ borderRadius: "12px" }}
                    >
                      <i className={`fas ${message.includes('successfully') ? 'fa-check-circle' : 'fa-exclamation-triangle'} me-2`}></i>
                      {message}
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <small className="text-muted d-flex align-items-center">
                      <i className="fas fa-info-circle me-2"></i>
                      You will receive an OTP on your number
                    </small>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-lg w-100 mb-4 d-flex align-items-center justify-content-center gap-2"
                    disabled={isSubmitting || mobile.length !== 10}
                    style={{
                      background: mobile.length === 10 ? "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)" : "#6c757d",
                      border: "none",
                      borderRadius: "12px",
                      padding: "14px",
                      color: "white",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                      transform: isSubmitting ? "scale(0.98)" : "scale(1)"
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        Continue
                        <i className="fas fa-arrow-right"></i>
                      </>
                    )}
                  </button>
                </form>
                
                <div className="text-center">
                  <div className="d-flex align-items-center mb-3">
                    <hr className="flex-grow-1" />
                    <span className="px-3 text-muted small">OR</span>
                    <hr className="flex-grow-1" />
                  </div>
                  <p className="text-muted mb-2 small">
                    Want to open an NRI account?
                  </p>
                  <a 
                    href="/nri-account" 
                    className="btn btn-outline-primary"
                    style={{ 
                      borderRadius: "8px",
                      borderWidth: "2px",
                      fontWeight: "500"
                    }}
                  >
                    <i className="fas fa-globe me-2"></i>
                    NRI Account
                  </a>
                </div>

                <div className="mt-4 pt-3 border-top">
                  <div className="row text-center">
                    <div className="col-4">
                      <i className="fas fa-shield-alt text-success fa-2x mb-2"></i>
                      <small className="d-block text-muted">Secure</small>
                    </div>
                    <div className="col-4">
                      <i className="fas fa-clock text-primary fa-2x mb-2"></i>
                      <small className="d-block text-muted">Quick Setup</small>
                    </div>
                    <div className="col-4">
                      <i className="fas fa-rupee-sign text-warning fa-2x mb-2"></i>
                      <small className="d-block text-muted">Zero Fees</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
