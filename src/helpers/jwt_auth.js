import jwt from 'jsonwebtoken';
import User from '../controllers/users/repositories_users.js'
import utils from './utils.js'
import err from './error.js'

const user = new User();

const jwtVerify = async (req, res, next) => {
    const headers = req.headers;
    if (headers && headers.authorization && headers.authorization.includes('Bearer')) {
        const parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            let decode;
            try {
                decode = await jwt.verify(parted[1], process.env.TOKEN_SECRET);
            } catch (error) {
                return utils.responseFail(res, err.forbidden('Invalid Token'));
            }
            const userData = await user.findOneUser({
                _id: decode._id
            });
            if (userData.data) {
                req.userId = decode._id
                return next()
            }
        }
    }
    return utils.wrapperError(res, err.forbidden('Invalid Token'));
}

export default jwtVerify;