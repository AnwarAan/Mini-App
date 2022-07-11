import err from '../../helpers/error.js';
import utils from '../../helpers/utils.js';
import user from '../../models/users_model.js'

class User {
    async findManyUser() {
        try {
            const result = await user.find({})
            return utils.wrapperData(result);
        } catch (error) {
            console.log(error);
            return utils.wrapperError(err.notFound('User Not Found'));
        }
    }

    async findOneUser(params) {
        try {
            const result = await user.findOne(params);
            return utils.wrapperData(result);
        } catch (error) {
            console.log(error);
            return utils.wrapperError(err.notFound('User Not Found'));
        }
    }

    async insertOneUser(data) {
        try {
            const newUser = new user(data);
            const result = newUser.save();
            console.log('result :', result);
            return utils.wrapperData(result);

        } catch (error) {
            console.log(error);
            return utils.wrapperError(err.internalServerError('Insert Data Failed'));
        }
    }

    async updateUser(data, params) {
        try {
            const result = await user.updateOne(data, params)
            return utils.wrapperData(result);
        } catch (error) {
            console.log(error);
            return utils.wrapperError(err.internalServerError('Update Data Failed'));
        }
    }

    async deleteOneUser(params) {
        try {
            const result = await user.deleteOne(params);
            return utils.wrapperData(result);
        } catch (error) {
            console.log(error);
            return utils.wrapperError(err.internalServerError('Delete Data Failed'));
        }
    }

    async deleteManyUser() {
        try {
            const result = await user.deleteMany({})
            return utils.wrapperData(result);
        } catch (error) {
            console.log(error);
            return utils.wrapperError(err.internalServerError('Delete Data Failed'));
        }
    }
}

export default User;