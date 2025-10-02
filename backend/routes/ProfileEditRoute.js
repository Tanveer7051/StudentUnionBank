const express = require("express");
const router = express.Router();
const userModel=require("../models/User");
const loanModel=require("../models/Loan");
const {ensureAuthenticated}=require("../middleware");
router.patch("/dashboard/profile/edit", ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id;
    const updateFields = req.body;

    await userModel.findByIdAndUpdate(userId, updateFields, { new: true });

    const loanUpdate = {
      fullName: `${updateFields.firstName} ${updateFields.middleName || ""} ${updateFields.lastName}`.trim(),
      phone: updateFields.phone,
      address: updateFields.address,
      dob: updateFields.dob,
      idProof: updateFields.idProof,
    };

    // Update all loans for this user
    await loanModel.updateMany(
      { user: userId },
      { $set: loanUpdate }
    );

    res.status(200).json({ message: "Profile updated successfully" });

  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports=router;