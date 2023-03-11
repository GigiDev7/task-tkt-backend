const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Firstname is requried"],
  },
  lastname: {
    type: String,
    required: [true, "Lastname is required"],
  },
  email: {
    type: String,
    validate: [isEmail, "Email is not valid"],
    required: [true, "Email is required"],
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
  },
  password: {
    type: String,
    required: [true, "Passwod is required"],
    minLength: [6, "Password must be at least 6 characters"],
  },
  role: {
    type: String,
    enum: {
      values: ["admin", "user"],
      message: "{VALUE} is not supported",
    },
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
