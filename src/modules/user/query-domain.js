import err from "../../utils/err.js";
import utils from "../../utils/utils.js";
import Users from "./repositories.js";

export default class QueryUser {
  constructor() {
    this.user = new Users();
  }

  async getUsers() {
    const { data, error } = await this.user.getManyUser();
    if (error) {
      return utils.wrapperError(error);
    }
    return utils.wrapperData(data);
  }

  async getUserById(userId) {
    const params = { id: userId };
    const { data, error } = await this.user.getOneUser(params);
    if (error) {
      return utils.wrapperError(error);
    }
    return utils.wrapperData(data);
  }
}
