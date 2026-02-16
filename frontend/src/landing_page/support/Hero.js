import React from "react";

function Hero() {
  return (
    <section className="fe-support-hero">
      <div className="container fe-container-narrow">
        <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
          <div>
            <div className="fe-eyebrow">
              <i className="fa-solid fa-life-ring" aria-hidden="true"></i>
              Support
            </div>
            <h1 className="mt-3" style={{ fontWeight: 900, letterSpacing: "-0.03em" }}>
              How can we help?
            </h1>
            <p className="fe-lead mb-0">
              Search for quick answers or browse topics to create a ticket.
            </p>
          </div>

          <a className="fe-chip" href="">
            Track tickets <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>

        <div className="row g-4 mt-3">
          <div className="col-lg-7">
            <div className="fe-card p-4">
              <div className="fe-search">
                <i className="fa-solid fa-magnifying-glass" aria-hidden="true" style={{ color: "rgba(15, 23, 42, 0.55)" }}></i>
                <input placeholder="Search e.g. how do I activate F&O?" aria-label="Search support articles" />
              </div>
              <div className="mt-3 d-flex flex-wrap gap-2">
                <a className="fe-chip" href="">Account opening status</a>
                <a className="fe-chip" href="">Segment activation</a>
                <a className="fe-chip" href="">Intraday margins</a>
                <a className="fe-chip" href="">Finedge user manual</a>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="fe-card p-4">
              <div style={{ fontWeight: 900, marginBottom: 10 }}>Featured</div>
              <ol className="mb-0" style={{ color: "rgba(15, 23, 42, 0.72)" }}>
                <li className="mb-2">
                  <a className="fe-chip" href="">
                    Corporate actions: takeovers & delisting (Jan 2024)
                  </a>
                </li>
                <li>
                  <a className="fe-chip" href="">
                    Updated intraday leverage rules
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
