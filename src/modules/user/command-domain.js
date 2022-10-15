import utils from "../../utils/utils.js";
import Users from "./repositories.js";
import QueryUser from "./query-domain.js";

export default class CommadUser {
  constructor() {
    this.user = new Users();
    this.query = new QueryUser();
  }

  async registerUser(payload, files) {
    const { name, email, password, phoneNumber } = payload;
    const userData = {
      name: name,
      email: email,
      password: password,
      phone_number: phoneNumber,
      photo: files,
    };
    const { data, error } = await this.user.insertOneUser(userData);
    console.log(data);
    if (error) {
      return utils.wrapperError(error);
    }
    return utils.wrapperData(data);
  }

  async updateUser(userId, payload, files) {
    const params = { id: userId };
    const { name, email, password, phoneNumber } = payload;
    const photo = files;
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
    if (userData.phone_number !== phoneNumber) {
      updateData.phone_number = phoneNumber;
    }
    if (userData.photo !== photo) {
      updateData.photo = photo;
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

  async deleteUsers() {
    const { data, error } = await this.user.deleteManyUser();
    if (error) {
      return utils.wrapperError(error);
    }
    return utils.wrapperData(data);
  }
}
