const router = require("express").Router();
const { usersController } = require("../controllers/api/v1/index.js");

const { getUsers, getUserById, createUser, updateUser, removeUser } =
  usersController;

router.get("/api/v1", getUsers);
router.get("/api/v1/:id", getUserById);
router.post("/api/v1/", createUser);
router.put("/api/v1/:id", updateUser);
router.delete("/api/v1/:id", removeUser);

module.exports = router;
