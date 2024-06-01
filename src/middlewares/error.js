class CustomError extends Error {
  code;
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    const { code, message } = err;
    const cleanedMessage = message.replace(/"/g, '');

    return res.status(code).json({
      success: false,
      message: cleanedMessage,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  }
  return res.status(500).json({
    success: false,
    message: err.message || 'Something went wrong',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = {
  CustomError,
  errorHandler,
};
