import utils from '../../helpers/utils.js';
import QueryUser from './query_users.js';
import bcrypt from 'bcrypt';

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