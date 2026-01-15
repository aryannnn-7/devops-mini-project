// src/components/QuizPage.js
import React from "react";
import Quiz from "./Quiz";

function QuizPage({ onBack }) {
  return (
    <Quiz
      title="Legal Rights Quiz (Normal)"
      apiEndpoint={`${process.env.REACT_APP_API_URL}/api/quizzes`}
      onBack={onBack}
    />
  );
}

export default QuizPage;
