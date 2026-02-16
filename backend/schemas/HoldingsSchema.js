const { Schema } = require("mongoose");

const HoldingsSchema = new Schema({
  userId: { type: String, default: "demo_user" },
  symbol: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  avgCost: { type: Number, required: true },
  currentPrice: { type: Number },
  net: String,
  day: String,
});

module.exports = { HoldingsSchema };
