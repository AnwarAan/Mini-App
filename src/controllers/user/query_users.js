import utils from "../../helpers/utils.js";
import User from './repositories_users.js';
import bcrypt from 'bcrypt';

class QueryUser {
    constructor() {
        this.user = new User();
    }

    async getUsers() {
        const {
            data,
            error
        } = await this.user.findManyUser()
        if (error || data.length == 0) {
            return utils.wrapperError(error);
        }
        return utils.wrapperData(data);
    }

    async getUserById(userId) {
        const params = {
            _id: userId
        }
        const {
            data,
            error
        } = await this.user.findOneUser(params);
        if (error) {
            return utils.wrapperError(error);
        }
        return utils.wrapperData(data);
    }

    async getUserByName(userName) {
        const params = {
            name: userName
        } = await this.user.findOneUser(params);
        if (error) {
            return utils.wrapperError(error);
        }
        return utils.wrapperData(data);
    }

    async getUserByEmail(userEmail) {
        const {
            data,
            error
        } = await this.user.findOneUser(params);
        if (error) {
            return utils.wrapperError(error);
        }
        return utils.wrapperData(data);
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

    async registerUser(payload) {
        try {

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
            } = await this.user.insertOneUser(dataUser);
            if (error || data.length == 0) {
                return utils.wrapperError(error);
            }
            console.log('data :', data);
            return utils.wrapperData(data);
        } catch (error) {
            console.log(error)
        }
    }

    async deleteUser(userId) {
        const params = {
            _id: userId
        }
        const {
            data,
            error
        } = await this.user.deleteOneUser(params);
        if (error) {
            return utils.wrapperError(error);
        }
        return utils.wrapperData(data);
    }

    async deleteUsers() {
        const {
            data,
            error
        } = await this.user.deleteManyUser();
        if (error) {
            return utils.wrapperError(error);
        }
        return utils.wrapperData(data);
    }
}

export default QueryUser;