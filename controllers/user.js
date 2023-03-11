const { registerUser, loginUser } = require("../services/user");

exports.signUp = async (req, res, next) => {
  try {
    await registerUser(req.body);
    res.status(200).json({ message: "User registered!" });
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const result = await loginUser(req.body.email, req.body.password);
    res.status(200).json({ token: result.token, user: result.userData });
  } catch (error) {
    next(error);
  }
};
