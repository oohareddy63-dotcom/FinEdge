import React from "react";

function Footer() {
  return (
    <footer className="fe-footer">
      <div className="container fe-container-narrow py-5">
        <div className="row g-4 align-items-start">
          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-2">
              <img
                src="media/images/logo.svg"
            
                alt="Finedge"
                style={{ width: "42px", height: "42px" }}
              />
              <div>
                <div style={{ fontWeight: 900, letterSpacing: "0.02em" }}>Finedge</div>
                <div style={{ color: "rgba(15, 23, 42, 0.60)", fontSize: "0.95rem" }}>
                  Trading platform UI + dashboard
                </div>
              </div>
            </div>
            <p className="mt-3 mb-0" style={{ color: "rgba(15, 23, 42, 0.65)" }}>
              &copy; 2015 - 2025 Finedge Broking Ltd. All rights reserved.
            </p>
          </div>

          <div className="col-6 col-lg-2">
            <div style={{ fontWeight: 800, marginBottom: 10 }}>Company</div>
            <div className="d-grid gap-2">
              <a href="">About</a>
              <a href="">Products</a>
              <a href="">Pricing</a>
              <a href="">Careers</a>
              <a href="">Finedge.tech</a>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div style={{ fontWeight: 800, marginBottom: 10 }}>Support</div>
            <div className="d-grid gap-2">
              <a href="">Support portal</a>
              <a href="">Contact</a>
              <a href="">Finedge Insights</a>
              <a href="">Downloads & resources</a>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div style={{ fontWeight: 800, marginBottom: 10 }}>Account</div>
            <div className="d-grid gap-2">
              <a href="">Open an account</a>
              <a href="">Fund transfer</a>
              <a href="">Security</a>
            </div>
          </div>
        </div>

        <div className="mt-5 text-muted" style={{ fontSize: "14px" }}>
          <p>
            Finedge Broking Ltd.: Member of NSE & BSE – SEBI Registration no.:
            INZ000031633 CDSL: Depository services through Finedge Securities
            Pvt. Ltd. – SEBI Registration no.: IN-DP-100-2015 Commodity Trading
            through Finedge Commodities Pvt. Ltd. MCX: 46025 – SEBI Registration
            no.: INZ000038238 Registered Address: Finedge Broking Ltd.,
            #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School,
            J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any
            complaints pertaining to securities broking please write to
            complaints@finedge.com, for DP related to dp@finedge.com. Please
            ensure you carefully read the Risk Disclosure Document as prescribed
            by SEBI | ICF
          </p>

          <p>
            Procedure to file a complaint on SEBI SCORES: Register on SCORES
            portal. Mandatory details for filing complaints on SCORES: Name,
            PAN, Address, Mobile Number, E-mail ID. Benefits: Effective
            Communication, Speedy redressal of the grievances
          </p>

          <p>
            Investments in securities market are subject to market risks; read
            all the related documents carefully before investing.
          </p>

          <p>
            "Prevent unauthorised transactions in your account. Update your
            mobile numbers/email IDs with your stock brokers. Receive
            information of your transactions directly from Exchange on your
            mobile/email at the end of the day. Issued in the interest of
            investors. KYC is one time exercise while dealing in securities
            markets - once KYC is done through a SEBI registered intermediary
            (broker, DP, Mutual Fund etc.), you need not undergo the same
            process again when you approach another intermediary." Dear
            Investor, if you are subscribing to an IPO, there is no need to
            issue a cheque. Please write the Bank account number and sign the
            IPO application form to authorize your bank to make payment in case
            of allotment. In case of non allotment the funds will remain in your
            bank account. As a business we don't give stock tips, and have not
            authorized anyone to trade on behalf of others. If you find anyone
            claiming to be part of Finedge and offering such services, please
            create a ticket here.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
