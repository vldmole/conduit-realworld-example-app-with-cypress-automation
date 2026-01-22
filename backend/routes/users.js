const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authentication");
const { signUp, signIn, signDown } = require("../controllers/users");

// Register
router.post("/", signUp);

// Login
router.post("/login", signIn);

//*Unregister
router.delete("/", verifyToken, signDown);
module.exports = router;
