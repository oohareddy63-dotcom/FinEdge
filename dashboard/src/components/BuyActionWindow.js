import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [marketPrice, setMarketPrice] = useState(0.0);
  const [orderType, setOrderType] = useState("MARKET");
  const [product, setProduct] = useState("CNC");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const generalContext = useContext(GeneralContext);

  // Fetch current stock price when component mounts
  useEffect(() => {
    const fetchStockPrice = async () => {
      try {
        const response = await axios.get(`/api/stocks/${uid}`);
        if (response.data && response.data.price) {
          setMarketPrice(response.data.price);
          if (orderType === "MARKET") {
            setStockPrice(response.data.price);
          }
        }
      } catch (error) {
        console.error("Error fetching stock price:", error);
        // Use default price if fetch fails
        setMarketPrice(100);
        setStockPrice(100);
      }
    };
    
    if (uid) {
      fetchStockPrice();
    }
  }, [uid]);

  const handleBuyClick = async () => {
    if (stockQuantity <= 0) {
      setMessage("Please enter a valid quantity");
      return;
    }

    if (orderType === "LIMIT" && stockPrice <= 0) {
      setMessage("Please enter a valid price for limit order");
      return;
    }

    setLoading(true);
    try {
      // Use market price for market orders, user-entered price for limit orders
      const orderPrice = orderType === "MARKET" ? marketPrice : stockPrice;
      
      await axios.post("/api/orders/place", {
        symbol: uid,
        quantity: stockQuantity,
        price: orderPrice,
        orderType: "BUY",
        productType: product === "CNC" ? "DELIVERY" : "INTRADAY"
      });

      setMessage("Order placed successfully!");
      setTimeout(() => {
        generalContext.closeBuyWindow();
      }, 1500);
    } catch (error) {
      setMessage("Error placing order. Please try again.");
      console.error("Order error:", error);
    }
    setLoading(false);
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  const calculateMargin = () => {
    const price = orderType === "MARKET" ? marketPrice : stockPrice;
    return (price * stockQuantity * 0.2).toFixed(2); // 20% margin requirement
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="header">
        <h3>{uid} <span>NSE</span></h3>
        <div className="market-options">
          <label>
            <input
              type="radio"
              name="orderType"
              value="MARKET"
              checked={orderType === "MARKET"}
              onChange={(e) => {
                setOrderType(e.target.value);
                setStockPrice(marketPrice);
              }}
            />
            Market
          </label>
          <label>
            <input
              type="radio"
              name="orderType"
              value="LIMIT"
              checked={orderType === "LIMIT"}
              onChange={(e) => setOrderType(e.target.value)}
            />
            Limit
          </label>
        </div>
      </div>

      <div className="tab">
        <button>Regular</button>
      </div>

      <div className="regular-order">
        <div className="order-validity">
          <label>
            <input
              type="radio"
              name="product"
              value="CNC"
              checked={product === "CNC"}
              onChange={(e) => setProduct(e.target.value)}
            />
            CNC <span>(Delivery)</span>
          </label>
          <label>
            <input
              type="radio"
              name="product"
              value="MIS"
              checked={product === "MIS"}
              onChange={(e) => setProduct(e.target.value)}
            />
            MIS <span>(Intraday)</span>
          </label>
        </div>

        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(parseInt(e.target.value) || 0)}
              value={stockQuantity}
              min="1"
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(parseFloat(e.target.value) || 0)}
              value={stockPrice}
              disabled={orderType === "MARKET"}
              placeholder={orderType === "MARKET" ? "Market" : "0.00"}
            />
          </fieldset>
        </div>

        {message && (
          <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>

      <div className="buttons">
        <span>Margin required ₹{calculateMargin()}</span>
        <div>
          <button 
            className="btn btn-blue" 
            onClick={handleBuyClick}
            disabled={loading}
          >
            {loading ? "Placing..." : "Buy"}
          </button>
          <button 
            className="btn btn-grey" 
            onClick={handleCancelClick}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
