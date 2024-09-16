const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  deleteCar,
  addCars,
  getCars,
  getCarById,
  updateCars,
} = require("../controller/carController");

router.get("/", protect, getCars);
router.get("/:id", protect, getCarById)
router.post("/", protect, addCars);
router.put("/:id", protect, updateCars);
router.delete("/:id", protect, deleteCar);

module.exports = router;
