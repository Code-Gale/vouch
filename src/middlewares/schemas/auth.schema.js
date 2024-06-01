const Joi = require('joi');

// USER/AUTH SCHEMAS

const paramIdSchema = Joi.object({
  id: Joi.string().length(24).hex().required().messages({
    'string.base': 'Invalid id',
    'string.length': 'Invalid id length',
    'string.hex': 'Invalid id format',
  }),
});

const signupSchema = Joi.object({
  first_name: Joi.string().min(3).required(),
  last_name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  paramIdSchema,
  signupSchema,
  loginSchema,
};
