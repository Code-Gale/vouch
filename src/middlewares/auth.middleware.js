const { verifyToken } = require('../utils');

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Token is required' });
  }
  try {
    const payload = verifyToken(token);
    req.user = {};
    req.user.id = payload.id;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: 'Invalid or expired token' });
  }
};
module.exports = isAuthenticated;
