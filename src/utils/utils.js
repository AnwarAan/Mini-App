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
    error: null,
    data,
  };
};

const wrapperError = (error) => {
  return {
    error,
    data: null,
  };
};

export default {
  responseFail,
  responseSuccess,
  wrapperData,
  wrapperError,
};
