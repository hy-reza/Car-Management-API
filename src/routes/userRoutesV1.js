const router = require("express").Router();
const { usersController } = require("../controllers/api/v1/index.js");

const {
  getUsers,
  getUserById,
  getCurrentUser,
  createUser,
  updateUser,
  removeUser,
} = usersController;

const verifyToken = require("../middleware/verifyToken.js");
const { adminOnly, superminOnly } = require("../middleware/verifyRole.js");

router.get("/api/v1/getCurrentUser", verifyToken, getCurrentUser);
router.get("/api/v1", verifyToken, adminOnly, getUsers);
router.get("/api/v1/:id", verifyToken, adminOnly, getUserById);
router.post("/api/v1/", verifyToken, superminOnly, createUser);
router.put("/api/v1/:id", verifyToken, superminOnly, updateUser);
router.delete("/api/v1/:id", verifyToken, superminOnly, removeUser);

module.exports = router;
