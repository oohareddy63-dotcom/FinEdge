import React from "react";
import { Link } from "react-router-dom";

function Stats() {
  return (
    <div className="container fe-container-narrow fe-section">
      <div className="row align-items-center g-4">
        <div className="col-lg-6">
          <div className="fe-eyebrow">
            <i className="fa-solid fa-handshake" aria-hidden="true"></i>
            Built for everyday investing
          </div>
          <h2 className="mt-3" style={{ letterSpacing: "-0.02em", fontWeight: 800 }}>
            Trust, without the noise
          </h2>
          <h2 className="fs-4">Customer-first always</h2>
          <p className="text-muted">
            That's why 1.3+ crore customers trust Finedge with ₹3.5+ lakh crores
            worth of equity investments.
          </p>
          <h2 className="fs-4">No spam or gimmicks</h2>
          <p className="text-muted">
            No gimmicks, spam, "gamification", or annoying push notifications.
            High quality apps that you use at your pace, the way you like.
          </p>
          <h2 className="fs-4">The Finedge universe</h2>
          <p className="text-muted">
            Not just an app, but a whole ecosystem. Our investments in 30+
            fintech startups offer you tailored services specific to your needs.
          </p>
          <h2 className="fs-4">Do better with money</h2>
          <p className="text-muted">
            With initiatives like Nudge and Kill Switch, we don't just
            facilitate transactions, but actively help you do better with your
            money.
          </p>
        </div>
        <div className="col-lg-6">
          <div className="fe-card fe-card-solid p-4">
            <img
              src="media/images/ecosystem.png"
              alt="Finedge ecosystem"
              style={{ width: "100%", maxWidth: "520px" }}
            />
            <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
              <Link to="/product" className="fe-chip">
                Explore products <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </Link>
              <a href="http://localhost:3001" className="fe-chip">
                Open dashboard demo <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
