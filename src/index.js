//import 3rb party dependencies
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");

//import local dependencies
const { userRoutesV1, authRoutesV1, carsRoutesV1 } = require("./routes/index.js");
const { sequelize: db } = require("./models/index.js");

const server = express();

//swagger api docs
const apiDocs = require("../docs/apidocs.json");
server.use("/api-docs", swaggerUI.serve, swaggerUI.setup(apiDocs));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(cors());
server.use(morgan("dev"));
server.use(express.static("static"));


server.use("/users", userRoutesV1);
server.use("/auth", authRoutesV1);
server.use("/cars", carsRoutesV1);

const PORT = process.env.HTTP_PORT || 3000;
try {
  db.authenticate();
  console.info("DB authenticate successfully");
  server.listen(PORT, () => {
    console.info(`Server allready listening for request on port ${PORT}...`);
  });
} catch (e) {
  console.error(e);
}
