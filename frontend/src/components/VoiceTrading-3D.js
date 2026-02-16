import React, { useState, useEffect, useRef, useMemo } from 'react';
import './VoiceTrading-3D.css';

/**
 * Advanced 3D Voice Trading Component
 * Features: 3D microphone, glassmorphic UI, particle effects, advanced animations
 * 
 * @component VoiceTrading3D
 * @description Premium voice trading interface with 3D effects and modern UI
 */
const VoiceTrading3D = () => {
  // State management for voice trading functionality
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [tradeDetails, setTradeDetails] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [voiceLevel, setVoiceLevel] = useState(0);
  const [animationPhase, setAnimationPhase] = useState(0);
  
  // Refs for DOM elements and APIs
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);

  // Initialize speech recognition and audio context
  useEffect(() => {
    // Initialize Web Speech API for voice recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      // Configure speech recognition settings
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;
      
      // Speech recognition event handlers
      recognition.onstart = () => {
        console.log('🎤 Speech recognition started');
        setIsListening(true);
        setError('');
        startAudioVisualization();
      };
      
      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        console.log('🗣️ Speech recognized:', transcript);
        setTranscript(transcript);
        processTradeCommand(transcript);
      };
      
      recognition.onerror = (event) => {
        console.error('❌ Speech recognition error:', event.error);
        handleRecognitionError(event.error);
      };
      
      recognition.onend = () => {
        console.log('🔇 Speech recognition ended');
        setIsListening(false);
        stopAudioVisualization();
      };
      
      recognitionRef.current = recognition;
    } else {
      setError('🚫 Voice recognition is not supported in your browser. Please try Chrome or Edge for the best experience.');
    }

    // Cleanup on unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Initialize audio visualization
  const startAudioVisualization = async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Create audio context and analyser
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      
      // Configure analyser
      analyserRef.current.fftSize = 256;
      analyserRef.current.smoothingTimeConstant = 0.8;
      
      // Connect audio nodes
      microphoneRef.current.connect(analyserRef.current);
      
      // Start visualization
      visualizeAudio();
    } catch (error) {
      console.error('🎤 Microphone access denied:', error);
      setError('🎤 Microphone access is required for voice trading. Please allow microphone access.');
    }
  };

  // Stop audio visualization
  const stopAudioVisualization = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setVoiceLevel(0);
  };

  // Visualize audio levels
  const visualizeAudio = () => {
    if (!analyserRef.current) return;
    
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const draw = () => {
      animationFrameRef.current = requestAnimationFrame(draw);
      
      analyserRef.current.getByteFrequencyData(dataArray);
      
      // Calculate average voice level
      const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
      setVoiceLevel(average / 255);
      
      // Update animation phase for 3D effects
      setAnimationPhase(prev => (prev + 0.05) % (Math.PI * 2));
    };
    
    draw();
  };

  // Handle speech recognition errors
  const handleRecognitionError = (error) => {
    let errorMessage = '';
    
    switch (error) {
      case 'no-speech':
        errorMessage = '🤫 No speech detected. Please try speaking clearly.';
        break;
      case 'audio-capture':
        errorMessage = '🎤 Microphone not accessible. Please check your microphone settings.';
        break;
      case 'not-allowed':
        errorMessage = '🔒 Microphone access denied. Please allow microphone access to use voice trading.';
        break;
      case 'network':
        errorMessage = '🌐 Network error. Please check your internet connection.';
        break;
      default:
        errorMessage = '🤔 Could not understand. Please try again.';
    }
    
    setError(errorMessage);
    setIsListening(false);
    speak(errorMessage);
  };

  // Enhanced text-to-speech with natural voice
  const speak = (text) => {
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure voice settings for natural speech
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;
    
    // Select preferred voice
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Samantha') || 
      voice.name.includes('Karen')
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    synthRef.current.speak(utterance);
  };

  // Advanced natural language processing for trade commands
  const processTradeCommand = (text) => {
    setIsProcessing(true);
    setError('');
    
    const lowerText = text.toLowerCase().trim();
    console.log('🧠 Processing command:', lowerText);
    
    // Extract action (buy/sell) with enhanced patterns
    let action = null;
    const buyPatterns = ['buy', 'purchase', 'long', 'invest', 'acquire', 'get'];
    const sellPatterns = ['sell', 'exit', 'short', 'liquidate', 'offload', 'close'];
    
    if (buyPatterns.some(pattern => lowerText.includes(pattern))) {
      action = 'BUY';
    } else if (sellPatterns.some(pattern => lowerText.includes(pattern))) {
      action = 'SELL';
    }
    
    // Extract quantity with advanced patterns
    let quantity = null;
    const quantityPatterns = [
      /(\d+)\s+(?:shares?|stocks?|units?)/i,
      /(?:quantity|qty)\s+(\d+)/i,
      /(\d+)(?=\s+(?:shares?|stocks?|units?|$))/i,
      /(?:buy|sell|purchase|exit)\s+(\d+)/i
    ];
    
    for (const pattern of quantityPatterns) {
      const match = lowerText.match(pattern);
      if (match) {
        quantity = parseInt(match[1]);
        break;
      }
    }
    
    // Enhanced stock name recognition with fuzzy matching
    let stock = null;
    const stockMappings = {
      // Major Indian stocks with multiple name variations
      'infosys': 'INFY',
      'infy': 'INFY',
      'information technology': 'INFY',
      
      'reliance': 'RELIANCE',
      'reliance industries': 'RELIANCE',
      'rIL': 'RELIANCE',
      
      'tcs': 'TCS',
      'tata consultancy': 'TCS',
      'tata consultancy services': 'TCS',
      
      'hdfc': 'HDFCBANK',
      'hdfc bank': 'HDFCBANK',
      'housing development finance': 'HDFCBANK',
      
      'icici': 'ICICIBANK',
      'icici bank': 'ICICIBANK',
      
      'sbi': 'SBIN',
      'state bank': 'SBIN',
      'state bank of india': 'SBIN',
      
      'tata': 'TATASTEEL',
      'tata steel': 'TATASTEEL',
      'tata power': 'TATAPOWER',
      'tata motors': 'TATAMOTORS',
      
      'itc': 'ITC',
      'itc limited': 'ITC',
      
      'hindustan unilever': 'HINDUNILVR',
      'hul': 'HINDUNILVR',
      'hindunilvr': 'HINDUNILVR',
      
      'wipro': 'WIPRO',
      'wipro limited': 'WIPRO',
      
      'bharti airtel': 'BHARTIARTL',
      'airtel': 'BHARTIARTL',
      
      'kotak': 'KOTAKBANK',
      'kotak bank': 'KOTAKBANK',
      'kotak mahindra': 'KOTAKBANK',
      
      'axis': 'AXISBANK',
      'axis bank': 'AXISBANK'
    };
    
    // Find best matching stock
    for (const [key, value] of Object.entries(stockMappings)) {
      if (lowerText.includes(key)) {
        stock = value;
        break;
      }
    }
    
    // Extract price type with enhanced patterns
    let priceType = 'MARKET';
    const limitPatterns = ['limit', 'price', 'at', 'rate', 'value'];
    const marketPatterns = ['market', 'current', 'now', 'immediate'];
    
    if (limitPatterns.some(pattern => lowerText.includes(pattern))) {
      priceType = 'LIMIT';
    } else if (marketPatterns.some(pattern => lowerText.includes(pattern))) {
      priceType = 'MARKET';
    }
    
    // Validate extracted information with detailed error messages
    if (!action) {
      setError('🤷‍♂️ Could not determine buy/sell action. Please say "buy" or "sell" clearly.');
      setIsProcessing(false);
      return;
    }
    
    if (!quantity || quantity <= 0) {
      setError('📊 Could not determine quantity. Please specify the number of shares (e.g., "10 shares").');
      setIsProcessing(false);
      return;
    }
    
    if (!stock) {
      setError('🏢 Could not recognize stock name. Please try a well-known stock like "Infosys", "Reliance", "TCS", or "HDFC Bank".');
      setIsProcessing(false);
      return;
    }
    
    // Validate quantity limits
    if (quantity > 1000) {
      setError('📈 Quantity too high. Maximum allowed quantity is 1000 shares per order.');
      setIsProcessing(false);
      return;
    }
    
    // Create trade details object
    const details = {
      action,
      stock,
      quantity,
      priceType,
      originalText: text,
      timestamp: new Date().toISOString(),
      confidence: 0.95 // Simulated confidence score
    };
    
    setTradeDetails(details);
    setShowConfirmation(true);
    setIsProcessing(false);
    
    // Enhanced voice feedback
    const feedbackMessage = `✅ I understood: ${action} ${quantity} shares of ${stock} at ${priceType} price. Please confirm to proceed.`;
    speak(feedbackMessage);
  };

  // Start voice recognition with enhanced error handling
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      setTradeDetails(null);
      setShowConfirmation(false);
      setError('');
      setSuccess('');
      
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('❌ Failed to start recognition:', error);
        setError('❌ Failed to start voice recognition. Please refresh the page and try again.');
      }
    }
  };

  // Stop voice recognition
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  // Confirm and place trade with enhanced error handling
  const confirmTrade = async () => {
    if (!tradeDetails) return;
    
    try {
      // Show processing state
      setIsProcessing(true);
      
      // Get current market price for the stock
      const marketPrice = getLimitPrice(tradeDetails.stock);
      
      // Prepare order payload - match backend API expectations
      const orderPayload = {
        symbol: tradeDetails.stock,
        quantity: parseInt(tradeDetails.quantity),
        price: tradeDetails.priceType === 'MARKET' ? marketPrice : getLimitPrice(tradeDetails.stock),
        orderType: tradeDetails.action, // BUY or SELL
        productType: 'DELIVERY', // CNC = DELIVERY
        validity: 'DAY',
        variety: 'NORMAL',
        userId: 'demo_user'
      };
      
      console.log('📤 Placing order:', orderPayload);
      
      // Make API call to backend
      const response = await fetch('/api/orders/place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload)
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Success handling
        const successMessage = `🎉 Order placed successfully! Order ID: ${result.orderId}. Your ${tradeDetails.action} order for ${tradeDetails.quantity} shares of ${tradeDetails.stock} has been executed.`;
        setSuccess(successMessage);
        speak(successMessage);
        
        // Reset state
        setShowConfirmation(false);
        setTradeDetails(null);
        setTranscript('');
      } else {
        // Error handling
        const errorMessage = `❌ Failed to place order: ${result.message}`;
        setError(errorMessage);
        speak(errorMessage);
      }
    } catch (error) {
      console.error('🌐 Network error:', error);
      const errorMessage = '🌐 Network error. Please check your internet connection and try again.';
      setError(errorMessage);
      speak(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  // Get limit price (simplified - in production, this would come from real-time market data)
  const getLimitPrice = (stockSymbol) => {
    const mockPrices = {
      'INFY': 1555.45,
      'RELIANCE': 2112.40,
      'TCS': 3194.80,
      'HDFCBANK': 1456.30,
      'ITC': 432.15,
      'ICICIBANK': 876.50,
      'SBIN': 543.20,
      'TATASTEEL': 123.45,
      'HINDUNILVR': 2456.70,
      'WIPRO': 398.25,
      'BHARTIARTL': 765.80,
      'KOTAKBANK': 1876.90,
      'AXISBANK': 987.65
    };
    
    return mockPrices[stockSymbol] || 1000;
  };

  // Cancel trade
  const cancelTrade = () => {
    setShowConfirmation(false);
    setTradeDetails(null);
    setTranscript('');
    speak('❌ Trade cancelled. You can start a new trade anytime.');
  };

  // Calculate 3D microphone rotation based on voice level
  const microphoneRotation = useMemo(() => {
    if (!isListening) return 0;
    return Math.sin(animationPhase) * 10 + voiceLevel * 20;
  }, [isListening, animationPhase, voiceLevel]);

  // Calculate 3D microphone scale based on voice level
  const microphoneScale = useMemo(() => {
    if (!isListening) return 1;
    return 1 + voiceLevel * 0.2;
  }, [isListening, voiceLevel]);

  return (
    <div className="voice-trading-3d">
      {/* 3D Voice Level Visualization */}
      {isListening && (
        <div className="voice-visualizer-3d">
          <canvas
            ref={canvasRef}
            width={300}
            height={100}
            className="voice-canvas"
          />
        </div>
      )}

      {/* Enhanced Status Messages with 3D Effects */}
      {isListening && (
        <div className="status-message-3d listening">
          <div className="status-icon-3d">
            <div className="listening-waves">
              <div className="wave wave-1"></div>
              <div className="wave wave-2"></div>
              <div className="wave wave-3"></div>
            </div>
          </div>
          <div className="status-content-3d">
            <h4>🎤 Listening...</h4>
            <p>Speak your trade command clearly and confidently</p>
            <div className="voice-level-indicator">
              <div 
                className="voice-level-bar"
                style={{ width: `${voiceLevel * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {isProcessing && (
        <div className="status-message-3d processing">
          <div className="status-icon-3d">
            <div className="processing-cube">
              <div className="cube-face cube-front"></div>
              <div className="cube-face cube-back"></div>
              <div className="cube-face cube-left"></div>
              <div className="cube-face cube-right"></div>
              <div className="cube-face cube-top"></div>
              <div className="cube-face cube-bottom"></div>
            </div>
          </div>
          <div className="status-content-3d">
            <h4>🧠 Processing...</h4>
            <p>Understanding your command and extracting trade details</p>
          </div>
        </div>
      )}

      {error && (
        <div className="status-message-3d error">
          <div className="status-icon-3d">
            <div className="error-pulse">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
          </div>
          <div className="status-content-3d">
            <h4>⚠️ Try Again</h4>
            <p>{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="status-message-3d success">
          <div className="status-icon-3d">
            <div className="success-orbit">
              <i className="fas fa-check-circle"></i>
            </div>
          </div>
          <div className="status-content-3d">
            <h4>🎉 Success!</h4>
            <p>{success}</p>
          </div>
        </div>
      )}

      {/* Main 3D Voice Interface */}
      <div className="voice-interface-3d">
        {/* 3D Microphone Button */}
        <div className="microphone-section-3d">
          <div className="mic-container-3d">
            <button
              className={`mic-button-3d ${isListening ? 'listening' : ''}`}
              onClick={isListening ? stopListening : startListening}
              disabled={isProcessing}
              style={{
                transform: `
                  perspective(1000px) 
                  rotateX(${microphoneRotation}deg) 
                  rotateY(${microphoneRotation * 0.5}deg) 
                  scale(${microphoneScale})
                `,
                transition: 'transform 0.3s ease-out'
              }}
            >
              <div className="mic-3d-sphere">
                <div className="mic-core">
                  <i className={`fas fa-microphone${isListening ? '-slash' : ''}`}></i>
                </div>
                <div className="mic-rings">
                  <div className="ring ring-1"></div>
                  <div className="ring ring-2"></div>
                  <div className="ring ring-3"></div>
                </div>
              </div>
              <span className="mic-text-3d">
                {isListening ? '🔴 Stop Recording' : '🎤 Start Voice Trading'}
              </span>
            </button>
          </div>
        </div>

        {/* 3D Transcript Display */}
        {transcript && (
          <div className="transcript-display-3d">
            <div className="transcript-label-3d">🗣️ You said:</div>
            <div className="transcript-text-3d">{transcript}</div>
          </div>
        )}

        {/* 3D Trade Confirmation Modal */}
        {showConfirmation && tradeDetails && (
          <div className="confirmation-overlay-3d">
            <div className="confirmation-modal-3d">
              <div className="confirmation-header-3d">
                <h3>🔍 Confirm Your Trade</h3>
                <p>Please review your trade details carefully before proceeding</p>
              </div>
              
              <div className="trade-details-3d">
                <div className="detail-cube">
                  <div className="cube-face detail-face">
                    <span className="detail-label-3d">Action</span>
                    <span className={`detail-value-3d ${tradeDetails.action === 'BUY' ? 'buy' : 'sell'}`}>
                      {tradeDetails.action}
                    </span>
                  </div>
                </div>
                
                <div className="detail-cube">
                  <div className="cube-face detail-face">
                    <span className="detail-label-3d">Stock</span>
                    <span className="detail-value-3d">{tradeDetails.stock}</span>
                  </div>
                </div>
                
                <div className="detail-cube">
                  <div className="cube-face detail-face">
                    <span className="detail-label-3d">Quantity</span>
                    <span className="detail-value-3d">{tradeDetails.quantity} shares</span>
                  </div>
                </div>
                
                <div className="detail-cube">
                  <div className="cube-face detail-face">
                    <span className="detail-label-3d">Price Type</span>
                    <span className="detail-value-3d">{tradeDetails.priceType}</span>
                  </div>
                </div>
              </div>
              
              <div className="confirmation-actions-3d">
                <button 
                  className="btn-confirm-3d"
                  onClick={confirmTrade}
                  disabled={isProcessing}
                >
                  <div className="btn-3d-content">
                    <i className="fas fa-check me-2"></i>
                    <span>{isProcessing ? '⏳ Placing Order...' : '✅ Place Trade'}</span>
                  </div>
                  <div className="btn-3d-glow"></div>
                </button>
                <button 
                  className="btn-cancel-3d"
                  onClick={cancelTrade}
                >
                  <div className="btn-3d-content">
                    <i className="fas fa-times me-2"></i>
                    <span>❌ Cancel</span>
                  </div>
                  <div className="btn-3d-glow"></div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3D Voice Examples */}
        <div className="voice-examples-3d">
          <h4>💡 Try saying:</h4>
          <div className="examples-grid-3d">
            {[
              "🎤 Buy 10 shares of Infosys at market price",
              "🔴 Sell 5 shares of Reliance at limit price",
              "💰 Purchase 20 stocks of TCS immediately"
            ].map((example, index) => (
              <div 
                key={index}
                className="example-item-3d"
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <div className="example-icon-3d">
                  <i className="fas fa-microphone-alt"></i>
                </div>
                <span className="example-text-3d">{example}</span>
                <div className="example-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceTrading3D;
