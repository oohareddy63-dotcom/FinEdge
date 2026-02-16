import React from "react";

function CreateTicket() {
  const categories = [
    {
      title: "Account & onboarding",
      icon: "fa-user-plus",
      links: [
        "Online account opening",
        "Offline account opening",
        "NRI account opening",
        "Charges at Finedge",
        "Finedge 3-in-1 account",
        "Getting started",
      ],
    },
    {
      title: "Trading & orders",
      icon: "fa-arrow-trend-up",
      links: [
        "Order types (market/limit)",
        "Order status and history",
        "Intraday vs delivery",
        "Market timings",
        "Corporate actions impact",
        "Common order issues",
      ],
    },
    {
      title: "Funds & payments",
      icon: "fa-wallet",
      links: [
        "Add funds (UPI/Netbanking)",
        "Withdrawals",
        "Payout timelines",
        "Charges & GST",
        "Bank account change",
        "UPI troubleshooting",
      ],
    },
    {
      title: "Portfolio & reports",
      icon: "fa-chart-pie",
      links: [
        "Holdings overview",
        "P&L reports",
        "Contract notes",
        "Tax statements",
        "Positions explained",
        "Export reports",
      ],
    },
    {
      title: "KYC & profile",
      icon: "fa-id-card",
      links: [
        "Update PAN details",
        "Change mobile/email",
        "Nominee update",
        "Address update",
        "Document upload",
        "Re-KYC guidelines",
      ],
    },
    {
      title: "Platform & troubleshooting",
      icon: "fa-screwdriver-wrench",
      links: [
        "Login issues",
        "2FA / OTP not received",
        "App performance",
        "Browser compatibility",
        "Data refresh issues",
        "Report a bug",
      ],
    },
  ];

  return (
    <div className="container fe-container-narrow fe-section" style={{ paddingTop: 24 }}>
      <div className="d-flex align-items-end justify-content-between gap-3 flex-wrap mb-3">
        <div>
          <h2 style={{ fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 6 }}>
            Create a ticket
          </h2>
          <div style={{ color: "rgba(15, 23, 42, 0.65)" }}>
            Choose a topic to get started.
          </div>
        </div>
        <div className="fe-eyebrow">
          <i className="fa-solid fa-clock" aria-hidden="true"></i>
          Typical reply: within 24 hours
        </div>
      </div>

      <div className="fe-topic-grid">
        {categories.map((cat) => (
          <div key={cat.title} className="fe-topic-card">
            <div className="fe-topic-title">
              <i className={`fa-solid ${cat.icon}`} aria-hidden="true" style={{ color: "var(--fe-primary)" }}></i>
              {cat.title}
            </div>
            <div className="fe-topic-links">
              {cat.links.map((label) => (
                <a key={label} href="">
                  {label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateTicket;
