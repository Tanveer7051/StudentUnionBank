const express = require("express");
const BankAccount = require("../models/BankAccount");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.isAuthenticated() || !req.user) {
      return res.status(401).json({ error: "Unauthorized, please login" });
    }

    const userId = req.user._id;
    const { Tpin } = req.body;

    // FIX: Using BankAccount model consistently
    const existingAccount = await BankAccount.findOne({ user: userId });
    if (existingAccount) {
      return res.status(400).json({ error: "User already has an account" });
    }

    // ... (Unique account number generation logic remains the same) ...
    let accountNumber;
    let isUnique = false;
    let maxAttempts = 5;

    for (let i = 0; i < maxAttempts; i++) {
      accountNumber = Math.floor(100000000000000 + Math.random() * 900000000000000).toString();
      const accountExists = await BankAccount.findOne({ accountNumber });
      if (!accountExists) {
        isUnique = true;
        break;
      }
    }

    if (!isUnique) {
      return res.status(500).json({ error: "Failed to generate a unique account number. Try again." });
    }

    // FIX: Using BankAccount model consistently
    const newAccount = new BankAccount({
      user: userId,
      accountNumber,
      balance: 10000,
      Tpin: Tpin
    });

    await newAccount.save();

    res.json({ message: "Account created successfully", account: newAccount });

  } catch (error) {
    console.error("Account creation failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports=router;