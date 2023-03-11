exports.errorHandler = (error, req, res, next) => {
  if (error.code === "11000") {
    return res.status(400).json({ message: "User already exists" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json(error);
  } else {
    return res.status(500).json({ message: "Something went wrong..." });
  }
};
