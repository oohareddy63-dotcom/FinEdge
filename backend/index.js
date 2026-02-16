require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");

const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Sample stock data with real-time prices
const stockData = {
  'RELIANCE': { name: 'Reliance Industries Ltd', price: 2456.30, change: 2.5, sector: 'ENERGY' },
  'TCS': { name: 'Tata Consultancy Services', price: 3421.50, change: -0.8, sector: 'IT' },
  'HDFCBANK': { name: 'HDFC Bank Ltd', price: 1456.70, change: 1.2, sector: 'BANKING' },
  'INFY': { name: 'Infosys Ltd', price: 1432.80, change: -1.5, sector: 'IT' },
  'ITC': { name: 'ITC Ltd', price: 432.15, change: 0.9, sector: 'CONSUMER GOODS' },
  'SBIN': { name: 'State Bank of India', price: 523.40, change: 2.1, sector: 'BANKING' },
  'BHARTIARTL': { name: 'Bharti Airtel Ltd', price: 938.50, change: -0.3, sector: 'TELECOM' },
  'HINDUNILVR': { name: 'Hindustan Unilever Ltd', price: 2417.40, change: 0.7, sector: 'CONSUMER GOODS' },
  'KPITTECH': { name: 'KPIT Technologies Ltd', price: 266.45, change: 1.8, sector: 'IT' },
  'M&M': { name: 'Mahindra & Mahindra Ltd', price: 779.80, change: -0.5, sector: 'AUTOMOBILE' }
};

// Search stocks endpoint
app.get("/api/stocks/search", (req, res) => {
  const query = req.query.q || '';
  const results = Object.keys(stockData)
    .filter(symbol => 
      symbol.toLowerCase().includes(query.toLowerCase()) ||
      stockData[symbol].name.toLowerCase().includes(query.toLowerCase())
    )
    .map(symbol => ({
      symbol,
      name: stockData[symbol].name,
      price: stockData[symbol].price,
      change: stockData[symbol].change,
      sector: stockData[symbol].sector
    }))
    .slice(0, 10);
  
  res.json(results);
});

// Get stock details
app.get("/api/stocks/:symbol", (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const stock = stockData[symbol];
  
  if (!stock) {
    return res.status(404).json({ error: 'Stock not found' });
  }
  
  res.json({
    symbol,
    name: stock.name,
    price: stock.price,
    change: stock.change,
    sector: stock.sector,
    timestamp: new Date().toISOString()
  });
});

// Place new order (Zerodha-like)
app.post("/api/orders/place", async (req, res) => {
  try {
    const {
      symbol,
      quantity,
      price,
      orderType = 'MARKET',
      productType = 'INTRADAY',
      validity = 'DAY',
      variety = 'NORMAL',
      userId = 'demo_user'
    } = req.body;

    // Validate required fields
    if (!symbol || !quantity || !price) {
      return res.status(400).json({
        success: false,
        error: 'Symbol, quantity, and price are required'
      });
    }

    // Validate stock exists
    const stock = stockData[symbol.toUpperCase()];
    if (!stock) {
      return res.status(400).json({
        success: false,
        error: 'Invalid stock symbol'
      });
    }

    // Calculate order value and charges
    const orderValue = parseFloat(quantity) * parseFloat(price);
    const brokerage = orderValue * 0.0003; // 0.03% brokerage
    const stt = orderValue * 0.001; // 0.1% STT
    const transactionCharges = orderValue * 0.00003; // 0.003% transaction charges
    const gst = (brokerage + transactionCharges) * 0.18; // 18% GST
    const totalCharges = brokerage + stt + transactionCharges + gst;

    // Create order object
    const newOrder = new OrdersModel({
      symbol: symbol.toUpperCase(),
      name: stock.name,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      orderType,
      productType,
      validity,
      variety,
      userId,
      status: 'PENDING',
      orderValue,
      charges: {
        brokerage: brokerage.toFixed(2),
        stt: stt.toFixed(2),
        transactionCharges: transactionCharges.toFixed(2),
        gst: gst.toFixed(2),
        total: totalCharges.toFixed(2)
      },
      timestamp: new Date(),
      exchange: 'NSE',
      segment: 'EQUITY'
    });

    // Save order to database
    await newOrder.save();

    // Update holdings/positions
    await updateHoldings(userId, symbol.toUpperCase(), parseInt(quantity), orderType, parseFloat(price));

    res.json({
      success: true,
      message: `${orderType} order placed successfully`,
      orderId: newOrder._id,
      order: {
        id: newOrder._id,
        symbol: symbol.toUpperCase(),
        name: stock.name,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        orderType,
        productType,
        status: 'PENDING',
        orderValue,
        charges: newOrder.charges
      }
    });

  } catch (error) {
    console.error('Order placement error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to place order',
      details: error.message
    });
  }
});

