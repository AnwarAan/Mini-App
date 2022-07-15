import utils from "../../helpers/utils.js";
import User from './repositories_users.js';

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

    async getUserByEmail(userEmail) {
        const params = {
            email: userEmail
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


}

export default QueryUser;