import utils from "../../../utils/utils.js";
import User from "./repositories.js";
import QueryUser from "./query-domain.js";

export default class CommandUser {
  constructor() {
    this.user = new User();
    this.query = new QueryUser();
  }

  async registerUser(payload) {
    const { name, email, password, phoneNumber, photo } = payload;
    const query = `INSERT INTO user (name, email, password, phone_number, photo) 
    VALUES ('${name}', '${email}', '${password}', '${phoneNumber}', '${photo}')`;
    const { data, error } = await this.user.insertUser(query);
    if (error) return utils.wrapperError(error);
    return utils.wrapperData("success register user");
  }

  async updateUser(userId, payload) {
    console.log(userId);
    const { name, email, password, phoneNumber, photo } = payload;
    const query = `UPDATE user SET 
    name = '${name}',
    email = '${email}',
    password = '${password}',
    phone_number= '${phoneNumber}',
    photo = '${photo}'
    WHERE id = ${userId}`;
    const update = await this.user.updateUser(query);
    if (update.error) return utils.wrapperError(update.error);
    return utils.wrapperData("success update data");
  }

  async deleteUser(userId) {
    const query = `DELETE FROM user WHERE id = ${userId}`;
    const { data, error } = await this.user.deleteUser(query);
    if (error) return utils.wrapperError(error);
    return utils.wrapperData("success delete data");
  }
}
