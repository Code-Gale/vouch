const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const { CustomError } = require('../middlewares/error');
const { comparePassword, generateToken, hashPassword } = require('../utils');

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const createUser = async (payload) => {
  const userExists = await getUserByEmail(payload.email);
  if (userExists)
    throw new CustomError('User already exists', StatusCodes.CONFLICT);

  const hashedPassword = await hashPassword(payload.password);
  const user = await User.create({ ...payload, password: hashedPassword });

  return { user };
};

const login = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) throw new CustomError('Invalid login credentials', 401);

  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) throw new CustomError('Invalid login credentials', 401);

  // Generate access token
  const accessToken = generateToken({
    id: user.id,
    first_name: user.first_name,
  });

  return { accessToken, user: user.toJSON() };
};

module.exports = {
  createUser,
  login,
};
