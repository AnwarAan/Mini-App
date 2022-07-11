import err from './error.js';

const responseFail = (res, error) => {
    const {
        message,
        code
    } = error;
    const response = {
        message,
        status: false,
        statusCode: code
    }
    return res.status(code).json(response);
}

const responseSuccess = (res, statusCode, message, data) => {
    const response = {
        message,
        data,
        status: true,
        statusCode
    }
    return res.status(statusCode).json(response);
}

const validateSchema = (payload, schema) => {
    const {
        value: data,
        error: message
    } = schema.validate(payload);
    if (message) {
        return wrapperError(err.badRequest(message.details[0].message))
    } else
        return wrapperData(data);

}

const wrapperData = (data) => {
    return {
        data,
        error: null
    }
}

const wrapperError = (error) => {
    return {
        data: null,
        error
    }
}

const utils = {
    responseFail,
    responseSuccess,
    validateSchema,
    wrapperData,
    wrapperError
}

export default utils;