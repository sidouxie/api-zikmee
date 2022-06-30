const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

const maxAge = 3600 * 24;

const creatToken = (id) => {
  return jwt.sign({ id }, process.env.KEY_TOKEN, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  const { email, pseudo, password } = req.body;
  try {
    const user = await User.create({ email, pseudo, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = await creatToken(user._id);

    res.status(200).json({ user: user._id, token: token });
  } catch (error) {
    res.status(400).send(error);
  }
};
