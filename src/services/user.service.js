const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { CustomError } = require('../middlewares/error');

const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError('User does not exists', StatusCodes.NOT_FOUND);
  }
  return user;
};

module.exports = {
  getUserById,
};
