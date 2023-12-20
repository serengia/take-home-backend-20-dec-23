const express = require("express");
const calculationsController = require("../controllers/calculationsController");

const router = express.Router();

router
  .route("/")
  .get(calculationsController.getAllCalculations)
  .post(calculationsController.postCalculation);
router.route("/:id").delete(calculationsController.deleteCalculation);

module.exports = router;
