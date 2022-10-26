import fs from "fs";
import jwt from "jsonwebtoken";
import utils from "../../utils/utils.js";
import err from "../../utils/err.js";
import hash from "../../helpers/hash.js";
import Users from "./repositories.js";
import QueryUser from "./query-domain.js";
import mailer from "../../helpers/mailer.js";
import mustache from "mustache";

export default class CommadUser {
  constructor() {
    this.user = new Users();
    this.query = new QueryUser();
  }

  async registerUser(payload) {
    const { name, email, password, phoneNumber, photo } = payload;
    const checkEmail = await this.query.getUserByEmail(email);
    if (checkEmail.data != null) return utils.wrapperError(err.forbidden("email has already"));
    if (checkEmail.error) return checkEmail.error;
    const pwd = await hash.encrypt(password);
    const userData = {
      name: name,
      email: email,
      password: pwd,
      phone_number: phoneNumber,
      photo: photo,
    };
    const { data, error } = await this.user.insertOneUser(userData);
    if (error) return utils.wrapperError(error);
    return utils.wrapperData(data);
  }

  async loginUser(payload) {
    const { email, password } = payload;
    const checkUser = await this.query.getUserByEmail(email);
    if (checkUser.data === null) return utils.wrapperError(err.notFoud("email not registered"));
    if (checkUser.error) return checkUser.error;
    const checkPwd = await hash.decrypt(password, checkUser.data.password);
    if (!checkPwd) return utils.wrapperError(err.unauthorized("password not match"));
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

  async updateUser(userId, payload) {
    const params = { id: userId };
    const { name, email, password, phoneNumber, photo } = payload;
    const user = await this.query.getUserById(userId);
    if (user.error) return user.error;
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
    if (updateUser.error) return updateUser.error;
    return utils.wrapperData(updateData);
  }

  async resetPassword(email) {
    const getUser = await this.query.getUserByEmail(email);
    if (getUser.data === null) return utils.wrapperError(err.unauthorized("email not registered"));
    const userEmail = getUser.data.email;
    const token = await hash.encrypt(getUser.data.id);
    const link = `v1/user/reset-password?userId${token}`;
    const tmp = fs.readFileSync("./src/helpers/templates/reset-password.html", "utf8");
    const body = mustache.render(tmp, { link });
    const mailOpt = {
      from: "anwaraan998@gmail.com",
      to: userEmail,
      subject: "reset password",
      html: body,
    };
    mailer.sendMail(mailOpt, (error, data) => {
      if (error) return utils.wrapperError(err.internalServerError("failed sent mail"));
      console.log(data.messageId);
    });
    return utils.wrapperData("link reset password has been sent to email");
  }

  async deleteUser(userId) {
    const params = { id: userId };
    const { data, error } = await this.user.deleteOneUser(params);
    if (error) return utils.wrapperError(error);
    return utils.wrapperData(data);
  }

  async deleteUsers() {
    const { data, error } = await this.user.deleteManyUser();
    if (error) return utils.wrapperError(error);
    return utils.wrapperData(data);
  }
}