// Get user orders
app.get("/api/orders", async (req, res) => {
  try {
    const { userId = 'demo_user', status, limit = 50 } = req.query;
    let filter = { userId };
    
    if (status) {
      filter.status = status.toUpperCase();
    }

    const orders = await OrdersModel.find(filter)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      orders: orders.map(order => ({
        id: order._id,
        symbol: order.symbol,
        name: order.name,
        quantity: order.quantity,
        price: order.price,
        orderType: order.orderType,
        productType: order.productType,
        status: order.status,
        orderValue: order.orderValue,
        charges: order.charges,
        timestamp: order.timestamp,
        exchange: order.exchange,
        segment: order.segment
      }))
    });

  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch orders'
    });
  }
});

// Cancel order
app.put("/api/orders/:orderId/cancel", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { userId = 'demo_user' } = req.body;

    const order = await OrdersModel.findOne({ _id: orderId, userId });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    if (order.status === 'COMPLETE') {
      return res.status(400).json({
        success: false,
        error: 'Cannot cancel completed order'
      });
    }

    order.status = 'CANCELLED';
    order.cancelledAt = new Date();
    await order.save();

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      orderId: order._id
    });

  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to cancel order'
    });
  }
});

// Get user holdings
app.get("/api/holdings", async (req, res) => {
  try {
    const { userId = 'demo_user' } = req.query;
    
    const holdings = await HoldingsModel.find({ userId });
    
    res.json({
      success: true,
      holdings: holdings.map(holding => ({
        id: holding._id,
        symbol: holding.symbol,
        name: holding.name,
        quantity: holding.quantity,
        avgCost: holding.avgCost,
        currentPrice: stockData[holding.symbol]?.price || holding.avgCost,
        value: holding.quantity * (stockData[holding.symbol]?.price || holding.avgCost),
        pnl: holding.quantity * ((stockData[holding.symbol]?.price || holding.avgCost) - holding.avgCost),
        pnlPercent: ((stockData[holding.symbol]?.price || holding.avgCost) - holding.avgCost) / holding.avgCost * 100
      }))
    });

  } catch (error) {
    console.error('Get holdings error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch holdings'
    });
  }
});

// Get user positions
app.get("/api/positions", async (req, res) => {
  try {
    const { userId = 'demo_user' } = req.query;
    
    const positions = await PositionsModel.find({ userId });
    
    res.json({
      success: true,
      positions: positions.map(position => ({
        id: position._id,
        product: position.product,
        symbol: position.symbol,
        name: position.name,
        quantity: position.quantity,
        avg: position.avg,
        price: position.price,
        net: position.net,
        day: position.day,
        isLoss: position.isLoss
      }))
    });

  } catch (error) {
    console.error('Get positions error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch positions'
    });
  }
});

// Get portfolio summary
app.get("/api/portfolio", async (req, res) => {
  try {
    const { userId = 'demo_user' } = req.query;
    
    const holdings = await HoldingsModel.find({ userId });
    const orders = await OrdersModel.find({ userId, status: 'COMPLETE' });
    
    let totalInvestment = 0;
    let currentValue = 0;
    let totalPnL = 0;
    
    holdings.forEach(holding => {
      const currentPrice = stockData[holding.symbol]?.price || holding.avgCost;
      const value = holding.quantity * currentPrice;
      totalInvestment += holding.quantity * holding.avgCost;
      currentValue += value;
      totalPnL += value - (holding.quantity * holding.avgCost);
    });

    const todayOrders = orders.filter(order => {
      const orderDate = new Date(order.timestamp).toDateString();
      const today = new Date().toDateString();
      return orderDate === today;
    });

    res.json({
      success: true,
      portfolio: {
        totalInvestment,
        currentValue,
        totalPnL,
        totalPnLPercent: totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0,
        totalHoldings: holdings.length,
        todayOrders: todayOrders.length,
        totalOrders: orders.length
      }
    });

  } catch (error) {
    console.error('Portfolio error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch portfolio'
    });
  }
});

// Helper function to update holdings
async function updateHoldings(userId, symbol, quantity, orderType, price) {
  try {
    let holding = await HoldingsModel.findOne({ userId, symbol });
    
    if (orderType === 'BUY') {
      if (holding) {
        // Update existing holding
        const newQuantity = holding.quantity + quantity;
        const newAvgCost = ((holding.quantity * holding.avgCost) + (quantity * price)) / newQuantity;
        holding.quantity = newQuantity;
        holding.avgCost = newAvgCost;
        await holding.save();
      } else {
        // Create new holding
        const newHolding = new HoldingsModel({
          userId,
          symbol,
          name: stockData[symbol]?.name || symbol,
          quantity,
          avgCost: price,
          currentPrice: price
        });
        await newHolding.save();
      }
    } else if (orderType === 'SELL') {
      if (holding && holding.quantity >= quantity) {
        // Reduce holding
        holding.quantity -= quantity;
        if (holding.quantity === 0) {
          await HoldingsModel.deleteOne({ _id: holding._id });
        } else {
          await holding.save();
        }
      }
    }
  } catch (error) {
    console.error('Update holdings error:', error);
  }
}

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};

// Connect to database before starting server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App started on port ${PORT}!`);
  });
});
