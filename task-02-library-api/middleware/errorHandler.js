const mongoose = require('mongoose');

const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Mongoose validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.keys(err.errors).map(k => ({
      field: k,
      message: err.errors[k].message
    }));
    return res.status(400).json({ message: 'Validation error', errors });
  }

  // CastError = invalid ObjectId
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  // Duplicate key
  if (err.code && err.code === 11000) {
    return res.status(409).json({ message: 'Duplicate key error', key: err.keyValue });
  }

  // Generic
  const status = err.status || 500;
  return res.status(status).json({ message: err.message || 'Server error' });
};

module.exports = { errorHandler };
