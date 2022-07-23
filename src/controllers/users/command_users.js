import utils from '../../helpers/utils.js';
import QueryUser from './query_users.js';
import err from '../../helpers/error.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class CommandUser {
    constructor() {
        this.query = new QueryUser;
    }

    async hashingPassword(plainText) {
        try {
            const saltRound = 10;
            const result = await bcrypt.hash(plainText, saltRound)
            return result;
        } catch (error) {
            console.log(error);
        }

    }

    async comparePassword(plainText, hash) {
        try {
            const result = await bcrypt.compare(plainText, hash);
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async registerUser(payload) {
        const {
            name,
            email,
            password,
            address,
            age
        } = payload

        const pwd = await this.hashingPassword(password)
        const dataUser = {
            name: name,
            email: email,
            password: pwd,
            address: address,
            age: age
        }

        const {
            data,
            error
        } = await this.query.user.insertOneUser(dataUser);
        if (error || data.length == 0) {
            return utils.wrapperError(error);
        }
        return utils.wrapperData(data);
    }

    async loginUser(payload) {
        const {
            email,
            password
        } = payload;
        const checkEmail = await this.query.getUserByEmail(email);
        if (checkEmail.error) {
            return utils.wrapperError(err.unauthorized('Email Not Registered'));
        }
        const checkPassword = await this.comparePassword(password, checkEmail.data.password);
        if (!checkPassword) {
            return utils.wrapperError(err.unauthorized('Password Not Match'));
        }
        const data = {
            _id: checkEmail.data.id
        }
        const token = jwt.sign(data, process.env.TOKEN_SECRET, {
            expiresIn: '1m'
        });
        return utils.wrapperData({
            _id: checkEmail.data.id,
            name: checkEmail.data.name,
            email: checkEmail.data.email,
            age: checkEmail.data.age,
            token
        });
    }

    async updateUser(params, payload) {
        const update = {
            $set: payload
        }

        const param = {
            _id: params
        }

        const user = await this.query.getUserById(params);
        if (user.error) {
            return utils.wrapperError(user.error);
        }
        const updateUser = await this.query.user.updateUser(update, param)
        if (updateUser.error) {
            return updateUser.error;
        }
        return utils.wrapperData(update)
    }

    async deleteUser(userId) {
        const param = {
            _id: userId
        }

        const {
            data,
            error
        } = await this.query.user.deleteOneUser(param);
        if (error) {
            return utils.wrapperError(error);
        }
        return utils.wrapperData(data);
    }

    async deleteUsers() {
        const {
            data,
            error
        } = await this.query.user.deleteManyUser();
        if (error) {
            return utils.wrapperError(error);
        }
        return utils.wrapperData(data);
    }
}

export default CommandUser;