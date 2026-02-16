import React from "react";
import "./sections.css";

function LeftSection({
  imageURL,
  productName,
  productDesription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
  imageSize = "normal" // 👈 default
}) {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        
        {/* IMAGE COLUMN */}
        <div className="col-12 col-md-6 text-center">
          <div className="product-image-wrapper">
            <img
              src={imageURL}
              alt={productName}
              className={`product-image ${imageSize}`}
            />
          </div>
        </div>

        {/* CONTENT COLUMN */}
        <div className="col-12 col-md-6 p-5">
          <h1>{productName}</h1>
          <p>{productDesription}</p>

          <div className="mt-3">
            {tryDemo && <a href={tryDemo}>Try Demo</a>}
            {learnMore && (
              <a href={learnMore} style={{ marginLeft: "40px" }}>
                Learn More
              </a>
            )}
          </div>

          <div className="mt-4">
            {googlePlay && (
              <a href={googlePlay}>
                <img
                  src="/media/images/googlePlayBadge.svg"
                  alt="Get it on Google Play"
                  className="store-badge"
                />
              </a>
            )}

            {appStore && (
              <a href={appStore}>
                <img
                  src="/media/images/appstoreBadge.svg"
                  alt="Download on App Store"
                  className="store-badge ms-4"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
