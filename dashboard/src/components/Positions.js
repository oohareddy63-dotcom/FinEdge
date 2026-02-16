import React, { useState, useEffect } from "react";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        // For demo purposes, we'll use static data since we don't have positions API yet
        setAllPositions([
          {
            product: "CNC",
            name: "EVEREADY",
            qty: 2,
            avg: 316.27,
            price: 312.35,
            net: "+0.58%",
            day: "-1.24%",
            isLoss: true,
          },
          {
            product: "CNC", 
            name: "JUBLFOOD",
            qty: 1,
            avg: 3124.75,
            price: 3082.65,
            net: "+10.04%",
            day: "-1.35%",
            isLoss: true,
          }
        ]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching positions:", error);
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  if (loading) {
    return <div className="loading">Loading positions...</div>;
  }

  if (allPositions.length === 0) {
    return (
      <div className="no-positions">
        <div className="empty-state">
          <h3>No positions yet</h3>
          <p>When you start trading, your positions will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const investment = stock.avg * stock.qty;
              const pnl = curValue - investment;
              const pnlPercent = investment > 0 ? (pnl / investment) * 100 : 0;
              const isProfit = pnl >= 0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index} className="position-row">
                  <td>
                    <span className="product-tag">{stock.product}</span>
                  </td>
                  <td className="instrument-name">{stock.name}</td>
                  <td>{formatNumber(stock.qty)}</td>
                  <td>₹{stock.avg.toFixed(2)}</td>
                  <td>₹{stock.price.toFixed(2)}</td>
                  <td className={profClass}>
                    ₹{pnl.toFixed(2)} ({pnlPercent.toFixed(2)}%)
                  </td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
