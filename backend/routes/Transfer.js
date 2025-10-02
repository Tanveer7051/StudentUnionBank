// routes/transfer.js
const express = require("express");
const router = express.Router();
const Account = require("../models/BankAccount");
const Transaction = require("../models/Transaction");
const { ensureAuthenticated } = require("../middleware");

router.post("/", ensureAuthenticated, async (req, res) => {
  const { toAccountNumber, amount, Tpin } = req.body;

  const session = await Account.startSession();
  session.startTransaction();

  try {
    // 1. Validate input
    if (!toAccountNumber || !amount || !Tpin) {
      throw new Error("Missing required fields");
    }

    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Invalid transfer amount");
    }

    // 2. Find accounts
    const sender = await Account.findOne({ user: req.user._id }).session(session);
    const receiver = await Account.findOne({ accountNumber: toAccountNumber }).session(session);

    if (!sender || !receiver) throw new Error("Invalid account");

    // 3. TPIN check
    if (String(sender.Tpin) !== String(Tpin)) {
      throw new Error("Invalid TPIN");
    }

    // 4. Self-transfer check
    if (sender._id.equals(receiver._id)) {
      throw new Error("You can't send money to your own account");
    }

    // 5. Check balance
    if (sender.balance < amount) throw new Error("Insufficient funds");

    // 6. Perform transfer
    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save({ session });
    await receiver.save({ session });

    // 7. Record transaction
    await Transaction.create([{
      fromAccount: sender._id,
      toAccount: receiver._id,
      amount,
    }], { session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Transfer successful" });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
