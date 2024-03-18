const express = require("express");
const bodyParser = require("body-parser");
const multerConfig = require("./util/multer");
const routes = require("./routes/main-route");
const cors = require("./util/cors");
const rateLimiter = require("./util/rate-limiter");
const sequelizeConnect = require("./connection/database");

const app = express();

app.use(multerConfig);
app.use(bodyParser.json());
app.use("/public", express.static("public"));
app.use("/api/v1", cors, rateLimiter, routes);
app.use("*", (req, res, next) => {
  res.status(404).json({ success: false, message: "Resource unavailable." });
});


sequelizeConnect
  .sync({
    //force: true
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running at ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
