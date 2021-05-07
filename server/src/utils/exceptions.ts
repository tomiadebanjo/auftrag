enum ErrorTypes {
  BadRequest = 400,
  NotFound = 404,
  ServerError = 500,
}

class CustomError extends Error {
  code: ErrorTypes;

  constructor(message: string, code?: ErrorTypes) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
    this.code = code || ErrorTypes.ServerError;

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, ErrorTypes.BadRequest);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(message, ErrorTypes.NotFound);
  }
}

export { BadRequestError, CustomError, UnauthorizedError, ErrorTypes };
