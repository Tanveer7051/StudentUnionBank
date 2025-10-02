const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // reference to User
    ref: "User",
    required: true,
  },
  loanType: {
    type: String,
    enum: ["Education", "Laptop", "Emergency", "Personal", "Other"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 1000, // at least 1k loan
  },
  interestRate: {
    type: Number,
    required: true,
    min: 1,
    max: 50,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
  max: 120,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Active", "Closed", "Rejected"],
    default: "Pending",
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  remainingAmount: {
    type: Number,
    default: function () {
      return this.amount; // initially same as loan amount
    },
  },
  emi: {
    type: Number,
    required: true,
  },

  // Optional: KYC fields if you want directly in loan form
  fullName: {
    type: String,
  },
  phone: {
    type: String,
    match: [/^\d{10}$/, "Phone number must be 10 digits"],
  },
  address: {
    type: String,
    minlength: 5,
    maxlength: 100,
  },
  idProof: {
    type: String,
    unique: true,
  },
  dob: {
    type: Date,
  },
});

module.exports = mongoose.model("Loan", loanSchema);
