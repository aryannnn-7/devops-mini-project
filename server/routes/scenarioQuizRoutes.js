const express = require("express");
const router = express.Router();
const { getScenarioQuizzes } = require("../controllers/scenarioQuizController");

// GET all scenario quizzes
router.get("/", getScenarioQuizzes);

module.exports = router;
