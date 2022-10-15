import auth from "basic-auth";
import err from "../utils/err.js";
import utils from "../utils/utils.js";

const basicAuth = async (req, res, next) => {
  const user = auth(req);
  if (user?.name === process.env.BASIC_USER && user?.pass === process.env.BASIC_PASSWORD) next();
  else return utils.responseFail(res, err.unauthorized());
};

export default basicAuth;
