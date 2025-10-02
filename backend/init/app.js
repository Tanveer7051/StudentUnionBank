require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const loanModel = require('../models/Loan');
const initData = require("./init.js");
const { users } = require('./init.js');
const app = express();
const UserModel=require("../models/UserDummy.js");
const port = process.env.PORT || 8080;
// const DB_URL = process.env.MONGO_URL;

async function main() {
  try {
    await mongoose.connect("mongodb+srv://tanveerahmedhajam7051_db_user:xwdrIk0hd0OpWuhL@studenunionbank.ww1xnut.mongodb.net/StudenUnionBank?retryWrites=true&w=majority&appName=StudenUnionBank");
    console.log("✅ MongoDB connected");

    app.listen(8080, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

async function seedDatabase() {
  try {
    const deleted = await loanModel.deleteMany({});
    console.log(`🗑️ Deleted ${deleted.deletedCount} existing loan records`);

    const inserted = await loanModel.insertMany(initData.data);
    console.log(`🌱 Loan data seeded successfully! Inserted: ${inserted.length}`);
  } catch (err) {
    console.error("❌ Error seeding data:", err);
  }
}

seedDatabase();
app.get("/",(req,res)=>{
  res.send("welocome");
})

app.get("/seed/users", async (req, res) => {
  try {
    await UserModel.deleteMany({});
    for (let user of users) {
      const newUser = new UserModel(user);
      await UserModel.register(newUser, "securePassword123"); // default password
    }
    res.send("✅ Users seeded successfully.");
  } catch (err) {
    console.error("❌ Error seeding users:", err);
    res.status(500).send("Error seeding users.");
  }
});
main();
