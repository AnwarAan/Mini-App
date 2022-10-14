const badRequest = (message = "Bad Reques") => {
  return {
    code: 400,
    message,
  };
};

const unauthorized = (message = "Unauthorized") => {
  return {
    code: 401,
    message,
  };
};

const notFoud = (message = "Not Found") => {
  return {
    code: 404,
    message,
  };
};

const internalServerError = (message = "Internal Server Error") => {
  return {
    code: 500,
    message,
  };
};

const err = {
  badRequest,
  unauthorized,
  notFoud,
  internalServerError,
};

export default err;
