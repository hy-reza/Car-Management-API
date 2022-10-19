const router = require("express").Router();
const { usersController } = require("../controllers/api/v1/index.js");

const { getUsers } = usersController;

router.get("/api/v1", getUsers);

module.exports = router;
