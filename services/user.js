const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const CustomError = require("../utils/customError");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

const comparePasswords = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

exports.registerUser = async (userData) => {
  const hashedPassword = await hashPassword(userData.password);
  const newData = { ...userData, password: hashedPassword };
  return User.create(newData);
};

const createAccessToken = (userId) => {
  return jwt.sign({ id: userId }, "cdjasoejaosnceasoce13", {
    expiresIn: "1h",
  });
};

exports.loginUser = async (enteredEmail, enteredPassword) => {
  const user = await User.findOne({ email: enteredEmail });
  if (!user) {
    throw new CustomError("NotFound", "User not found");
  }
  const isPasswordCorrect = await comparePasswords(
    enteredPassword,
    user.password
  );
  if (!isPasswordCorrect) {
    throw new CustomError("AuthenticationError", "Incorrect email or password");
  }
  const token = createAccessToken(user._id);
  const { password, ...userData } = user._doc;
  return { token, userData };
};
