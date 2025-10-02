// models/Transaction.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  fromAccount: { type: mongoose.Schema.Types.ObjectId, ref: "AccountOpening", required: true },
  toAccount:   { type: mongoose.Schema.Types.ObjectId, ref: "AccountOpening", required: true },
  amount:      { type: Number, required: true, min: 1 },
  createdAt:   { type: Date, default: Date.now },
  status:      { type: String, enum: ["Success","Failed"], default: "Success" },
});

module.exports = mongoose.model("Transaction", transactionSchema);
