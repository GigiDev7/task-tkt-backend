const CustomError = require("../utils/customError");

exports.protectAdmin = (req, res, next) => {
  const userRole = req.user.role;
  if (userRole !== "admin") {
    throw new CustomError(
      "AuthenticationError",
      "You are not allowed to proceed"
    );
  }
  next();
};
