const express = require("express");
const router = express.Router();
const {
  getPortfolio,
  upsertPortfolio,
} = require("../config/controllers/portfolio.controller");
const verifyAdmin = require("../middleware/auth.middleware");

router.get("/", getPortfolio);
router.post("/upsert", verifyAdmin, upsertPortfolio);

module.exports = router;