const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",        // link to the registered Student Union Bank user
    required: true,
  },
  accountNumber: {
    type: String,
    match: [/^\d{15}$/, "Account number must be exactly 15 digits"],
    unique: true,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 10000,
    min: 0,
  },
   Tpin: { type:String, required:true,  match: [/^\d{4,6}$/, "Tpin must be a 4 to 6 digit number"]}
});

module.exports = mongoose.model("AccountOpening", AccountSchema);
