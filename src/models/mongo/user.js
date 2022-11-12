import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phone_number: {
    type: Number,
  },
  photo: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);
export default User;
