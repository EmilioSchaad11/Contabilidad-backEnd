// utils/response.js
const success = (req, res, data, statusCode) => {
  return res.status(statusCode).json({
    status: 'success',
    data
  });
};

const error = (req, res, message, statusCode) => {
  return res.status(statusCode).json({
    status: 'error',
    message
  });
};

module.exports = {
  success,
  error
};
