import jwt from "jsonwebtoken";
import utils from "../../utils/utils.js";
import Users from "./repositories.js";
import QueryUser from "./query-domain.js";
import hash from "../../helpers/hash.js";

export default class CommadUser {
  constructor() {
    this.user = new Users();
    this.query = new QueryUser();
  }

  async registerUser(payload, files) {
    const { name, email, password, phoneNumber } = payload;
    const pwd = await hash.encrypt(password);
    const userData = {
      name: name,
      email: email,
      password: pwd,
      phone_number: phoneNumber,
      photo: files,
    };
    const { data, error } = await this.user.insertOneUser(userData);
    if (error) return utils.wrapperError(error);
    return utils.wrapperData(data);
  }

  async loginUser(payload) {
    const { email, password } = payload;
    const checkUser = await this.query.getUserByEmail(email);
    if (checkUser.error) {
      return checkUser.error;
    }
    const checkPwd = await hash.decrypt(password, checkUser.data.password);
    if (checkPwd.error) {
      return checkPwd.error;
    }
    const data = { _id: checkUser.data.id };
    const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "24h" });
    const userData = {
      _id: checkUser.data.id,
      name: checkUser.data.name,
      email: checkUser.data.email,
      token,
    };
    return utils.wrapperData(userData);
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
