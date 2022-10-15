import utils from "../../utils/utils.js";
import QueryUser from "./query-domain.js";
import CommadUser from "./command-domain.js";

const query = new QueryUser();
const command = new CommadUser();

const getUser = async (req, res) => {
  const response = await query.getUsers();
  return response.error
    ? utils.responseFail(res, response.error)
    : utils.responseSuccess(res, 200, "success get users", response.data);
};

const getuserById = async (req, res) => {
  const params = req.params.userId;
  const response = await query.getUserById(params);
  return response.error
    ? utils.responseFail(res, response.error)
    : utils.responseSuccess(res, 200, "success get user", response.data);
};

const registerUser = async (req, res) => {
  const payload = req.body;
  const files = req.file.path;
  const response = await command.registerUser(payload, files);
  return response.error
    ? utils.responseFail(res, response.error)
    : utils.responseSuccess(res, 201, "success register user", response.data);
};

const loginUser = async (req, res) => {
  const payload = req.body;
  const response = await command.loginUser(payload);
  return response.error
    ? utils.responseFail(res, response.error)
    : utils.responseSuccess(res, 200, "success login user", response.data);
};

const updateUser = async (req, res) => {
  const params = req.params.userId;
  const payload = req.body;
  const files = req.file.path;
  const response = await command.updateUser(params, payload, files);
  return response.error
    ? utils.responseFail(res, response.error)
    : utils.responseSuccess(res, 200, "success update user", response.data);
};
const deleteUser = async (req, res) => {
  const params = req.params.userId;
  const response = await command.deleteUser(params);
  return response.error
    ? utils.responseFail(res, response.error)
    : utils.responseSuccess(res, 200, "success delete user", response.data);
};
const deleteUsers = async (req, res) => {
  const response = await command.deleteUsers();
  return response.error
    ? utils.responseFail(res, response.error)
    : utils.responseSuccess(res, 200, "success delete users", response.data);
};

export default {
  getUser,
  getuserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  deleteUsers,
};
