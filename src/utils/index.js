const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { CustomError } = require('../middlewares/error');

// Function to hash a password using bcrypt
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Function to compare a password with its hash using bcrypt
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// Function to generate a JWT token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1hr' }); // Token expires in 1 hour
};

// Function to verify a JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    throw new CustomError('Invalid or expired token', 403);
  }
};

// An asynchronous wrapper - high order function for the controllers
const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
  asyncWrapper,
};
