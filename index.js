const express = require("express");
require("dotenv").config();
const router = require("./routes/router");
require("./db");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;
const corsOption = {
  origin: "*",
  allowHeards: ["Accept", "Content-Type", "Origin"],
  exposedHeaders: ["Content-Length", "X-JSON"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/api/", router);

app.listen(PORT, () => {
  console.log(`server started in port : http://localhost:${PORT}`);
});
