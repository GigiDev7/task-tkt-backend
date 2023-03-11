exports.errorHandler = (error, req, res, next) => {
  if (error.code === "11000") {
    return res.status(400).json({ message: "User already exists" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json(error);
  } else if (error.name === "NotFound") {
    return res
      .status(404)
      .json({ message: error.message || "Something went wrong" });
  } else if (error.name === "AuthenticationError") {
    return res
      .status(403)
      .json({ message: error.message || "Something went wrong" });
  } else {
    return res.status(500).json({ message: "Something went wrong..." });
  }
};
