const express = require("express");
const router = express.Router();
const passport = require("passport");

const userModel = require("../models/User");
router.post("/", async (req, res) => {
  try {
    const {
      username, password, firstName, middleName, lastName, dob, gender, state,
      email, phone, address, idProof, acceptedTerms
    } = req.body;

    if (!username || !password || !firstName || !lastName || !email || !phone || !dob || !gender || !state || !address || !idProof || !acceptedTerms) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const newUser = new userModel({
      username, firstName, middleName, lastName, dob, gender, state, email,
      phone, address, idProof, status: "Pending",
    });

    userModel.register(newUser, password, (err, user) => {
      if (err) {
        console.error("❌ Registration error:", err);
        return res.status(400).json({ message: err.message });
      }

      req.login(user, (err) => {
        if (err) {
          console.error("❌ Login error after signup:", err);
          return res.status(500).json({ message: "Failed to log in after signup" });
        }
        console.log("✅ User registered and logged in:", {
          _id: user._id,
          username: user.username,
          email: user.email
        });
        console.log("Session:", req.session.user);
        return res.status(201).json({
          user: { _id: user._id, username: user.username, email: user.email }
        });
      });
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;