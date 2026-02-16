import React from 'react';
import VoiceTrading from '../components/VoiceTrading-new';
import './Dashboard-new.css';

// Modern Trading Dashboard with Premium Fintech Design
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Minimal Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="dashboard-title">Trading Dashboard</h1>
            <p className="dashboard-subtitle">Real-time market data and portfolio insights</p>
          </div>
          <div className="header-right">
            <div className="market-status">
              <span className="status-dot"></span>
              <span className="status-text">Market Open</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Left Column - Summary Information */}
        <div className="dashboard-column dashboard-column-left">
          {/* Portfolio Summary Card */}
          <div className="metric-card portfolio-card">
            <div className="card-header">
              <div className="card-icon">
                <i className="fas fa-wallet"></i>
              </div>
              <div className="card-title">
                <h3>Portfolio Value</h3>
                <span className="card-subtitle">Total Investment</span>
              </div>
            </div>
            <div className="card-content">
              <div className="primary-value">₹2,45,678</div>
              <div className="value-change positive">
                <i className="fas fa-arrow-up"></i>
                <span>+2.34%</span>
                <span className="change-amount">+₹1,234</span>
              </div>
            </div>
          </div>

          {/* P&L Card */}
          <div className="metric-card pnl-card">
            <div className="card-header">
              <div className="card-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="card-title">
                <h3>Today's P&L</h3>
                <span className="card-subtitle">Real-time</span>
              </div>
            </div>
            <div className="card-content">
              <div className="primary-value positive">+₹1,234</div>
              <div className="value-change positive">
                <i className="fas fa-arrow-up"></i>
                <span>+0.89%</span>
              </div>
            </div>
          </div>

          {/* Active Positions Card */}
          <div className="metric-card positions-card">
            <div className="card-header">
              <div className="card-icon">
                <i className="fas fa-exchange-alt"></i>
              </div>
              <div className="card-title">
                <h3>Active Positions</h3>
                <span className="card-subtitle">Live trades</span>
              </div>
            </div>
            <div className="card-content">
              <div className="primary-value">12</div>
              <div className="value-change neutral">
                <i className="fas fa-minus"></i>
                <span>No change</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Actions & Voice Trading */}
        <div className="dashboard-column dashboard-column-right">
          {/* Voice Trading Feature */}
          <div className="voice-trading-section">
            <div className="section-header">
              <h2 className="section-title">
                <i className="fas fa-microphone-alt me-2"></i>
                Voice Trading
              </h2>
              <span className="feature-badge">AI Powered</span>
            </div>
            <VoiceTrading />
          </div>

          {/* Quick Actions */}
          <div className="quick-actions-section">
            <h2 className="section-title">Quick Actions</h2>
            <div className="actions-grid">
              <button className="action-card">
                <div className="action-icon">
                  <i className="fas fa-plus-circle"></i>
                </div>
                <span className="action-label">New Order</span>
              </button>
              <button className="action-card">
                <div className="action-icon">
                  <i className="fas fa-history"></i>
                </div>
                <span className="action-label">Order History</span>
              </button>
              <button className="action-card">
                <div className="action-icon">
                  <i className="fas fa-briefcase"></i>
                </div>
                <span className="action-label">Holdings</span>
              </button>
              <button className="action-card">
                <div className="action-icon">
                  <i className="fas fa-chart-bar"></i>
                </div>
                <span className="action-label">Reports</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <section className="recent-orders-section">
        <div className="section-header">
          <h2 className="section-title">Recent Orders</h2>
          <button className="view-all-btn">View All</button>
        </div>
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Stock</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="order-row">
                <td className="time-cell">09:45:23</td>
                <td className="stock-cell">INFY</td>
                <td className="type-cell">
                  <span className="badge badge-buy">BUY</span>
                </td>
                <td className="quantity-cell">10</td>
                <td className="price-cell">₹1,555.45</td>
                <td className="status-cell">
                  <span className="badge badge-success">COMPLETE</span>
                </td>
              </tr>
              <tr className="order-row">
                <td className="time-cell">09:42:15</td>
                <td className="stock-cell">RELIANCE</td>
                <td className="type-cell">
                  <span className="badge badge-sell">SELL</span>
                </td>
                <td className="quantity-cell">5</td>
                <td className="price-cell">₹2,112.40</td>
                <td className="status-cell">
                  <span className="badge badge-success">COMPLETE</span>
                </td>
              </tr>
              <tr className="order-row">
                <td className="time-cell">09:38:45</td>
                <td className="stock-cell">TCS</td>
                <td className="type-cell">
                  <span className="badge badge-buy">BUY</span>
                </td>
                <td className="quantity-cell">15</td>
                <td className="price-cell">₹3,194.80</td>
                <td className="status-cell">
                  <span className="badge badge-pending">PENDING</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
