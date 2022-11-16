import utils from "../../../utils/utils.js";
import QueryUser from "./query-domain.js";
import CommandUser from "./command-domain.js";

const query = new QueryUser();
const command = new CommandUser();

const getUser = async (req, res) => {
  const response = await query.getAllUser();
  return response.error
    ? utils.responseFail(res, response.error)
    : utils.responseSuccess(res, response, "success get user");
};

const getUserById = async (req, res) => {
  const params = req.params.userId;
  const response = await query.getUserById(params);
  return response.error
    ? utils.responseFail(res, response.error)
    : utils.responseSuccess(res, response, "success get user");
};

const registerUser = async (req, res) => {
  const payload = req.body;
  const response = await command.registerUser(payload);
  return response.error
    ? utils.responseFail(res, response.error)
    : utils.responseSuccess(res, response, "success register user", 201);
};

const updateUser = async (req, res) => {
  const params = req.params.userId;
  const payload = req.body;
  const response = await command.updateUser(params, payload);
  return response.error
    ? utils.responseFail(res, response.error)
    : utils.responseSuccess(res, response, "success update user");
};

const deleteUser = async (req, res) => {
  const params = req.params.userId;
  const response = await command.deleteUser(params);
  return response.error
    ? utils.responseFail(res, response.error)
    : utils.responseSuccess(res, response, "success delete user");
};

export default { getUser, getUserById, registerUser, updateUser, deleteUser };
