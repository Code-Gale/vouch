const express = require('express');
const userController = require('../controllers/user.controller');
const { asyncWrapper } = require('../utils');
const isAuthenticated = require('../middlewares/auth.middleware');

const userRoute = express.Router();

// Only authenticated can access these routes
userRoute.use(isAuthenticated);

// Retrieve all blogs created by the logged-in user
userRoute.get('/:id', asyncWrapper(userController.getUser));

module.exports = userRoute;
