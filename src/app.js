const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("hello word");
});
setTimeout(async () => {
  await require("./connection/db").connectDB();
  await require("./connection/redisConnection").connectRedis();
  app.use("/api/manager", require("./app.routes"));
  app.use(require("./app.routes"));

  app.listen(PORT, function () {
    console.log("Server started on PORT " + PORT);
  });
}, 0);
