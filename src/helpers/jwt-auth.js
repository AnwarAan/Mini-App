import jwt from "jsonwebtoken";
import err from "../utils/err.js";
import utils from "../utils/utils.js";
import Users from "../modules/user/repositories.js";

const user = new Users();
const jwtAuth = async (req, res, next) => {
  const headers = req.headers;
  if (headers && headers.authorization && headers.authorization.includes("Bearer")) {
    const parted = headers.authorization.split(" ");
    const token = parted[1];
    if (parted.length === 2) {
      let decode;
      try {
        decode = await jwt.verify(parted[1], process.env.SECRET_KEY);
      } catch (error) {
        return utils.responseFail(res, err.forbidden("invalid token"));
      }
      console.log("log", token);
      const userData = await user.findOneUser({ _id: decode._id });
      if (userData.data) {
        req.userId = decode._id;
        return next();
      }
    }
  }
  return utils.responseFail(res, err.forbidden("invalid token"));
};

export default jwtAuth;
