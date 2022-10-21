const router = require("express").Router();
const { carsController } = require("../controllers/api/v1/index.js");

const {
  getCars,
  getCarById,
  postCars,
  updateCars,
  deleteCars,
  getCarsDump
} = carsController;

const verifyToken = require("../middleware/verifyToken.js");
const { adminOnly, superminOnly } = require("../middleware/verifyRole.js");
const uploadFile = require("../middleware/carPhoto.js");

router.get("/carsDump", verifyToken, getCarsDump);
router.get("/api/v1", verifyToken, getCars);
router.get("/api/v1/:id", verifyToken, getCarById);
router.post("/api/v1/", uploadFile, verifyToken, adminOnly, postCars);
router.put("/api/v1/:id", uploadFile, verifyToken, adminOnly, updateCars)
router.delete("/api/v1/:id", verifyToken, adminOnly, deleteCars);

module.exports = router;
