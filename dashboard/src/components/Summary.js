import React, { useState, useEffect } from "react";

const Summary = () => {
  const [portfolioData, setPortfolioData] = useState({
    equity: {
      marginAvailable: 3740.50,
      marginsUsed: 0,
      openingBalance: 3740.50
    },
    holdings: {
      totalValue: 0,
      totalInvestment: 0,
      pnl: 0,
      pnlPercent: 0,
      count: 0
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        // For demo, we'll simulate the API call
        const mockHoldings = [
          { avg: 538.05, price: 541.15, qty: 2 },
          { avg: 1383.4, price: 1522.35, qty: 2 },
          { avg: 2335.85, price: 2417.4, qty: 1 },
          { avg: 1350.5, price: 1555.45, qty: 1 },
          { avg: 202.0, price: 207.9, qty: 5 }
        ];
        
        let totalInvestment = 0;
        let totalValue = 0;
        
        mockHoldings.forEach(stock => {
          const investment = stock.avg * stock.qty;
          const currentValue = stock.price * stock.qty;
          totalInvestment += investment;
          totalValue += currentValue;
        });

        const pnl = totalValue - totalInvestment;
        const pnlPercent = totalInvestment > 0 ? (pnl / totalInvestment) * 100 : 0;

        setPortfolioData(prev => ({
          ...prev,
          holdings: {
            totalValue,
            totalInvestment,
            pnl,
            pnlPercent,
            count: mockHoldings.length
          }
        }));
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  const formatCompactCurrency = (amount) => {
    if (amount >= 100000) {
      return `${(amount / 100000).toFixed(2)}L`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(2)}k`;
    }
    return amount.toFixed(2);
  };

  if (loading) {
    return <div className="loading">Loading portfolio...</div>;
  }

  return (
    <>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 900, letterSpacing: "-0.02em", fontSize: "1.05rem" }}>
          Welcome back
        </div>
        <div style={{ color: "rgba(255,255,255,0.65)" }}>
          Here’s a quick snapshot of your account.
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 14,
        }}
      >
        <div className="section">
          <span>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.70)", fontWeight: 800 }}>Equity</p>
          </span>

          <div className="data">
            <div className="first">
              <h3 style={{ color: "rgba(255,255,255,0.92)" }}>
                {formatCompactCurrency(portfolioData.equity.marginAvailable)}
              </h3>
              <p>Margin available</p>
            </div>
            <hr />

            <div className="second">
              <p>
                Margins used <span>{formatCompactCurrency(portfolioData.equity.marginsUsed)}</span>
              </p>
              <p>
                Opening balance <span>{formatCompactCurrency(portfolioData.equity.openingBalance)}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <span>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.70)", fontWeight: 800 }}>
              Holdings ({portfolioData.holdings.count})
            </p>
          </span>

          <div className="data">
            <div className="first">
              <h3 className={portfolioData.holdings.pnl >= 0 ? "profit" : "loss"}>
                {formatCompactCurrency(Math.abs(portfolioData.holdings.pnl))}
                <small>
                  {" "}
                  {portfolioData.holdings.pnl >= 0 ? "+" : "-"}
                  {Math.abs(portfolioData.holdings.pnlPercent).toFixed(2)}%
                </small>
              </h3>
              <p>P&amp;L</p>
            </div>
            <hr />

            <div className="second">
              <p>
                Current Value <span>{formatCompactCurrency(portfolioData.holdings.totalValue)}</span>
              </p>
              <p>
                Investment <span>{formatCompactCurrency(portfolioData.holdings.totalInvestment)}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="section" style={{ gridColumn: "1 / -1" }}>
          <span>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.70)", fontWeight: 800 }}>Mutual funds</p>
          </span>

          <div className="data">
            <div className="first">
              <h3 style={{ color: "rgba(255,255,255,0.92)" }}>0.00</h3>
              <p>Current value</p>
            </div>
            <hr />

            <div className="second">
              <p>
                Investment <span>0.00</span>
              </p>
              <p>
                P&amp;L <span>0.00</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
