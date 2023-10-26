const express = require("express");
const {
  getContacts,
  getContact,
  deleteContact,
  updateContact,
  createContact,
} = require("../Controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.use(validateToken)
router.get("/", getContacts );
router.get("/:id", getContact );
router.post("/", createContact );
router.put("/:id", updateContact );
router.delete("/:id", deleteContact);

module.exports = router;