import { NextFunction } from "express";

/**
 * Throws an error with the error handling function of expressJs
 *
 * @param next The next function from the endpoint
 * @param message A custom message for your error
 * @param status (Optional) Status code for the error (default: 500)
 */
const createError = (next: NextFunction, message: string, status = 500) => {
  try {
    throw new Error(message);
  } catch (e) {
    e.status = status;
    next(e);
  }
};

export default createError;
