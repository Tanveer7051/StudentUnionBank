const express = require("express");
const app=express();
const router = express.Router();
const BankAccount=require("../models/BankAccount");

router.get("/", async (req, res) => {
  try {
    // Ensure user is authenticated (using direct check since middleware isn't used)
    if (!req.isAuthenticated() || !req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.user._id;

    // FIX: Using BankAccount model consistently
    const account = await BankAccount.findOne({ user: userId }).populate("user");

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    // ... (rest of profile logic) ...
    res.json({
      accountNumber: account.accountNumber,
      balance: account.balance,
      user: {
        firstName: account.user.firstName,
        middleName: account.user.middleName,
        lastName: account.user.lastName,
        email: account.user.email,
        phone: account.user.phone,
        address: account.user.address,
        gender: account.user.gender,
        dob: account.user.dob,
        state: account.user.state,
        idProof: account.user.idProof,
      }
    });

  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports=router;