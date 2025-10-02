// backend/validators/userValidator.js
const Joi = require('joi');

const userSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  middleName: Joi.string().trim().allow(''),
  lastName: Joi.string().trim().required(),
  dob: Joi.date().less('now').required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').required(),
  state: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\d{10}$/).required(),
  address: Joi.string().min(15).max(100).required(),
  idProof: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
  status: Joi.string().valid("Pending", "Active", "Blocked").optional(),
});

module.exports = { userSchema };
