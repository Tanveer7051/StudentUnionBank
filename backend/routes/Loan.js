// routes/loan.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Loan = require("../models/Loan");
const { ensureAuthenticated } = require("../middleware");

// POST /loan
// POST /loan
router.post("/", ensureAuthenticated, async (req, res) => {
  try {
    // Step 1: Count user's existing loans
    const loanCount = await Loan.countDocuments({ user: req.user._id });

    if (loanCount >= 3) {
      return res.status(400).json({
        message: "You have already reached the maximum of 3 loans.",
      });
    }

    // Step 2: Parse duration safely
    let loanData = { ...req.body };
    if (typeof loanData.duration === "string") {
      loanData.duration = parseInt(loanData.duration.match(/\d+/)[0]) || 0;
    }

    // Step 3: Create and save new loan
    const loan = new Loan({
      user: req.user._id,
      ...loanData,
      status: "Pending",
    });

    await loan.save();
    res.status(201).json({ message: "Loan created successfully", loan });

  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error creating loan", error: err.message });
  }
});


// GET /loan/user-info
router.get("/user-info", ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const userInfo = {
      fullName: `${user.firstName} ${user.middleName || ""} ${user.lastName}`,
      address: user.address,
      dob: user.dob,
      phone: user.phone,
      idProof: user.idProof,
    };

    res.status(200).json(userInfo);
  } catch (err) {
    console.error("Error fetching user info:", err);
    res.status(500).json({ message: "Error fetching user info" });
  }
});



// ✅ Export once, at the end
module.exports = router;
