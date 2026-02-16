import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching orders
    const fetchOrders = () => {
      setOrders([
        {
          _id: "1",
          name: "INFY",
          qty: 10,
          price: 1555.45,
          mode: "BUY",
          product: "CNC",
          orderType: "LIMIT",
          status: "COMPLETE",
          time: new Date().toLocaleTimeString()
        },
        {
          _id: "2", 
          name: "TCS",
          qty: 5,
          price: 3194.80,
          mode: "SELL",
          product: "MIS",
          orderType: "MARKET",
          status: "PENDING",
          time: new Date().toLocaleTimeString()
        }
      ]);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <div className="icon">📋</div>
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders">
      <h3 className="title">Orders ({orders.length})</h3>
      
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Mode</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id || index}>
                <td>{order.time}</td>
                <td className="instrument-name">{order.name}</td>
                <td>{formatNumber(order.qty)}</td>
                <td>₹{order.price.toFixed(2)}</td>
                <td>
                  <span className={`mode-tag ${order.mode.toLowerCase()}`}>
                    {order.mode}
                  </span>
                </td>
                <td>
                  <span className={`status-tag ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
