const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

exports.registerUser = async (userData) => {
  const hashedPassword = await hashPassword(userData.password);
  const newData = { ...userData, password: hashedPassword };
  return User.create(newData);
};
