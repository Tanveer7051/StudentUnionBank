const express = require("express");
const router = express.Router();
const {ensureAuthenticated}=require("../middleware");

const User = require("../models/User");
const Loan = require("../models/Loan");
const AccountOpening = require("../models/BankAccount");
const Transaction = require("../models/Transaction");

router.delete("/", ensureAuthenticated, async (req, res, next) => {
  try {
    const userId = req.user._id;

    // 1. Check if user has an active loan
    const activeLoan = await Loan.findOne({ user: userId, status: "Active" });
    if (activeLoan) {
      return res.status(400).json({
        message: "You cannot delete your account while you have an active loan. Please clear it first.",
      });
    }

    // 2. Find and delete bank account
    const bankAccount = await AccountOpening.findOneAndDelete({ user: userId });

    // 3. Delete all loans for user
    await Loan.deleteMany({ user: userId });

    // 4. Delete all related transactions
    if (bankAccount) {
      await Transaction.deleteMany({
        $or: [
          { fromAccount: bankAccount._id },
          { toAccount: bankAccount._id },
        ],
      });
    }

    // 5. Delete the user
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found or already deleted." });
    }

    // 6. Logout and clear session
    req.logout(function (err) {
      if (err) {
        console.error("Logout error:", err);
        return next(err);
      }

      res.clearCookie("connect.sid");
      return res.status(200).json({ message: "Account and all related data deleted successfully." });
    });
  } catch (error) {
    console.error("Account deletion error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
