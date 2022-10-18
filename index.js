const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(cors());

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server allready listening for request on port ${PORT}...`);
});
