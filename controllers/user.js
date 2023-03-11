const { registerUser } = require("../services/user");

exports.signUp = async (req, res, next) => {
  try {
    await registerUser(req.body);
    res.status(200).json({ message: "User registered!" });
  } catch (error) {
    next(error);
  }
};
