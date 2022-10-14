import utils from "../../utils/utils.js";
import Users from "./repositories.js";
import QueryUser from "./query-domain.js";

export default class CommadUser {
  constructor() {
    this.user = new Users();
    this.query = new QueryUser();
  }

  async registerUser(payload) {
    const { name, email, password } = payload;
    const userData = { name: name, email: email, password: password };
    const saveUser = await this.user.insertOneUser(userData);
    if (saveUser.error) {
      return saveUser.error;
    }
    return utils.wrapperData(saveUser);
  }

  async updateUser(userId, payload) {
    const params = { id: userId };
    const { name, email, password } = payload;
    const user = await this.query.getUserById(userId);
    if (user.error) {
      return user.error;
    }
    const userData = user.data;
    let updateData = {};
    if (userData.name !== name) {
      updateData.name = name;
    }
    if (userData.email !== email) {
      updateData.email = email;
    }
    if (userData.password !== password) {
      updateData.password = password;
    }
    const updateUser = await this.user.updateOneUser(params, updateData);
    if (updateUser.error) {
      return updateUser.error;
    }
    return utils.wrapperData(updateData);
  }

  async deleteUser(userId) {
    const params = { id: userId };
    const { data, error } = await this.user.deleteOneUser(params);
    if (error) {
      return utils.wrapperError(error);
    }
    return utils.wrapperData(data);
  }
}
