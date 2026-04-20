const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  logoutAdmin,
  checkAuth,
} = require("../config/controllers/auth.controller");

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/check-auth", checkAuth);

module.exports = router;