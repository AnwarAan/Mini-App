import err from "./err.js";

const responseFail = (res, error) => {
  const { code, message } = error;
  const response = {
    status: false,
    statusCode: code,
    message,
  };
  return res.status(code).json(response);
};

const responseSuccess = (res, result, message = "success", statusCode = 200) => {
  const response = {
    status: true,
    statusCode,
    message,
    data: result.data,
  };
  return res.status(statusCode).json(response);
};

const responseSuccessPagination = (res, result, message = "success", statusCode = 200) => {
  const response = {
    status: true,
    statusCode,
    message,
    data: result.data,
    meta: result.meta,
  };
  return res.status(statusCode).json(response);
};

const wrapperData = (data, meta) => {
  return {
    data,
    error: null,
    meta,
  };
};

const wrapperError = (error) => {
  return {
    data: null,
    error,
  };
};

const validateSchema = (payload, schema) => {
  const { value: data, error: message } = schema.validate(payload);
  if (message) return wrapperError(err.badRequest(message.details[0].message));
  return wrapperData(data);
};

export default {
  responseFail,
  responseSuccess,
  responseSuccessPagination,
  wrapperData,
  wrapperError,
  validateSchema,
};
