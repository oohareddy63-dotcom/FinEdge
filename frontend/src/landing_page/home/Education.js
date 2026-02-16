import React from "react";

function Education() {
  return (
    <div className="container fe-container-narrow fe-section">
      <div className="row align-items-center g-4">
        <div className="col-lg-6">
          <div className="fe-card fe-card-solid p-4">
            <img
              src="media/images/education.svg"
              alt="Education"
              style={{ width: "100%", maxWidth: "420px" }}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="fe-eyebrow">
            <i className="fa-solid fa-graduation-cap" aria-hidden="true"></i>
            Learn at your pace
          </div>
          <h2 className="mt-3" style={{ letterSpacing: "-0.02em", fontWeight: 800 }}>
            Education that feels practical
          </h2>
          <p className="fe-lead">
            Short lessons, real examples, and a community that helps you learn
            the basics of investing and trading—without jargon overload.
          </p>

          <div className="d-flex flex-column gap-3">
            <a className="fe-chip" href="">
              Finedge Learn <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
            <a className="fe-chip" href="">
              Community Q&A <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
