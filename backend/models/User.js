const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userValidationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // no duplicate emails
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Phone number must be 10 digits"], // regex check
  },
  address: {
    type: String,
    minlength: 15,
    maxlength: 100,
    required: true,
  },
  idProof: {
    type: String,
    required: true,
    unique: true, 
  },
  username: {
  type: String,
  required: true,
  unique: true,
  trim: true,
},

});

// Add username + password fields (handled by passport-local-mongoose)
userValidationSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameUnique: false,
  errorMessages: {
    MissingPasswordError: 'Password is required.',
    AttemptTooSoonError: 'Too many login attempts. Please try again later.',
    TooManyAttemptsError: 'Too many login attempts. Please try again later.',
    IncorrectPasswordError: 'Email or password is incorrect.',
    IncorrectUsernameError: 'Email or password is incorrect.',      
    MissingUsernameError: 'Email is required.',
    UserExistsError: 'A user with this email is already registered.',
  },
});


module.exports = mongoose.model("User", userValidationSchema);