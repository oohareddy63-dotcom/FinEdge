const { Schema } = require("mongoose");

const PositionsSchema = new Schema({
  userId: { type: String, default: "demo_user" },
  product: { type: String, default: "CNC" },
  symbol: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  avg: { type: Number, required: true },
  price: { type: Number, required: true },
  net: String,
  day: String,
  isLoss: Boolean,
});

module.exports = { PositionsSchema };
