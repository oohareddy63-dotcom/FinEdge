const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
  symbol: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  orderType: { type: String, default: "MARKET" },
  productType: { type: String, default: "INTRADAY" },
  validity: { type: String, default: "DAY" },
  variety: { type: String, default: "NORMAL" },
  userId: { type: String, default: "demo_user" },
  status: { type: String, default: "PENDING" },
  orderValue: { type: Number },
  charges: {
    brokerage: { type: String },
    stt: { type: String },
    transactionCharges: { type: String },
    gst: { type: String },
    total: { type: String }
  },
  exchange: { type: String, default: "NSE" },
  segment: { type: String, default: "EQUITY" },
  timestamp: { type: Date, default: Date.now },
  cancelledAt: { type: Date }
});

module.exports = { OrdersSchema };
