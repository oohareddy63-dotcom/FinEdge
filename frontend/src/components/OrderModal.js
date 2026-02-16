import React, { useState, useEffect } from 'react';

const OrderModal = ({ isOpen, onClose, initialOrderType = 'BUY' }) => {
  const [orderType, setOrderType] = useState(initialOrderType);
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [productType, setProductType] = useState('INTRADAY');
  const [validity, setValidity] = useState('DAY');
  const [variety, setVariety] = useState('NORMAL');

  // Sample stock data for autocomplete
  const [stocks, setStocks] = useState([
    { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', price: 2456.30, change: 2.5 },
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3421.50, change: -0.8 },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1456.70, change: 1.2 },
    { symbol: 'INFY', name: 'Infosys Ltd', price: 1432.80, change: -1.5 },
    { symbol: 'ITC', name: 'ITC Ltd', price: 432.15, change: 0.9 },
    { symbol: 'SBIN', name: 'State Bank of India', price: 523.40, change: 2.1 },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', price: 938.50, change: -0.3 },
    { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd', price: 2417.40, change: 0.7 },
    { symbol: 'KPITTECH', name: 'KPIT Technologies Ltd', price: 266.45, change: 1.8 },
    { symbol: 'M&M', name: 'Mahindra & Mahindra Ltd', price: 779.80, change: -0.5 }
  ]);

  const [filteredStocks, setFilteredStocks] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Filter stocks based on input
  useEffect(() => {
    if (symbol.length > 0) {
      const filtered = stocks.filter(stock => 
        stock.symbol.toLowerCase().includes(symbol.toLowerCase()) ||
        stock.name.toLowerCase().includes(symbol.toLowerCase())
      );
      setFilteredStocks(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredStocks([]);
      setShowSuggestions(false);
    }
  }, [symbol]);

  // Calculate order value and charges
  const orderValue = quantity && price ? parseFloat(quantity) * parseFloat(price) : 0;
  const brokerage = orderValue * 0.0003; // 0.03% brokerage
  const stt = orderValue * 0.001; // 0.1% STT
  const transactionCharges = orderValue * 0.00003; // 0.003% transaction charges
  const gst = (brokerage + transactionCharges) * 0.18; // 18% GST
  const totalCharges = brokerage + stt + transactionCharges + gst;

  // Handle stock selection
  const handleStockSelect = (stock) => {
    setSymbol(stock.symbol);
    setPrice(stock.price.toString());
    setShowSuggestions(false);
  };

  // Handle order submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!symbol || !quantity || !price) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('/api/orders/place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbol,
          quantity: parseInt(quantity),
          price: parseFloat(price),
          orderType,
          productType,
          validity,
          variety,
          userId: 'demo_user'
        })
      });

      const result = await response.json();
      
      if (result.success) {
        alert(`${orderType} order placed successfully! Order ID: ${result.orderId}`);
        
        // Clear form
        setSymbol('');
        setQuantity('');
        setPrice('');
        setProductType('INTRADAY');
        setValidity('DAY');
        setVariety('NORMAL');
        
        // Close modal
        onClose();
        
        // Trigger order refresh
        window.dispatchEvent(new CustomEvent('orderPlaced'));
      } else {
        alert(result.error || 'Failed to place order');
      }
    } catch (error) {
      console.error('Order placement error:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay-3d" onClick={onClose}>
      <div className="order-modal-3d" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-3d">
          <h2 className="modal-title-3d">
            <i className="fas fa-chart-line me-2"></i>
            Place {orderType} Order
          </h2>
          <button className="close-modal-3d" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form className="modal-body-3d" onSubmit={handleSubmit}>
          <div className="form-row-3d">
            <div className="form-group-3d">
              <label className="form-label-3d">Symbol *</label>
              <div className="autocomplete-container">
                <input
                  type="text"
                  className="form-input-3d"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                  placeholder="Search stock..."
                  required
                />
                {showSuggestions && filteredStocks.length > 0 && (
                  <div className="suggestions-dropdown">
                    {filteredStocks.map((stock, index) => (
                      <div
                        key={index}
                        className="suggestion-item"
                        onClick={() => handleStockSelect(stock)}
                      >
                        <div className="suggestion-symbol">{stock.symbol}</div>
                        <div className="suggestion-name">{stock.name}</div>
                        <div className="suggestion-price">₹{stock.price}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="form-group-3d">
              <label className="form-label-3d">Quantity *</label>
              <input
                type="number"
                className="form-input-3d"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                min="1"
                required
              />
            </div>

            <div className="form-group-3d">
              <label className="form-label-3d">Price *</label>
              <input
                type="number"
                className="form-input-3d"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                min="0.01"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="form-row-3d">
            <div className="form-group-3d">
              <label className="form-label-3d">Order Type</label>
              <select className="form-select-3d" value={orderType} onChange={(e) => setOrderType(e.target.value)}>
                <option value="MARKET">MARKET</option>
                <option value="LIMIT">LIMIT</option>
                <option value="SL">STOP LOSS</option>
                <option value="SL-M">STOP LOSS MARKET</option>
              </select>
            </div>

            <div className="form-group-3d">
              <label className="form-label-3d">Product Type</label>
              <select className="form-select-3d" value={productType} onChange={(e) => setProductType(e.target.value)}>
                <option value="INTRADAY">INTRADAY</option>
                <option value="DELIVERY">DELIVERY</option>
                <option value="MARGIN">MARGIN</option>
                <option value="COVER">COVER ORDER</option>
              </select>
            </div>
          </div>

          <div className="form-row-3d">
            <div className="form-group-3d">
              <label className="form-label-3d">Validity</label>
              <select className="form-select-3d" value={validity} onChange={(e) => setValidity(e.target.value)}>
                <option value="DAY">DAY</option>
                <option value="IOC">IOC</option>
              </select>
            </div>

            <div className="form-group-3d">
              <label className="form-label-3d">Variety</label>
              <select className="form-select-3d" value={variety} onChange={(e) => setVariety(e.target.value)}>
                <option value="NORMAL">NORMAL</option>
                <option value="AMO">AMO</option>
              </select>
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary-3d">
            <h3 className="summary-title">Order Summary</h3>
            <div className="summary-row">
              <span className="summary-label">Order Value:</span>
              <span className="summary-value">{formatCurrency(orderValue)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Brokerage (0.03%):</span>
              <span className="summary-value">{formatCurrency(brokerage)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">STT (0.1%):</span>
              <span className="summary-value">{formatCurrency(stt)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Transaction Charges:</span>
              <span className="summary-value">{formatCurrency(transactionCharges)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">GST (18%):</span>
              <span className="summary-value">{formatCurrency(gst)}</span>
            </div>
            <div className="summary-row total">
              <span className="summary-label">Total Charges:</span>
              <span className="summary-value">{formatCurrency(totalCharges)}</span>
            </div>
          </div>

          <div className="form-actions-3d">
            <button type="button" className="btn-cancel-3d" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={`btn-submit-3d ${orderType.toLowerCase()}`}>
              Place {orderType} Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
