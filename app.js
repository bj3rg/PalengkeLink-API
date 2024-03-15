const express = require("express");
const app = express();
const port = 3001;
const sequelizeConnect = require("./connection/database");


sequelizeConnect
  .sync({
    //force: true
  })
  .then(() => {
    app.listen(port, () => {
      console.log("Server running...");
    });
  })
  .catch((err) => {
    next(err);
  });
