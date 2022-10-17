import utils from "../../utils/utils.js";
import Users from "./repositories.js";

export default class QueryUser {
  constructor() {
    this.user = new Users();
    this.successMessage = "success get user";
  }

  async getUsers() {
    const { data, error } = await this.user.findManyUser();
    if (error) return utils.wrapperError(error);
    return utils.wrapperData(data);
  }

  async getUserById(userId) {
    const params = { id: userId };
    const { data, error } = await this.user.findOneUser(params);
    if (error) return utils.wrapperError(error);
    return utils.wrapperData(data);
  }

  async getUserByEmail(userEmail) {
    const params = { email: userEmail };
    const { data, error } = await this.user.findOneUser(params);
    if (error) return utils.wrapperError(error);
    return utils.wrapperData(data);
  }
}
