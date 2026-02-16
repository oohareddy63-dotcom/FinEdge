import React from "react";

import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";

function PricingPage() {
  return (
    <>
      <Hero />
      <LeftSection
        imageURL="/media/images/trade.png"
        productName="Edge Trade"
        productDesription="A fast, clean trading experience with live market data, advanced charts, and a minimal interface that keeps you focused on decisions—not noise."
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />
      <RightSection
        imageURL="/media/images/console.png"
        productName="Portfolio Hub"
        productDesription="The central dashboard for your Finedge account. Gain insights into your trades and investments with in-depth reports and visualisations."
        learnMore=""
      />
      <LeftSection
        imageURL="/media/images/coin.png"
        productName="FundFlow"
        productDesription="Discover mutual funds and long-term investing options in a simplified flow—built to help you build habits, not chase hype."
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />
      <RightSection
        imageURL="/media/images/api.png"
        productName="Finedge API"
        productDesription="Build trading experiences with simple HTTP/JSON APIs. Great for hackathons, prototypes, and startup integrations."
        imageSize="small"
        learnMore=""
      />
      <LeftSection
        imageURL="/media/images/learn.png"
        productName="Learn (mobile)"
        productDesription="Bite-sized lessons with illustrations and examples—so you can learn markets in small sessions and build confidence over time."
        imageSize="small"
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />
      <p className="text-center mt-5 mb-5">
        Want to know more about the product and engineering behind Finedge?
        Check out our build notes.
      </p>
      <Universe />
    </>
  );
}

export default PricingPage;
