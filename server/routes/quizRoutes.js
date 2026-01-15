// server/routes/quizRoutes.js
const express = require("express");
const Quiz = require("../models/quiz");
const router = express.Router();

// Get all quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching quizzes", error: err });
  }
});

// Add new quiz
router.post("/", async (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (err) {
    res.status(400).json({ message: "Error creating quiz", error: err });
  }
});

module.exports = router;
