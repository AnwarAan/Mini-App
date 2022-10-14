import User from "../../models/user.js";

const getUser = async (req, res) => {
  try {
    const result = await User.find();
    console.log(result);
    const response = {
      status: true,
      statusCode: 200,
      message: "success",
      data: result,
    };
    return res.status(200).json(response);
  } catch (error) {
    const response = {
      status: false,
      statusCode: 404,
      message: "not found",
    };
    return res.status(404).json(response);
  }
};
const getuserById = async (req, res) => {};
const registerUser = async (req, res) => {
  try {
    const name = req.body.name;
    const password = req.body.password;
    const argument = new User({ name: name, password: password });
    const result = await argument.save();
    console.log(result);
    const response = {
      status: true,
      statusCode: 200,
      message: "success",
      data: result,
    };
    return res.status(201).json(response);
  } catch (error) {
    console.log(error);
    const response = {
      status: false,
      statusCode: 500,
      message: "internal server error",
    };
    return res.status(500).json(response);
  }
};
const loginUser = async (req, res) => {};
const updateUser = async (req, res) => {};
const deleteUser = async (req, res) => {};
const deleteUsers = async (req, res) => {};

export default {
  getUser,
  getuserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  deleteUsers,
};
