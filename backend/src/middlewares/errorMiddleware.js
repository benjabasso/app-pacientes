// Error Middleware Handler
import AppError from '../utils/appError.js';

const handleDuplicateFieldsDB = err => {
    const field = Object.keys(err.keyValue)[0];
    return new AppError(`Duplicate field value: ${field}. Please use another value!`, 400);
}; // Handle duplicate field errors

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    return new AppError(`Invalid input data. ${errors.join('. ')}`, 400);
}; // Handle validation errors

const sendError = (err, res) => {
    res.status(err.statusCode || 500).json({
        status: err.status || 'error',
        message: err.message || 'Internal Server Error'
    });
}; // Send error response

export default (err, req, res, next) => {
    let error = { ...err, message: err.message };

    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

    sendError(error, res);
}; // Global error handling middleware
