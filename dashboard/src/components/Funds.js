import React from "react";

const Funds = () => {
  return (
    <>
      <div className="section">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontWeight: 900, letterSpacing: "-0.02em" }}>Funds</div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem" }}>
              Instant, zero-cost transfers supported via UPI.
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button type="button" className="btn buy" style={{ padding: "10px 14px" }}>
              Add funds
            </button>
            <button type="button" className="btn action" style={{ padding: "10px 14px", color: "rgba(255,255,255,0.85)" }}>
              Withdraw
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14 }}>
        <div className="section">
          <div style={{ fontWeight: 900, marginBottom: 10 }}>Equity</div>

          <div className="table" style={{ borderRadius: 14, borderColor: "rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)" }}>
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">4,043.10</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">3,757.30</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">4,043.10</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening balance</p>
              <p>4,043.10</p>
            </div>
            <div className="data">
              <p>Payin</p>
              <p>4,064.00</p>
            </div>
            <div className="data">
              <p>SPAN</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>0.00</p>
            </div>
            <hr />
            <div className="data">
              <p>Total collateral</p>
              <p>0.00</p>
            </div>
          </div>
        </div>

        <div className="section">
          <div style={{ fontWeight: 900, marginBottom: 10 }}>Commodity</div>
          <div className="empty-state">
            <div style={{ fontWeight: 900, marginBottom: 6 }}>No commodity account</div>
            <div style={{ opacity: 0.8, marginBottom: 12 }}>
              Open a commodity account to trade MCX instruments.
            </div>
            <button type="button" className="btn buy" style={{ padding: "10px 14px", display: "inline-flex" }}>
              Open account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
