const badRequest = (message = 'Bad Request') => {
    return {
        code: 400,
        message
    }
}

const unauthorized = (message = 'Unauthorized') => {
    return {
        code: 401,
        message
    }
}

const notFound = (message = 'Not Found') => {
    return {
        code: 404,
        message
    }
}

const conflict = (message = 'Conflic') => {
    return {
        code: 409,
        message
    }
}

const internalServerError = (message = 'Internal Server Error') => {
    return {
        code: 500,
        message
    }
}


const httpError = {
    badRequest,
    unauthorized,
    notFound,
    conflict,
    internalServerError
}

export default httpError;