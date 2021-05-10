enum ErrorTypes {
  BadRequest = 400,
  Unauthorized = 401,
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

class ServerError extends CustomError {
  constructor(message: string) {
    super(message);
  }
}

class ClientError extends CustomError {
  constructor(message: string, code?: ErrorTypes) {
    super(message, code);
  }
}

class BadRequestError extends ClientError {
  constructor(message: string) {
    super(message, ErrorTypes.BadRequest);
  }
}

class UnauthorizedError extends ClientError {
  constructor(message: string) {
    super(message, ErrorTypes.Unauthorized);
  }
}

class NotfoundError extends ClientError {
  constructor(message: string) {
    super(message, ErrorTypes.NotFound);
  }
}

export {
  BadRequestError,
  CustomError,
  UnauthorizedError,
  NotfoundError,
  ErrorTypes,
  ServerError,
  ClientError,
};
