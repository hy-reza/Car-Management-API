import express from "express";
import "dotenv/config";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const PORT = process.env.SERVER_PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server allready listening for requests on port ${PORT}`);
});
