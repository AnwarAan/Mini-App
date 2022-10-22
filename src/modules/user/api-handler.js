import formidable from "formidable";
import utils from "../../utils/utils.js";
import schema from "./model-handler.js";
import QueryUser from "./query-domain.js";
import CommadUser from "./command-domain.js";

import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const query = new QueryUser();
const command = new CommadUser();

const getUsers = async (req, res) => {
  const response = await query.getUsers();
  return response.error
    ? utils.responseFail(res, response.error)
    : utils.responseSuccess(res, response, "success get user");
};

const getUserPagination = async (req, res) => {
  const { page, limit } = req.query;
  const payload = { page: parseInt(page) || 1, limit: parseInt(limit) || 10 };
  const response = await query.getUserPagination(payload);
  return response.error
    ? utils.responseFail(res, response.error)
    : utils.responseSuccessPagination(res, response, "success get user");
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

const registerUser = async (req, res, next) => {
  const form = new formidable.IncomingForm();
  const dirFile = path.join(__dirname + "../../../../assets");
  form.multiples = true;
  form.uploadDir = dirFile;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    const oldPath = files.photo.filepath;
    const newPath = path.join(__dirname + "../../../../assets", files.photo.originalFilename);
    fs.rename(oldPath, newPath, (err) => {
      console.log(err);
    });
    const payload = { ...fields, photo: files.photo.filepath + "-" + files.photo.originalFilename };
    const validatePayload = utils.validateSchema(payload, schema.registerUserSchema);
    if (validatePayload.error) return utils.responseFail(res, validatePayload.error);
    const response = await command.registerUser(payload);
    return response.error
      ? utils.responseFail(res, response.error)
      : utils.responseSuccess(res, response, "success register user", 201);
  });
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

const updateUser = async (req, res, next) => {
  const form = new formidable.IncomingForm();
  const dirFile = path.join(__dirname + "../../../../assets");
  form.multiples = true;
  form.uploadDir = dirFile;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    const oldPath = files.photo.filepath;
    const newPath = path.join(__dirname, "../../../assets", files.photo.originalFilename);
    fs.rename(oldPath, newPath, (err) => {
      console.log(err);
    });
    const payload = { ...fields, photo: files.photo.filepath + "-" + files.photo.originalFilename };
    const params = req.params.userId;
    const validateParams = utils.validateSchema(params, schema.getUserIdSchema);
    if (validateParams.error) return utils.responseFail(res, validateParams.error);
    const validatePayload = utils.validateSchema(payload, schema.updateUserSchema);
    if (validatePayload.error) return utils.responseFail(res, validatePayload.error);
    const response = await command.updateUser(params, payload, files);
    return response.error
      ? utils.responseFail(res, response.error)
      : utils.responseSuccess(res, response, "success update user");
  });
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
  getUsers,
  getUserPagination,
  getuserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  deleteUsers,
};
