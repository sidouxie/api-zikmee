const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.URL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongoose is connected"))
  .catch((err) => console.log("connection failed to database : " + err));
