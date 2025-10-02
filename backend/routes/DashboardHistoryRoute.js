const express = require("express");
const router = express.Router();
const {ensureAuthenticated}=require("../middleware");
const BankAccount = require("../models/BankAccount");
const TransactionModel = require("../models/Transaction");
router.get("/dashboard/history", ensureAuthenticated, async (req, res) => {
  // ... (Transaction history logic remains the same and is correct) ...
  try {
    const userId = req.user._id;
    const userAccounts = await BankAccount.find({ user: userId }).select('_id');
    const accountIds = userAccounts.map(acc => acc._id);

    const transactions = await TransactionModel.find({
      $or: [
        { fromAccount: { $in: accountIds } },
        { toAccount: { $in: accountIds } }
      ]
    })
      .populate({
        path: 'fromAccount',
        populate: {
          path: 'user',
          select: 'firstName lastName username'
        }
      })
      .populate({
        path: 'toAccount',
        populate: {
          path: 'user',
          select: 'firstName lastName username'
        }
      })
      .sort({ createdAt: -1 });

    const formatted = transactions.map(tx => ({
      id: tx._id,
      amount: tx.amount,
      status: tx.status,
      date: tx.createdAt,
      from: {
        accountNumber: tx.fromAccount.accountNumber,
        name: `${tx.fromAccount.user.firstName} ${tx.fromAccount.user.lastName}`,
        username: tx.fromAccount.user.username
      },
      to: {
        accountNumber: tx.toAccount.accountNumber,
        name: `${tx.toAccount.user.firstName} ${tx.toAccount.user.lastName}`,
        username: tx.toAccount.user.username
      }
    }));

    res.status(200).json({ transactions: formatted });
    console.log(formatted);

  } catch (err) {
    console.error("Error fetching history:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports=router;