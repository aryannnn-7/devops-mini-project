// src/components/Quiz.js
import React, { useState, useEffect } from "react";

function Quiz({ title, apiEndpoint, onBack }) {
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch(apiEndpoint)
      .then((res) => res.json())
      .then((data) => {
        // Shuffle and pick random 15
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 15);
        setQuizzes(selected);
      })
      .catch((err) =>
        console.error(`Error fetching quizzes from ${apiEndpoint}:`, err)
      );
  }, [apiEndpoint]);

  const handleChange = (quizId, value) => {
    setAnswers((prev) => ({ ...prev, [quizId]: value }));
  };

  const handleSubmit = () => {
    let newScore = 0;
    quizzes.forEach((q) => {
      if (answers[q._id] === q.answer) newScore++;
    });
    setScore(newScore);
    setSubmitted(true);
  };

  if (!quizzes.length) return <p>Loading quizzes...</p>;

  if (submitted) {
    return (
      <div className="quiz-result">
        <h2>{title} — Results</h2>
        <p>Your Score: {score} / {quizzes.length}</p>
        <div className="quiz-actions">
          <button onClick={onBack}>Back</button>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>{title}</h2>
      </div>

      {quizzes.map((quiz, index) => (
        <div key={quiz._id} className="question-card">
          <p className="question-text quiz-question">
            <strong>Q{index + 1}:</strong> {quiz.question}
          </p>
          {quiz.options.map((opt, i) => (
            <label key={i} className="option-label quiz-option" style={{ display: "block" }}>
              <input
                type="radio"
                name={quiz._id}
                value={opt}
                checked={answers[quiz._id] === opt}
                onChange={(e) => handleChange(quiz._id, e.target.value)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      <button onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
}

export default Quiz;