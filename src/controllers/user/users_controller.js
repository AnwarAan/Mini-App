import utils from '../../helpers/utils.js';
import schema from './validation_users.js';
import QueryUser from './query_users.js';
import CommandUser from '../products/command_products.js';

const query = new QueryUser();

const getUsers = async (req, res) => {
    const response = await query.getUsers();
    return (response.error) ? utils.responseFail(res, response.error) : utils.responseSuccess(res, 200, 'Success Get Users', response.data);
}

const registerUser = async (req, res) => {
    const payload = req.body;
    const validatePayload = utils.validateSchema(payload, schema.registerUserSchema);
    if (validatePayload.error) return utils.responseFail(res, validatePayload.error);
    const response = await query.registerUser(payload);
    return (response.error) ? utils.responseFail(res, response.error) : utils.responseSuccess(res, 200, 'Success Register', response.data);
}

const deleteUser = async (req, res) => {
    const params = req.params.userId;
    const validateParams = utils.validateSchema(params, schema.deleteUserSchema);
    if (validateParams.error) return utils.responseFail(res, validateParams.error);
    const response = await query.deleteUser(params);
    return (response.error) ? utils.responseFail(res, response.error) : utils.responseSuccess(res, 200, 'Success Delete User', response.data);
}

const deleteUsers = async (req, res) => {
    const response = await query.deleteUsers();
    return (response.error) ? utils.responseFail(res, response.error) : utils.responseSuccess(res, 200, 'Success Delete Users', response.data);
}
export default {
    getUsers,
    registerUser,
    deleteUser,
    deleteUsers
}