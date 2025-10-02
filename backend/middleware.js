// middleware/auth.js
module.exports.ensureAuthenticated = function (req, res, next) {
  // Passport automatically adds this method
  if (req.isAuthenticated()) {
    return next();
  }
  // Not logged in → redirect or send error
  res.status(401).json({ message: "You must be logged in to access this page." });
};
