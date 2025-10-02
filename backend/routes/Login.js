const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post('/login', (req, res, next) => {
  console.log("Received login request:", req.body.email); // Security: don't log password
  passport.authenticate('local', (err, user, info) => {
    console.log("Authentication debug:", { err, info });
    if (err) {
      return res.status(500).json({ error: 'Internal server error', message: err.message });
    }
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed', message: info.message || 'Invalid email or password' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Login error', message: err.message });
      }
      // Successful login sets the session cookie
      res.json({ message: 'Logged in', user: { id: user._id, email: user.email, username: user.username } });
    });
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;