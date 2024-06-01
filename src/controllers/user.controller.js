const { StatusCodes } = require('http-status-codes');
const validate = require('../middlewares/validation.middleware');
const { paramIdSchema } = require('../middlewares/schemas/auth.schema');
const userService = require('../services/user.service');

const getUser = async (req, res) => {
  validate(paramIdSchema, req.params);

  const userId = req.params.id;

  const user = await userService.getUserById(userId);
  if (user)
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'User retrieval successful',
      data: user,
    });
};

module.exports = { getUser };
