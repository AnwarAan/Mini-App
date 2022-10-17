import utils from "../../utils/utils.js";
import schema from "./model-handler.js";
import QueryUser from "./query-domain.js";
import CommadUser from "./command-domain.js";

const query = new QueryUser();
const command = new CommadUser();

const getUser = async (req, res) => {
  const response = await query.getUsers();
  return response.error
    ? utils.responseFail(res, response.error)
    : utils.responseSuccess(res, response, "success get user");
};

const getuserById = async (req, res) => {
  const params = req.params.userId;
  const validateParams = utils.validateSchema(params, schema.getUserIdSchema);
  if (validateParams.error) return utils.responseFail(res, validateParams.error);
  const response = await query.getUserById(params);
  return response.error
    ? utils.responseFail(res, response.error)
    : utils.responseSuccess(res, response, "success get user");
};

const registerUser = async (req, res) => {
  const payload = req.body;
  const files = req.file.path;
  const validatePayload = utils.validateSchema(payload, schema.registerUserSchema);
  if (validatePayload.error) return utils.responseFail(res, validatePayload.error);
  const response = await command.registerUser(payload, files);
  return response.error
    ? utils.responseFail(res, response.error)
    : utils.responseSuccess(res, response, "success register user", 201);
};

const loginUser = async (req, res) => {
  const payload = req.body;
  const validatePayload = utils.validateSchema(payload, schema.loginSchema);
  if (validatePayload.error) return utils.responseFail(res, validatePayload.error);
  const response = await command.loginUser(payload);
  return response.error
    ? utils.responseFail(res, response.error)
    : utils.responseSuccess(res, response, "success login user");
};

const updateUser = async (req, res) => {
  const params = req.params.userId;
  const payload = req.body;
  const files = req.file.path;
  const validateParams = utils.validateSchema(params, schema.getUserIdSchema);
  if (validateParams.error) return utils.responseFail(res, validateParams.error);
  const validatePayload = utils.validateSchema(payload, schema.updateUserSchema);
  if (validatePayload.error) return utils.responseFail(res, validatePayload.error);
  const response = await command.updateUser(params, payload, files);
  return response.error
    ? utils.responseFail(res, response.error)
    : utils.responseSuccess(res, response, "success update user");
};
const deleteUser = async (req, res) => {
  const params = req.params.userId;
  const validateParams = utils.validateSchema(params, schema.getUserIdSchema);
  if (validateParams.error) return utils.responseFail(res, validateParams.error);
  const response = await command.deleteUser(params);
  return response.error
    ? utils.responseFail(res, response.error)
    : utils.responseSuccess(res, response, "success delete user");
};
const deleteUsers = async (req, res) => {
  const response = await command.deleteUsers();
  return response.error
    ? utils.responseFail(res, response.error)
    : utils.responseSuccess(res, response, "success delete user");
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
