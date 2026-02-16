import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalStats, setTotalStats] = useState({
    totalInvestment: 0,
    currentValue: 0,
    totalPnL: 0,
    totalPnLPercent: 0
  });

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const response = await axios.get("/api/holdings?userId=demo_user");
        const holdings = response.data.holdings || [];
        // Map backend fields to frontend expected fields
        const mappedHoldings = holdings.map(h => ({
          name: h.name,
          qty: h.quantity,
          avg: h.avgCost,
          price: h.currentPrice,
          net: h.pnl >= 0 ? `+${h.pnlPercent.toFixed(2)}%` : `${h.pnlPercent.toFixed(2)}%`,
          day: "0.00%" // Placeholder for day change
        }));
        setAllHoldings(mappedHoldings);
        calculateTotalStats(mappedHoldings);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching holdings:", error);
        setLoading(false);
      }
    };

    fetchHoldings();
  }, []);

  const calculateTotalStats = (holdings) => {
    let totalInvestment = 0;
    let currentValue = 0;

    holdings.forEach(stock => {
      const investment = stock.avg * stock.qty;
      const current = stock.price * stock.qty;
      totalInvestment += investment;
      currentValue += current;
    });

    const totalPnL = currentValue - totalInvestment;
    const totalPnLPercent = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;

    setTotalStats({
      totalInvestment,
      currentValue,
      totalPnL,
      totalPnLPercent
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  if (loading) {
    return <div className="loading">Loading holdings...</div>;
  }

  const labels = allHoldings.map((stock) => stock.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Current Value (₹)",
        data: allHoldings.map((stock) => stock.price * stock.qty),
        backgroundColor: "rgba(14, 165, 233, 0.55)",
        borderColor: "rgba(14, 165, 233, 0.95)",
        borderWidth: 1,
      },
      {
        label: "Investment (₹)",
        data: allHoldings.map((stock) => stock.avg * stock.qty),
        backgroundColor: "rgba(34, 197, 94, 0.40)",
        borderColor: "rgba(34, 197, 94, 0.90)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="section" style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h3 className="title" style={{ marginBottom: 6 }}>
              Holdings ({allHoldings.length})
            </h3>
            <div style={{ color: "rgba(255,255,255,0.65)" }}>
              A compact view of your current holdings and P&amp;L.
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <span className="fe-pill" style={{ color: "rgba(255,255,255,0.75)" }}>
              Investment: <strong>{formatCurrency(totalStats.totalInvestment)}</strong>
            </span>
            <span className="fe-pill" style={{ color: "rgba(255,255,255,0.75)" }}>
              Value: <strong>{formatCurrency(totalStats.currentValue)}</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&amp;L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const investment = stock.avg * stock.qty;
              const pnl = curValue - investment;
              const pnlPercent = investment > 0 ? (pnl / investment) * 100 : 0;
              const isProfit = pnl >= 0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.day && stock.day.includes("-") ? "loss" : "profit";

              return (
                <tr key={index} className="holding-row">
                  <td className="instrument-name">{stock.name}</td>
                  <td>{formatNumber(stock.qty)}</td>
                  <td>₹{stock.avg.toFixed(2)}</td>
                  <td>₹{stock.price.toFixed(2)}</td>
                  <td>₹{formatNumber(curValue.toFixed(2))}</td>
                  <td className={profClass}>
                    ₹{pnl.toFixed(2)} ({pnlPercent.toFixed(2)}%)
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14, marginTop: 14 }}>
        <div className="section">
          <div style={{ fontWeight: 900, marginBottom: 10 }}>Totals</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 }}>
            <div>
              <div style={{ fontWeight: 900 }}>{formatCurrency(totalStats.totalInvestment)}</div>
              <div style={{ color: "rgba(255,255,255,0.62)" }}>Total investment</div>
            </div>
            <div>
              <div style={{ fontWeight: 900 }}>{formatCurrency(totalStats.currentValue)}</div>
              <div style={{ color: "rgba(255,255,255,0.62)" }}>Current value</div>
            </div>
            <div>
              <div className={totalStats.totalPnL >= 0 ? "up" : "down"} style={{ fontWeight: 900 }}>
                {formatCurrency(totalStats.totalPnL)} ({totalStats.totalPnLPercent.toFixed(2)}%)
              </div>
              <div style={{ color: "rgba(255,255,255,0.62)" }}>Total P&amp;L</div>
            </div>
          </div>
        </div>

        <div className="section">
          <div style={{ fontWeight: 900, marginBottom: 10 }}>Holdings chart</div>
          <VerticalGraph data={data} />
        </div>
      </div>
    </>
  );
};

export default Holdings;
