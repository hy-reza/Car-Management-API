const router = require("express").Router();
const { authController } = require("../controllers/api/v1/index.js");

const { signUp, signIn, signOut } = authController;

// router.get("/api/v1", getUsers);
// router.get("/api/v1/:id", getUserById);
router.post("/api/v1/signUp", signUp);
router.post("/api/v1/signIn", signIn);
router.delete("/api/v1/signOut", signOut);
// router.put("/api/v1/:id", updateUser);

module.exports = router;
