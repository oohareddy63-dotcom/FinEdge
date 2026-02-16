import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center ">People</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-3 text-center">
          <img
            src="https://ui-avatars.com/api/?name=Rahul+Verma&size=200&background=0d9488&color=fff"
            style={{ borderRadius: "100%", width: "50%", maxWidth: "200px", objectFit: "cover", aspectRatio: "1" }}
            alt="Founder"
          />
          <h4 className="mt-5">Rahul Verma</h4>
          <h6>Founder & CEO</h6>
        </div>
        <div className="col-6 p-3">
          <p>
            Rahul founded Finedge in 2015 with a vision to make professional
            trading tools and transparent pricing accessible to every Indian
            investor. Today, Finedge is a trusted name in discount broking.
          </p>
          <p>
            He has over 15 years of experience in capital markets and fintech,
            and believes in building technology that puts the investor first.
          </p>
          <p>When not building products, he enjoys long-distance running and reading.</p>
          <p>
            Connect on <a href="">LinkedIn</a> / <a href="">Blog</a> /{" "}
            <a href="">Twitter</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
