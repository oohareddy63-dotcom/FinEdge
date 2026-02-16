import React, { useState, useEffect, useRef } from 'react';
import './VoiceTrading.css';

// Voice Trading Component with Speech Recognition and Natural Language Processing
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
        setError(`Speech recognition error: ${event.error}`);
        setIsListening(false);
        speak('Sorry, I could not understand. Please try again.');
      };
      
      recognition.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    } else {
      setError('Speech recognition is not supported in your browser. Please try Chrome or Edge.');
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
      
      // Extract limit price if mentioned
      const priceMatch = text.match(/(?:at|price)\s+(\d+(?:\.\d+)?)/i);
      if (priceMatch) {
        priceType = 'LIMIT';
        // Store limit price for later use
      }
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
    // For demo purposes, return a default price
    // In production, this should be extracted from voice or user input
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
    <div className="voice-trading-container">
      <div className="voice-trading-card">
        <h2 className="text-center mb-4">
          <i className="fas fa-microphone me-2"></i>
          Voice Trading
        </h2>
        
        {/* Microphone Button */}
        <div className="text-center mb-4">
          <button
            className={`btn btn-mic ${isListening ? 'listening' : ''}`}
            onClick={isListening ? stopListening : startListening}
            disabled={isProcessing}
          >
            <i className={`fas fa-microphone${isListening ? '-slash' : ''}`}></i>
            {isListening ? ' Stop Recording' : ' Start Recording'}
          </button>
        </div>

        {/* Status Messages */}
        {isListening && (
          <div className="alert alert-info">
            <i className="fas fa-spinner fa-spin me-2"></i>
            Listening... Please speak your trade command clearly.
          </div>
        )}

        {isProcessing && (
          <div className="alert alert-warning">
            <i className="fas fa-cog fa-spin me-2"></i>
            Processing your command...
          </div>
        )}

        {error && (
          <div className="alert alert-danger">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <i className="fas fa-check-circle me-2"></i>
            {success}
          </div>
        )}

        {/* Transcript Display */}
        {transcript && (
          <div className="transcript-section">
            <h5>You said:</h5>
            <div className="transcript-text">{transcript}</div>
          </div>
        )}

        {/* Trade Confirmation Modal */}
        {showConfirmation && tradeDetails && (
          <div className="confirmation-modal">
            <div className="modal-content">
              <h4 className="mb-3">Confirm Trade</h4>
              <div className="trade-details">
                <div className="detail-row">
                  <span className="label">Action:</span>
                  <span className={`value ${tradeDetails.action === 'BUY' ? 'buy' : 'sell'}`}>
                    {tradeDetails.action}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="label">Stock:</span>
                  <span className="value">{tradeDetails.stock}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Quantity:</span>
                  <span className="value">{tradeDetails.quantity} shares</span>
                </div>
                <div className="detail-row">
                  <span className="label">Price Type:</span>
                  <span className="value">{tradeDetails.priceType}</span>
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="btn btn-success me-2"
                  onClick={confirmTrade}
                >
                  <i className="fas fa-check me-1"></i>
                  Place Trade
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={cancelTrade}
                >
                  <i className="fas fa-times me-1"></i>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="instructions mt-4">
          <h5>How to use:</h5>
          <ul>
            <li>Click the microphone button and speak clearly</li>
            <li>Example commands:</li>
            <ul>
              <li>"Buy 10 shares of Infosys at market price"</li>
              <li>"Sell 5 shares of Reliance at limit price"</li>
              <li>"Purchase 20 stocks of TCS"</li>
            </ul>
            <li>Supported stocks: Infosys, Reliance, TCS, HDFC Bank, SBI, ITC, and more</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VoiceTrading;
