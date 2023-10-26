const express = require("express");
const {
  userRegistration,
  userLogin,
  currentUser,
} = require("../Controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/register", userRegistration);

router.post("/login", userLogin);

router.get("/current",validateToken, currentUser);

module.exports = router;
