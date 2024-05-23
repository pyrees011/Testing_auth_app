const express = require("express");
const router = express.Router();

const authServices = require("../services/auth.service");

router.post("/signup", authServices.signup);
router.post("/login", authServices.login);
router.get("/:id", authServices.GetUserById);
router.delete("/:id", authServices.deleteUser);

module.exports = router;
