const express = require('express');
const authController = require('../controllers/auth.controller');
const { asyncWrapper } = require('../utils');

const authRoute = express.Router();

authRoute.post('/signup', asyncWrapper(authController.signup));
authRoute.post('/login', asyncWrapper(authController.login));

module.exports = authRoute;
