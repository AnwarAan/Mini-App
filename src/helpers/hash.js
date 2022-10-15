import bcrypt from "bcrypt";
import utils from "../utils/utils.js";

const encrypt = async (plainText) => {
  try {
    const saltRound = 10;
    const result = await bcrypt.hash(plainText, saltRound);
    return result;
  } catch (error) {
    return utils.wrapperError(error);
  }
};

const decrypt = async (plainText, hash) => {
  try {
    const result = await bcrypt.compare(plainText, hash);
    return result;
  } catch (error) {
    return utils.wrapperError(error);
  }
};

const hash = { encrypt, decrypt };

export default hash;
