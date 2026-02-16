import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="fe-hero">
      <div className="container fe-container-narrow">
        <div className="fe-hero-grid">
          <div>
            <div className="fe-eyebrow">
              <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
              Built for clarity-first investing
            </div>

            <h1 className="fe-h1">
              Trade with confidence.
              <br />
              Invest with control.
            </h1>

            <p className="fe-lead">
              Finedge brings a clean trading dashboard, transparent reporting, and
              fast execution into one focused experience—designed for students,
              builders, and everyday investors.
            </p>

            <div className="d-flex flex-wrap gap-2">
              <Link to="/signup" className="btn fe-btn fe-btn-primary fe-animate">
                Create free account
              </Link>
              <Link to="/about" className="btn fe-btn fe-btn-secondary fe-animate">
                See how it works
              </Link>
              <a
                href="http://localhost:3001"
                className="btn fe-btn fe-btn-secondary fe-animate"
              >
                Open dashboard
              </a>
            </div>

            <div className="mt-4 fe-metric-row">
              <span className="fe-metric-pill">
                <i className="fa-solid fa-bolt" aria-hidden="true"></i>
                Real-time UI updates
              </span>
              <span className="fe-metric-pill">
                <i className="fa-solid fa-chart-line" aria-hidden="true"></i>
                Portfolio P&L + charts
              </span>
              <span className="fe-metric-pill">
                <i className="fa-solid fa-lock" aria-hidden="true"></i>
                Secure-by-design UX
              </span>
            </div>
          </div>

          <div className="fe-card fe-hero-visual fe-animate">
            <img
              src="media/images/homeHero.png"
              alt="Finedge trading dashboard preview"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "18px",
                boxShadow: "var(--fe-shadow-lg)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
