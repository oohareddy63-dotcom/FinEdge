import React, { useState, useEffect, useRef } from 'react';
import './VoiceTrading.css';

// Modern Voice Trading Component with Premium Fintech Design
const VoiceTrading = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [tradeDetails, setTradeDetails] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  // Initialize speech recognition on component mount
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      // Configure speech recognition
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
        setError('');
      };
      
      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        console.log('Speech recognized:', transcript);
        setTranscript(transcript);
        processTradeCommand(transcript);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError(`Could not understand. Please try again.`);
        setIsListening(false);
        speak('Sorry, I could not understand. Please try again.');
      };
      
      recognition.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    } else {
      setError('Voice recognition is not supported in your browser. Please try Chrome or Edge.');
    }
  }, []);

  // Text-to-speech function for voice feedback
  const speak = (text) => {
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;
    
    synthRef.current.speak(utterance);
  };

  // Natural language processing to extract trade details
  const processTradeCommand = (text) => {
    setIsProcessing(true);
    setError('');
    
    const lowerText = text.toLowerCase();
    
    // Extract action (buy/sell)
    let action = null;
    if (lowerText.includes('buy') || lowerText.includes('purchase') || lowerText.includes('long')) {
      action = 'BUY';
    } else if (lowerText.includes('sell') || lowerText.includes('exit') || lowerText.includes('short')) {
      action = 'SELL';
    }
    
    // Extract quantity
    let quantity = null;
    const quantityPatterns = [
      /(\d+)\s+shares?/i,
      /(\d+)\s+stocks?/i,
      /(\d+)\s+units?/i,
      /quantity\s+(\d+)/i,
      /qty\s+(\d+)/i,
      /(\d+)/i
    ];
    
    for (const pattern of quantityPatterns) {
      const match = text.match(pattern);
      if (match) {
        quantity = parseInt(match[1]);
        break;
      }
    }
    
    // Extract stock name (common Indian stocks)
    let stock = null;
    const stockMappings = {
      'infosys': 'INFY',
      'reliance': 'RELIANCE',
      'tcs': 'TCS',
      'hdfc': 'HDFCBANK',
      'hdfc bank': 'HDFCBANK',
      'icici': 'ICICIBANK',
      'icici bank': 'ICICIBANK',
      'sbi': 'SBIN',
      'state bank': 'SBIN',
      'tata': 'TATASTEEL',
      'tata steel': 'TATASTEEL',
      'tata power': 'TATAPOWER',
      'itc': 'ITC',
      'hindustan unilever': 'HINDUNILVR',
      'hindunilvr': 'HINDUNILVR',
      'wipro': 'WIPRO',
      'bharti airtel': 'BHARTIARTL',
      'airtel': 'BHARTIARTL',
      'kotak': 'KOTAKBANK',
      'kotak bank': 'KOTAKBANK',
      'axis': 'AXISBANK',
      'axis bank': 'AXISBANK'
    };
    
    for (const [key, value] of Object.entries(stockMappings)) {
      if (lowerText.includes(key)) {
        stock = value;
        break;
      }
    }
    
    // Extract price type
    let priceType = 'MARKET';
    if (lowerText.includes('limit') || lowerText.includes('price')) {
      priceType = 'LIMIT';
    }
    
    // Validate extracted information
    if (!action) {
      setError('Could not determine buy/sell action. Please say "buy" or "sell".');
      setIsProcessing(false);
      return;
    }
    
    if (!quantity) {
      setError('Could not determine quantity. Please specify number of shares.');
      setIsProcessing(false);
      return;
    }
    
    if (!stock) {
      setError('Could not recognize stock name. Please try a well-known stock like Infosys, Reliance, or TCS.');
      setIsProcessing(false);
      return;
    }
    
    // Set trade details and show confirmation
    const details = {
      action,
      stock,
      quantity,
      priceType,
      originalText: text
    };
    
    setTradeDetails(details);
    setShowConfirmation(true);
    setIsProcessing(false);
    
    // Voice feedback
    speak(`I understood: ${action} ${quantity} shares of ${stock} at ${priceType} price. Please confirm.`);
  };

  // Start voice recognition
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      setTradeDetails(null);
      setShowConfirmation(false);
      setError('');
      recognitionRef.current.start();
    }
  };

  // Stop voice recognition
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  // Confirm and place trade
  const confirmTrade = async () => {
    if (!tradeDetails) return;
    
    try {
      // Get current market price
      const marketPrice = getLimitPrice();
      
      const response = await fetch('/api/orders/place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbol: tradeDetails.stock,
          quantity: parseInt(tradeDetails.quantity),
          price: tradeDetails.priceType === 'MARKET' ? marketPrice : getLimitPrice(),
          orderType: tradeDetails.action, // BUY or SELL
          productType: 'DELIVERY',
          validity: 'DAY',
          variety: 'NORMAL',
          userId: 'demo_user'
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSuccess(`Order placed successfully! Order ID: ${result.orderId}`);
        speak(`Order placed successfully for ${tradeDetails.action} ${tradeDetails.quantity} shares of ${tradeDetails.stock}`);
        setShowConfirmation(false);
        setTradeDetails(null);
        setTranscript('');
      } else {
        setError(`Failed to place order: ${result.message}`);
        speak('Sorry, there was an error placing your order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Network error. Please check your connection and try again.');
      speak('Sorry, there was a network error. Please try again.');
    }
  };

  // Get limit price (simplified - in real app, this would come from user input)
  const getLimitPrice = () => {
    return 1500;
  };

  // Cancel trade
  const cancelTrade = () => {
    setShowConfirmation(false);
    setTradeDetails(null);
    setTranscript('');
    speak('Trade cancelled.');
  };

  return (
    <div className="voice-trading-modern">
      {/* Status Messages */}
      {isListening && (
        <div className="status-message listening">
          <div className="status-icon">
            <div className="listening-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="status-content">
            <h4>Listening...</h4>
            <p>Speak your trade command clearly</p>
          </div>
        </div>
      )}

      {isProcessing && (
        <div className="status-message processing">
          <div className="status-icon">
            <div className="processing-spinner"></div>
          </div>
          <div className="status-content">
            <h4>Processing...</h4>
            <p>Understanding your command</p>
          </div>
        </div>
      )}

      {error && (
        <div className="status-message error">
          <div className="status-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <div className="status-content">
            <h4>Try Again</h4>
            <p>{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="status-message success">
          <div className="status-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="status-content">
            <h4>Success!</h4>
            <p>{success}</p>
          </div>
        </div>
      )}

      {/* Main Interface */}
      <div className="voice-interface">
        <div className="microphone-section">
          <button
            className={`mic-button ${isListening ? 'listening' : ''}`}
            onClick={isListening ? stopListening : startListening}
            disabled={isProcessing}
          >
            <div className="mic-icon">
              <i className={`fas fa-microphone${isListening ? '-slash' : ''}`}></i>
            </div>
            <span className="mic-text">
              {isListening ? 'Stop Recording' : 'Start Voice Trading'}
            </span>
          </button>
        </div>

        {/* Transcript Display */}
        {transcript && (
          <div className="transcript-display">
            <div className="transcript-label">You said:</div>
            <div className="transcript-text">{transcript}</div>
          </div>
        )}

        {/* Trade Confirmation Modal */}
        {showConfirmation && tradeDetails && (
          <div className="confirmation-overlay">
            <div className="confirmation-modal">
              <div className="confirmation-header">
                <h3>Confirm Trade</h3>
                <p>Please review your trade details</p>
              </div>
              
              <div className="trade-details-grid">
                <div className="detail-item">
                  <span className="detail-label">Action</span>
                  <span className={`detail-value ${tradeDetails.action === 'BUY' ? 'buy' : 'sell'}`}>
                    {tradeDetails.action}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Stock</span>
                  <span className="detail-value">{tradeDetails.stock}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Quantity</span>
                  <span className="detail-value">{tradeDetails.quantity} shares</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Price Type</span>
                  <span className="detail-value">{tradeDetails.priceType}</span>
                </div>
              </div>
              
              <div className="confirmation-actions">
                <button 
                  className="btn-confirm"
                  onClick={confirmTrade}
                >
                  <i className="fas fa-check me-2"></i>
                  Place Trade
                </button>
                <button 
                  className="btn-cancel"
                  onClick={cancelTrade}
                >
                  <i className="fas fa-times me-2"></i>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Examples */}
        <div className="voice-examples">
          <h4>Try saying:</h4>
          <div className="examples-grid">
            <div className="example-item">
              <i className="fas fa-microphone-alt example-icon"></i>
              <span>"Buy 10 shares of Infosys at market price"</span>
            </div>
            <div className="example-item">
              <i className="fas fa-microphone-alt example-icon"></i>
              <span>"Sell 5 shares of Reliance"</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceTrading;
