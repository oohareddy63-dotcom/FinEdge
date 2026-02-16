import React, { useState, useEffect } from "react";
import Menu from "./Menu";

const TopBar = () => {
  const [marketData, setMarketData] = useState({
    nifty: { value: 24500.75, change: 125.30, percent: 0.51 },
    sensex: { value: 80234.15, change: 245.80, percent: 0.31 }
  });

  // Simulate real-time market data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => ({
        nifty: {
          value: prev.nifty.value + (Math.random() - 0.5) * 10,
          change: prev.nifty.change + (Math.random() - 0.5) * 5,
          percent: prev.nifty.percent + (Math.random() - 0.5) * 0.1
        },
        sensex: {
          value: prev.sensex.value + (Math.random() - 0.5) * 50,
          change: prev.sensex.change + (Math.random() - 0.5) * 20,
          percent: prev.sensex.percent + (Math.random() - 0.5) * 0.1
        }
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => num.toFixed(2);
  const formatChange = (change, percent) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${formatNumber(change)} (${sign}${formatNumber(percent)}%)`;
  };

  return (
    <div 
      className="topbar-container"
      style={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(14px)",
        boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
        borderBottom: "1px solid rgba(255,255,255,0.12)"
      }}
    >
      <div className="indices-container">
        <div 
          className="nifty"
          style={{
            background: marketData.nifty.change >= 0 ? "linear-gradient(135deg, rgba(34,197,94,0.18) 0%, rgba(14,165,233,0.10) 100%)" : "linear-gradient(135deg, rgba(251,113,133,0.20) 0%, rgba(244,63,94,0.10) 100%)",
            padding: "12px 16px",
            borderRadius: "16px",
            margin: "0 8px",
            border: `1px solid ${marketData.nifty.change >= 0 ? 'rgba(34,197,94,0.25)' : 'rgba(251,113,133,0.25)'}`
          }}
        >
          <p className="index" style={{ fontWeight: "800", fontSize: "0.85rem", color: "rgba(255,255,255,0.78)" }}>
            <i className="fas fa-chart-line me-2"></i>
            NIFTY 50
          </p>
          <p 
            className={`index-points ${marketData.nifty.change >= 0 ? 'up' : 'down'}`}
            style={{ 
              fontWeight: "700", 
              fontSize: "1.1rem",
              margin: "4px 0"
            }}
          >
            {formatNumber(marketData.nifty.value)}
          </p>
          <p 
            className={`percent ${marketData.nifty.change >= 0 ? 'up' : 'down'}`}
            style={{ 
              fontSize: "0.8rem",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}
          >
            <i className={`fas fa-arrow-${marketData.nifty.change >= 0 ? 'up' : 'down'}`}></i>
            {formatChange(marketData.nifty.change, marketData.nifty.percent)}
          </p>
        </div>
        <div 
          className="sensex"
          style={{
            background: marketData.sensex.change >= 0 ? "linear-gradient(135deg, rgba(34,197,94,0.18) 0%, rgba(124,58,237,0.10) 100%)" : "linear-gradient(135deg, rgba(251,113,133,0.20) 0%, rgba(244,63,94,0.10) 100%)",
            padding: "12px 16px",
            borderRadius: "16px",
            margin: "0 8px",
            border: `1px solid ${marketData.sensex.change >= 0 ? 'rgba(34,197,94,0.25)' : 'rgba(251,113,133,0.25)'}`
          }}
        >
          <p className="index" style={{ fontWeight: "800", fontSize: "0.85rem", color: "rgba(255,255,255,0.78)" }}>
            <i className="fas fa-chart-bar me-2"></i>
            SENSEX
          </p>
          <p 
            className={`index-points ${marketData.sensex.change >= 0 ? 'up' : 'down'}`}
            style={{ 
              fontWeight: "700", 
              fontSize: "1.1rem",
              margin: "4px 0"
            }}
          >
            {formatNumber(marketData.sensex.value)}
          </p>
          <p 
            className={`percent ${marketData.sensex.change >= 0 ? 'up' : 'down'}`}
            style={{ 
              fontSize: "0.8rem",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}
          >
            <i className={`fas fa-arrow-${marketData.sensex.change >= 0 ? 'up' : 'down'}`}></i>
            {formatChange(marketData.sensex.change, marketData.sensex.percent)}
          </p>
        </div>
      </div>
      <Menu />
    </div>
  );
};

export default TopBar;
