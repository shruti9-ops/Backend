const express = require("express");
const router = express.Router();

const dashboardController = require("../Controller/dashboardController");
const authMiddleware = require("../Middleware/authMiddleware");

router.get("/", authMiddleware, dashboardController.getDashboard);

module.exports = router;