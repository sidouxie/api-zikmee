const User = require("../model/userModel");

module.exports.getUser = async (req, res) => {
  const users = await User.find().select("-password -isAdmin");

  res.status(200).send(users);
};
