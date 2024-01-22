import { ApiError } from "../utils/apiError.js";

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal Server Error";

  console.log("middleware error", err.message);
  // MONGODB CASTERROR  ID WROMG ,LESS CHARECTER

  if (err.name === "CastError") {
    const message = ` Resource not found. invalid: ${err.path} `;
    err = new ApiError(message, 400);
    console.log(message);
  }

  // MONDODB DOPLICATE KEY ERROR

  if (err.code === 11000) {
    const message = `This ${Object.keys(
      err.keyValue
    )} is already registered. Please use a different  ${Object.keys(
      err.keyValue
    )} entered `;
    err = new ApiError(message, 400);
  }

  // JSONWEBTOKEN ERROR

  if (err.name === "josnWebTokenError") {
    const message = ` json Web Token is invalied ,try again `;
    err = new ApiError(message, 400);
  }

  // JSONWEBTOKEN EXPIRE
  if (err.name === "TokenExpiredError") {
    const message = ` Json web token is expired ,try again `;
    err = new ApiError(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error: err,
    message: err.message,
  });
};

export { errorMiddleware };
