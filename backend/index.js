if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo");

// Models
const userModel = require("./models/User");
const loanModel = require("./models/Loan");

// Middleware
const { ensureAuthenticated } = require("./middleware");

// Routes
const signUpRouter = require("./routes/Signup");
const loginRouter = require("./routes/Login");
const profileRoute = require("./routes/ProfileRoute");
const profileEditRoute = require("./routes/ProfileEditRoute");
const createAccountRouter = require("./routes/CreateAccount");
const dashboardHistoryRoute = require("./routes/DashboardHistoryRoute");
const loanRoutes = require("./routes/Loan");
const transferRoutes = require("./routes/Transfer");
const accountDeletionRoutes = require("./routes/AccountDeletion");

const app = express();
const port = process.env.PORT || 8080;
const DB_URL = process.env.MONGO_URL;
const SECRET_KEY = process.env.SECRET_KEY;

// Session & Passport Setup

const store = MongoStore.create({
  mongoUrl: DB_URL,
  collectionName: "sessions",
});

app.use(
  session({
    store,
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Passport Strategy
const LocalStrategy = require("passport-local").Strategy;
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    userModel.authenticate()
  )
);
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

// Middleware

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});


// Database Connection

mongoose
  .connect(DB_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


// Public Routes

app.get("/", (req, res) => {
  res.send("Welcome to Student Union Bank");
});

app.get("/getuser", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.use("/signup", signUpRouter);
app.use("/", loginRouter);

app.get("/check-auth", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      isAuthenticated: true,
      user: {
        id: req.user._id,
        email: req.user.email,
        name: `${req.user.firstName} ${req.user.lastName}`,
      },
    });
  } else {
    res.json({ isAuthenticated: false });
  }
});


// Authenticated Routes

// Specific: Get user's loans
app.get("/loansdata", ensureAuthenticated, async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Authentication required." });
    }
    const userId = req.user._id;
    const loans = await loanModel.find({ user: userId });
    res.json(loans);
  } catch (err) {
    console.error("❌ Error fetching loan data:", err);
    res.status(500).json({ error: "Failed to fetch loans" });
  }
});

// Generic Authenticated Routers
app.use("/loan", ensureAuthenticated, loanRoutes);
app.use("/transfer", ensureAuthenticated, transferRoutes);
app.use("/dashboard/profile", ensureAuthenticated, profileRoute);
app.use("/dashboard/profile/edit", ensureAuthenticated, profileEditRoute);
app.use("/oppenaccount", ensureAuthenticated, createAccountRouter);
app.use("/", ensureAuthenticated, dashboardHistoryRoute);
app.use("/accountdeletion", ensureAuthenticated, accountDeletionRoutes);

// Start Server

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
