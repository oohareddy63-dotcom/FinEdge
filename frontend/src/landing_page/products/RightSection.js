import React from "react";
import "./sections.css";

function RightSection({
  imageURL,
  productName,
  productDesription,
  learnMore,
  imageSize = "normal" // 👈 default size
}) {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">

        {/* CONTENT COLUMN */}
        <div className="col-12 col-md-6 p-5">
          <h1>{productName}</h1>
          <p>{productDesription}</p>

          {learnMore && (
            <div className="mt-3">
              <a href={learnMore}>Learn More</a>
            </div>
          )}
        </div>

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

      </div>
    </div>
  );
}

export default RightSection;
