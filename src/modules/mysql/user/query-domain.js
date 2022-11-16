import utils from "../../../utils/utils.js";
import User from "./repositories.js";

export default class QueryUser {
  constructor() {
    this.user = new User();
  }

  async getAllUser() {
    const query = "SELECT * FROM user";
    const { data, error } = await this.user.findUser(query);
    if (error) return utils.wrapperError(error);
    console.log(data[0]);
    return utils.wrapperData(data);
  }

  async getAllUserPagination(limit) {
    const query = `SELECT * FROM user LIMIT 10 || ${limit}`;
    const { data, error } = await this.user.findUser(query);
    if (error) return utils.wrapperError(error);
    return utils.wrapperData(data);
  }

  async getUserById(userId) {
    console.log(userId);
    const query = ` SELECT * FROM user WHERE id = ${userId}`;
    const { data, error } = await this.user.findUser(query);
    if (error) return utils.wrapperError(error);
    return utils.wrapperData(data);
  }

  async getUserByName(userName) {
    const query = `SELECT * FROM user WHERE name LIKE ${userName}`;
    const { data, error } = await this.user.findUser(query);
    if (error) return utils.wrapperError(error);
    return utils.wrapperData(data);
  }
}
