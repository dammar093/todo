import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

// Centralized Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  // Set default error status and message
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // If the error is a validation error from express-validator
  if (err.errors && err.errors.length > 0) {
    statusCode = 400; // Bad Request
    message = err.errors.map(error => error.msg).join(", ");
  }

  // Log the error stack trace for debugging
  console.error(err.stack);

  // Send the structured error response
  res.status(statusCode).json(new ApiResponse(statusCode, null, message));
};

export default errorHandler;
