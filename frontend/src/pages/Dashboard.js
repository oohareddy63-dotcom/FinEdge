import React from 'react';
import VoiceTrading from '../components/VoiceTrading';
import './Dashboard.css';

// Main Dashboard Component with Voice Trading Integration
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          <i className="fas fa-chart-line me-3"></i>
          Finedge Trading Dashboard
        </h1>
        <p className="dashboard-subtitle">
          Trade smarter with voice commands and real-time market data
        </p>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-wallet"></i>
          </div>
          <div className="stat-content">
            <h3>Portfolio Value</h3>
            <p className="stat-value">₹2,45,678</p>
            <span className="stat-change positive">+2.34%</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-chart-pie"></i>
          </div>
          <div className="stat-content">
            <h3>Today's P&L</h3>
            <p className="stat-value">+₹1,234</p>
            <span className="stat-change positive">+0.89%</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-exchange-alt"></i>
          </div>
          <div className="stat-content">
            <h3>Active Positions</h3>
            <p className="stat-value">12</p>
            <span className="stat-change neutral">Live</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-content">
            <h3>Market Status</h3>
            <p className="stat-value">Open</p>
            <span className="stat-change positive">Closes 3:30 PM</span>
          </div>
        </div>
      </div>

      {/* Voice Trading Section */}
      <div className="voice-section">
        <VoiceTrading />
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-btn">
            <i className="fas fa-plus-circle"></i>
            <span>New Order</span>
          </button>
          <button className="action-btn">
            <i className="fas fa-history"></i>
            <span>Order History</span>
          </button>
          <button className="action-btn">
            <i className="fas fa-briefcase"></i>
            <span>Holdings</span>
          </button>
          <button className="action-btn">
            <i className="fas fa-chart-bar"></i>
            <span>Reports</span>
          </button>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="recent-orders">
        <h2 className="section-title">Recent Orders</h2>
        <div className="orders-table">
          <table className="table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Stock</th>
                <th>Type</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>09:45:23</td>
                <td>INFY</td>
                <td><span className="badge buy">BUY</span></td>
                <td>10</td>
                <td>₹1,555.45</td>
                <td><span className="badge success">COMPLETE</span></td>
              </tr>
              <tr>
                <td>09:42:15</td>
                <td>RELIANCE</td>
                <td><span className="badge sell">SELL</span></td>
                <td>5</td>
                <td>₹2,112.40</td>
                <td><span className="badge success">COMPLETE</span></td>
              </tr>
              <tr>
                <td>09:38:45</td>
                <td>TCS</td>
                <td><span className="badge buy">BUY</span></td>
                <td>15</td>
                <td>₹3,194.80</td>
                <td><span className="badge pending">PENDING</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
