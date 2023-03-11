const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const CustomError = require("../utils/customError");

exports.protectAuth = (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.split(" ")[1]) {
    throw new CustomError("AuthorizationError", "Invalid credentials");
  }

  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "cdjasoejaosnceasoce13", async (err, decodedData) => {
    if (err) {
      throw new CustomError("AuthorizationError", "Invalid credentials");
    }
    const user = await User.findById(decodedData.id, "-password");
    if (!user) {
      throw new CustomError("NotFounError", "User does not exist");
    }
    req.user = user;
    next();
  });
};
