import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import VoiceTrading from '../components/VoiceTrading-3D';
import OrderModal from '../components/OrderModal';
import './Dashboard-3D.css';
import '../components/OrderModal.css';

/**
 * Advanced 3D Trading Dashboard with Beautiful UI
 * Features: 3D models, glassmorphism, particle effects, advanced animations
 * 
 * @component Dashboard3D
 * @description Premium trading dashboard with 3D visualizations and modern UI
 */
const Dashboard3D = () => {
  // State management for interactive elements
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderType, setOrderType] = useState('BUY');
  const [orders, setOrders] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Portfolio data with 3D visualization support
  const portfolioData = useMemo(() => ({
    totalValue: 245678,
    dailyChange: 1234,
    dailyChangePercent: 2.34,
    activePositions: 12,
    holdings: [
      { symbol: 'INFY', name: 'Infosys', value: 45000, change: 2.5, percentage: 18.3 },
      { symbol: 'RELIANCE', name: 'Reliance', value: 62000, change: -1.2, percentage: 25.2 },
      { symbol: 'TCS', name: 'TCS', value: 58000, change: 3.8, percentage: 23.6 },
      { symbol: 'HDFCBANK', name: 'HDFC Bank', value: 35000, change: 1.1, percentage: 14.3 },
      { symbol: 'ITC', name: 'ITC', value: 45678, change: -0.8, percentage: 18.6 }
    ]
  }), []);

  // Load orders from backend API on component mount and when order is placed
  useEffect(() => {
    fetchOrders();
    
    // Listen for order placement events
    const handleOrderPlaced = () => {
      fetchOrders();
    };
    
    window.addEventListener('orderPlaced', handleOrderPlaced);
    
    return () => {
      window.removeEventListener('orderPlaced', handleOrderPlaced);
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders?userId=demo_user');
      const result = await response.json();
      
      if (result.success) {
        setOrders(result.orders);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  // 3D Particle Background Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle system for ambient animation
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.z -= 2;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
        if (this.z < 0) this.reset();
      }

      draw() {
        const perspective = 1000 / (1000 - this.z);
        const projX = (this.x - canvas.width / 2) * perspective + canvas.width / 2;
        const projY = (this.y - canvas.height / 2) * perspective + canvas.height / 2;
        const projSize = this.size * perspective;

        ctx.beginPath();
        ctx.arc(projX, projY, projSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 126, 234, ${this.opacity * perspective})`;
        ctx.fill();
      }
    }

    // Create particle array
    const particles = Array.from({ length: 100 }, () => new Particle());

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections between nearby particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const distance = Math.sqrt(
            Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
          );
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(100, 126, 234, ${0.1 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Format currency with proper Indian formatting
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // 3D Metric Card Component
  const MetricCard3D = ({ title, value, change, changePercent, icon, color, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // Calculate 3D transform based on mouse position
    const transform = useMemo(() => {
      if (!isHovered) return 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      
      const rect = document.getElementById(`metric-${index}`)?.getBoundingClientRect();
      if (!rect) return 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateY = ((mousePosition.x - centerX) / rect.width) * 10;
      const rotateX = -((mousePosition.y - centerY) / rect.height) * 10;
      
      return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }, [mousePosition, isHovered, index]);

    return (
      <div
        id={`metric-${index}`}
        className={`metric-card-3d ${isHovered ? 'hovered' : ''} ${color}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {}}
        style={{
          transform,
          transition: 'transform 0.3s ease-out'
        }}
      >
        <div className="card-3d-inner">
          <div className="card-3d-front">
            <div className="card-icon-3d">
              <i className={icon}></i>
            </div>
            <div className="card-content-3d">
              <h3>{title}</h3>
              <div className="primary-value-3d">{formatCurrency(value)}</div>
              <div className={`value-change-3d ${change >= 0 ? 'positive' : 'negative'}`}>
                <i className={`fas fa-arrow-${change >= 0 ? 'up' : 'down'}`}></i>
                <span>{change >= 0 ? '+' : ''}{changePercent}%</span>
                <span className="change-amount-3d">
                  {change >= 0 ? '+' : ''}{formatCurrency(Math.abs(change))}
                </span>
              </div>
            </div>
          </div>
          <div className="card-3d-back">
            <div className="back-content">
              <h4>Detailed Analysis</h4>
              <p>Advanced metrics and trends for {title}</p>
              <div className="mini-chart">
                {/* Mini 3D chart visualization */}
                <div className="chart-bars">
                  {[65, 78, 90, 81, 56, 75, 88, 92, 85, 78].map((height, i) => (
                    <div
                      key={i}
                      className="chart-bar"
                      style={{
                        height: `${height}%`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 3D Order Row Component
  const OrderRow3D = ({ order, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    // Format timestamp to time string
    const formatTime = (timestamp) => {
      if (!timestamp) return 'N/A';
      const date = new Date(timestamp);
      return date.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
    };
    
    return (
      <div
        className={`order-row-3d ${isExpanded ? 'expanded' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          animationDelay: `${index * 0.1}s`
        }}
      >
        <div className="order-row-content">
          <div className="order-cell time-cell-3d">{formatTime(order.timestamp)}</div>
          <div className="order-cell stock-cell-3d">
            <span className="stock-symbol">{order.symbol}</span>
            <span className="stock-name hidden md:inline">
              {order.name}
            </span>
          </div>
          <div className="order-cell type-cell-3d">
            <span className={`badge-3d badge-${order.orderType?.toLowerCase() || 'market'}`}>
              {order.orderType || 'MARKET'}
            </span>
          </div>
          <div className="order-cell quantity-cell-3d">{order.quantity}</div>
          <div className="order-cell price-cell-3d">{formatCurrency(order.price)}</div>
          <div className="order-cell status-cell-3d">
            <span className={`badge-3d badge-${order.status?.toLowerCase() || 'pending'}`}>
              {order.status || 'PENDING'}
            </span>
          </div>
        </div>
        
        {isExpanded && (
          <div className="order-details-3d">
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Total Value</span>
                <span className="detail-value">
                  {formatCurrency(order.quantity * order.price)}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Order Type</span>
                <span className="detail-value">{order.orderType || 'MARKET'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Product Type</span>
                <span className="detail-value">{order.productType || 'INTRADAY'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Order ID</span>
                <span className="detail-value">{order.id}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`dashboard-3d ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* 3D Particle Background Canvas */}
      <canvas
        ref={canvasRef}
        className="particle-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          opacity: 0.6
        }}
      />

      {/* Glassmorphic Header with 3D Effects */}
      <header className="dashboard-header-3d">
        <div className="header-content-3d">
          <div className="header-left-3d">
            <h1 className="dashboard-title-3d">
              <span className="title-gradient">3D Trading Dashboard</span>
            </h1>
            <p className="dashboard-subtitle-3d">
              Advanced visualization with real-time market data
            </p>
          </div>
          <div className="header-right-3d">
            <div className="market-status-3d">
              <div className="status-dot-3d"></div>
              <span className="status-text-3d">Market Open</span>
            </div>
            <button
              className="theme-toggle-3d"
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle theme"
            >
              <i className={`fas fa-${isDarkMode ? 'sun' : 'moon'}`}></i>
            </button>
          </div>
        </div>
      </header>

      {/* Main 3D Grid Layout */}
      <div className="dashboard-grid-3d">
        {/* 3D Metrics Section */}
        <section className="metrics-section-3d">
          <div className="metrics-grid-3d">
            <MetricCard3D
              title="Portfolio Value"
              value={portfolioData.totalValue}
              change={portfolioData.dailyChange}
              changePercent={portfolioData.dailyChangePercent}
              icon="fas fa-wallet"
              color="portfolio"
              index={0}
            />
            <MetricCard3D
              title="Today's P&L"
              value={portfolioData.dailyChange}
              change={portfolioData.dailyChange}
              changePercent={portfolioData.dailyChangePercent}
              icon="fas fa-chart-line"
              color="pnl"
              index={1}
            />
            <MetricCard3D
              title="Active Positions"
              value={portfolioData.activePositions}
              change={0}
              changePercent={0}
              icon="fas fa-exchange-alt"
              color="positions"
              index={2}
            />
          </div>
        </section>

        {/* 3D Voice Trading Section */}
        <section className="voice-trading-section-3d">
          <div className="section-header-3d">
            <h2 className="section-title-3d">
              <i className="fas fa-microphone-alt me-2"></i>
              AI Voice Trading
            </h2>
            <span className="feature-badge-3d">3D Enhanced</span>
          </div>
          <VoiceTrading />
        </section>

        {/* 3D Portfolio Visualization */}
        <section className="portfolio-3d-section">
          <div className="section-header-3d">
            <h2 className="section-title-3d">
              <i className="fas fa-cube me-2"></i>
              3D Portfolio View
            </h2>
          </div>
          <div className="portfolio-3d-container">
            <div className="portfolio-cube">
              {portfolioData.holdings.map((holding, index) => (
                <div
                  key={holding.symbol}
                  className="cube-face"
                  style={{
                    transform: `rotateY(${index * 72}deg) translateZ(150px)`,
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  <div className="holding-card">
                    <h4>{holding.symbol}</h4>
                    <p>{holding.name}</p>
                    <div className="holding-value">{formatCurrency(holding.value)}</div>
                    <div className={`holding-change ${holding.change >= 0 ? 'positive' : 'negative'}`}>
                      {holding.change >= 0 ? '+' : ''}{holding.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3D Quick Actions */}
        <section className="quick-actions-3d-section">
          <div className="section-header-3d">
            <h2 className="section-title-3d">
              <i className="fas fa-rocket me-2"></i>
              Quick Actions
            </h2>
          </div>
          <div className="actions-grid-3d">
          {[
            { icon: 'fas fa-plus-circle', label: 'Buy', color: '#00FFE5', action: () => { setOrderType('BUY'); setShowOrderModal(true); } },
            { icon: 'fas fa-minus-circle', label: 'Sell', color: '#FF006E', action: () => { setOrderType('SELL'); setShowOrderModal(true); } },
            { icon: 'fas fa-history', label: 'Order History', color: '#9D4EDD' },
            { icon: 'fas fa-briefcase', label: 'Holdings', color: '#6366F1' },
            { icon: 'fas fa-chart-bar', label: 'Analytics', color: '#00FFE5' }
          ].map((action, index) => (
            <button
              key={action.label}
              className="action-card-3d"
              style={{
                '--action-color': action.color,
                animationDelay: `${index * 0.1}s`
              }}
              onClick={action.action}
            >
              <div className="action-icon-3d">
                <i className={action.icon}></i>
              </div>
              <div className="action-label-3d">{action.label}</div>
            </button>
          ))}
        </div>
      </section>

      {/* 3D Recent Orders Table */}
      <section className="recent-orders-3d-section">
        <div className="section-header-3d">
          <h2 className="section-title-3d">
            <i className="fas fa-list me-2"></i>
            Recent Orders
          </h2>
          <button className="view-all-btn-3d">View All</button>
        </div>
        <div className="orders-table-3d-container">
          <div className="table-header-3d">
            <div className="header-cell">Time</div>
            <div className="header-cell">Stock</div>
            <div className="header-cell">Type</div>
            <div className="header-cell">Quantity</div>
            <div className="header-cell">Price</div>
            <div className="header-cell">Status</div>
          </div>
          <div className="table-body-3d">
            {orders.slice(0, 5).map((order, index) => (
              <OrderRow3D key={index} order={order} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>

    {/* Order Modal */}
    {showOrderModal && (
      <OrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        orderType={orderType}
      />
    )}
  </div>
  );
};

export default Dashboard3D;
