import React, { useState, useContext, useEffect } from "react";
import GeneralContext from "./GeneralContext";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";
import { DoughnutChart } from "./DoughnoutChart";

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([
    {
      name: "INFY",
      price: 1555.45,
      percent: "-1.60%",
      isDown: true,
    },
    {
      name: "ONGC",
      price: 116.8,
      percent: "-0.09%",
      isDown: true,
    },
    {
      name: "TCS",
      price: 3194.8,
      percent: "-0.25%",
      isDown: true,
    },
    {
      name: "KPITTECH",
      price: 266.45,
      percent: "3.54%",
      isDown: false,
    },
    {
      name: "QUICKHEAL",
      price: 308.55,
      percent: "-0.15%",
      isDown: true,
    },
    {
      name: "WIPRO",
      price: 577.75,
      percent: "0.32%",
      isDown: false,
    },
    {
      name: "M&M",
      price: 779.8,
      percent: "-0.01%",
      isDown: true,
    },
    {
      name: "RELIANCE",
      price: 2112.4,
      percent: "1.44%",
      isDown: false,
    },
    {
      name: "HUL",
      price: 512.4,
      percent: "1.04%",
      isDown: false,
    },
  ]);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWatchlist(prev => prev.map(stock => {
        const priceChange = (Math.random() - 0.5) * 10; // Random price change
        const newPrice = Math.max(stock.price + priceChange, 1); // Ensure price doesn't go below 1
        const percentChange = ((newPrice - stock.price) / stock.price * 100);
        const newPercent = `${percentChange >= 0 ? '+' : ''}${percentChange.toFixed(2)}%`;
        
        return {
          ...stock,
          price: newPrice,
          percent: newPercent,
          isDown: percentChange < 0
        };
      }));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const labels = watchlist.map((stock) => stock.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(199, 199, 199, 0.5)",
          "rgba(83, 102, 255, 0.5)",
          "rgba(255, 159, 243, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(199, 199, 199, 1)",
          "rgba(83, 102, 255, 1)",
          "rgba(255, 159, 243, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.length === 0 ? (
          <li>
            <div className="empty-state">
              <div style={{ fontWeight: 900, marginBottom: 6 }}>No symbols yet</div>
              <div style={{ opacity: 0.8 }}>
                Add a symbol to your watchlist to track it here.
              </div>
            </div>
          </li>
        ) : (
          watchlist.map((stock, index) => <WatchListItem stock={stock} key={index} />)
        )}
      </ul>

      <div style={{ padding: "0 12px 14px" }}>
        <div
          style={{
            border: "1px solid var(--fd-border)",
            borderRadius: 16,
            background: "rgba(255,255,255,0.04)",
            padding: 12,
          }}
        >
          <div style={{ fontWeight: 900, marginBottom: 10, color: "rgba(255,255,255,0.82)" }}>
            Watchlist snapshot
          </div>
          <DoughnutChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  const handleMouseEnter = (e) => {
    setShowWatchlistActions(true);
  };

  const handleMouseLeave = (e) => {
    setShowWatchlistActions(false);
  };

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className={`percent ${stock.isDown ? "down" : "up"}`}>{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">₹{stock.price.toFixed(2)}</span>
        </div>
      </div>
      {showWatchlistActions && <WatchListActions uid={stock.name} />}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };

  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
          onClick={handleBuyClick}
        >
          <button className="buy">Buy</button>
        </Tooltip>
        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="sell">Sell</button>
        </Tooltip>
        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
