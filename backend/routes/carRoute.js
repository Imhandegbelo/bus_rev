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
const { requireRole } = require("../middleware/roleMiddleware");

router.get("/", requireRole('ADMIN'), getCars);
router.get("/:id", requireRole('ADMIN'), getCarById)
router.post("/", requireRole('ADMIN'), addCars);
router.put("/:id", requireRole('ADMIN'), updateCars);
router.delete("/:id", requireRole('ADMIN'), deleteCar);

module.exports = router;
