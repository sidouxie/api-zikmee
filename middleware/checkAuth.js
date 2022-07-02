const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

module.exports.checkAuth = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(500).send("You need to auth to get data");
  try {
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.KEY_TOKEN);

    const user = await User.findById(decoded.id).select("email + pseudo");

    if (!user) {
      return res.status(500).send("Invalide token");
    } else {
      console.log(
        "\x1b[36m%s\x1b[0m",
        "User : " + user.pseudo + " connected id : " + user._id
      );
      next();
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports.checkIsAdmin = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(500).send("not authorized");
  try {
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.KEY_TOKEN);
    const user = await User.findById(decoded.id).select("isAdmin");
    if (!user.isAdmin) {
      return res.status(400).send("Not Authorized to do this");
    } else next();
  } catch (error) {
    return res.status(400).send(error);
  }
};
