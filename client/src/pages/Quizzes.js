// src/pages/Quizzes.js
import React, { useState } from "react";
import FeatureCard from "../components/FeatureCards"; 
import QuizPage from "../components/QuizPage";
import SQuizPage from "../components/SQuizPage";

function Quizzes() {
  const [mode, setMode] = useState(null);

  // Render quiz pages depending on mode
  if (mode === "normal") return <QuizPage onBack={() => setMode(null)} />;
  if (mode === "scenario") return <SQuizPage onBack={() => setMode(null)} />;

  // Default: show quiz selection
  const quizTypes = [
    { icon: "📝", title: "Quiz 1: Legal Rights (Normal)", mode: "normal" },
    { icon: "🎭", title: "Quiz 2: Scenario-based", mode: "scenario" },
  ];

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ textAlign: "center" }}>Choose Your Quiz</h1>
      <p style={{ textAlign: "center", marginBottom: "30px" }}>
        Select the type of quiz you want to attempt.
      </p>

      <div
        className="feature-strip"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {quizTypes.map((q, i) => (
          <div
            key={i}
            onClick={() => setMode(q.mode)}
            style={{ cursor: "pointer" }}
          >
            <FeatureCard icon={q.icon} title={q.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quizzes;
