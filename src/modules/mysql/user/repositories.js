import utils from "../../../utils/utils.js";
import err from "../../../utils/err.js";
import { db } from "../../../config/db.js";

export default class User {
  async findUser(query) {
    try {
      const result = await db.query(query);
      return utils.wrapperData(result[0]);
    } catch (error) {
      return utils.wrapperError(err.notFoud("user not found"));
    }
  }

  async insertUser(query) {
    try {
      const result = await db.query(query);
      return utils.wrapperData(result);
    } catch (error) {
      console.log(error);
      return utils.wrapperError(err.internalServerError("failed insert user"));
    }
  }

  async updateUser(query) {
    try {
      const result = await db.query(query);
      return utils.wrapperData(result);
    } catch (error) {
      console.log(error);
      return utils.wrapperError(err.internalServerError("failed update user"));
    }
  }

  async deleteUser(query) {
    try {
      const result = await db.query(query);
      return utils.wrapperData(result);
    } catch (error) {
      return utils.wrapperError(err.internalServerError("failed delete user"));
    }
  }
}
