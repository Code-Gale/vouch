const { StatusCodes } = require('http-status-codes');
const validate = require('../middlewares/validation.middleware');
const {
  signupSchema,
  loginSchema,
} = require('../middlewares/schemas/auth.schema');
const authService = require('../services/auth.service');

const signup = async (req, res) => {
  validate(signupSchema, req.body);

  const user = await authService.createUser(req.body);
  if (user)
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'User created successfully',
      data: user,
    });
};

const login = async (req, res) => {
  validate(loginSchema, req.body);

  const { email, password } = req.body;

  const data = await authService.login(email, password);
  if (data) {
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Log in successful',
      accessToken: data.accessToken,
      user: data.user,
    });
  }
};

module.exports = { signup, login };
