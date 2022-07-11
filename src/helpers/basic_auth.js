import auth from 'basic-auth';
import utils from './utils.js';
import err from '../helpers/error.js'

const basicAuth = async (req, res, next) => {
    const user = auth(req);
    if (user ?.name === process.env.BASIC_USERNAME && user ?.pass === process.env.BASIC_PASSWORD) next();
    else return utils.responseFail(res, err.unauthorized());
}

export default basicAuth;