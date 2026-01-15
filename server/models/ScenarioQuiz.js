const mongoose = require("mongoose");

const scenarioQuizSchema = new mongoose.Schema({
  scenario: { 
    type: String, 
    required: true,
    trim: true // removes extra spaces
  },   // Elaborated situation

  question: { 
    type: String, 
    required: true,
    trim: true
  },   // Sub-question within scenario

  options: { 
    type: [String], 
    required: true,
    validate: arr => arr.length > 0 // must have at least 1 option
  },

  answer: { 
    type: String, 
    required: true,
    trim: true
  }
}, { 
  timestamps: true // adds createdAt & updatedAt
});

// Export the ScenarioQuiz model
module.exports = mongoose.model("ScenarioQuiz", scenarioQuizSchema);
