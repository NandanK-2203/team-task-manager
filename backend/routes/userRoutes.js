const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/userController");

// POST http://localhost:5000/api/users/register
router.post("/register", registerUser);

// POST http://localhost:5000/api/users/login
router.post("/login", loginUser);

module.exports = router;
