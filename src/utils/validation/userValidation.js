const Joi = require("joi");

// Validation schema for user registration
const registrationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  address: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  birthDate: Joi.date().required(),
  role: Joi.string().valid("user", "admin").default("user"),
});

// Validation schema for user login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  registrationSchema,
  loginSchema,
};
