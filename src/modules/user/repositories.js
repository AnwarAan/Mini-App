import User from "../../models/user.js";
import utils from "../../utils/utils.js";
import err from "../../utils/err.js";

export default class Users {
  async findOneUser(params) {
    try {
      const result = await User.findOne(params);
      return utils.wrapperData(result);
    } catch (error) {
      return utils.wrapperError(err.notFoud("user not found"));
    }
  }

  async findManyUser() {
    try {
      const result = await User.find();
      return utils.wrapperData(result);
    } catch (error) {
      return utils.wrapperError(err.notFoud("user not found"));
    }
  }

  async insertOneUser(data) {
    try {
      const argument = new User(data);
      const result = await argument.save();
      return utils.wrapperData(result);
    } catch (error) {
      return utils.wrapperError(err.internalServerError("failed insert user"));
    }
  }

  async updateOneUser(params, data) {
    try {
      const result = await User.updateOne(params, data);
      return utils.wrapperData(result);
    } catch (error) {
      return utils.wrapperError(err.internalServerError("failed update user"));
    }
  }

  async deleteOneUser(params) {
    try {
      const result = await User.deleteOne(params);
      return utils.wrapperData(result);
    } catch (error) {
      return utils.wrapperError(err.internalServerError("failed delete user"));
    }
  }

  async deleteManyUser() {
    try {
      const result = await User.deleteMany();
      return utils.wrapperData(result);
    } catch (error) {
      return utils.wrapperError(err.internalServerError("failed delete user"));
    }
  }
}
