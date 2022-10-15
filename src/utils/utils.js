const responseFail = (res, error) => {
  const { code, message } = error;
  const response = {
    status: false,
    statusCode: code,
    message,
  };
  return res.status(code).json(response);
};

const responseSuccess = (res, statusCode, message, data) => {
  const response = {
    status: true,
    statusCode,
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

const wrapperData = (data) => {
  return {
    data,
    error: null,
  };
};

const wrapperError = (error) => {
  return {
    data: null,
    error,
  };
};

export default {
  responseFail,
  responseSuccess,
  wrapperData,
  wrapperError,
};
