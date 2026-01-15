const ScenarioQuiz = require("../models/ScenarioQuiz");

// @desc Get all scenario quizzes
// @route GET /api/scenario-quizzes
// @access Public
const getScenarioQuizzes = async (req, res) => {
  try {
    const quizzes = await ScenarioQuiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getScenarioQuizzes };
