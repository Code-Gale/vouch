const { StatusCodes } = require('http-status-codes');
const { CustomError } = require('./error');

// Function to validate user input against the schema
const validate = (schema, data) => {
  if (schema) {
    const { error, value } = schema.validate(data);
    if (error) {
      const errorMessage = error.details[0].message;
      throw new CustomError(errorMessage, StatusCodes.UNPROCESSABLE_ENTITY);
    }
    return value;
  }
};

module.exports = validate;
