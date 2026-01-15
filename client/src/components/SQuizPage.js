// src/components/SQuizPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function SQuizPage({ onBack }) {
  const [allScenarios, setAllScenarios] = useState([]);
  const [scenarios, setScenarios] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // ✅ Utility: pick N random unique items
  const pickRandom = (arr, n) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
  };

  // ✅ Fetch scenarios
  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/scenario-quizzes`)
      .then((res) => {
        if (cancelled) return;
        const scenarioQuizzes = Array.isArray(res.data) ? res.data : [];

        // Group flat API data into scenario objects
        const grouped = [];
        scenarioQuizzes.forEach((item) => {
          let existing = grouped.find((g) => g.scenario === item.scenario);
          if (!existing) {
            existing = {
              scenarioId: `scenario-${grouped.length + 1}`,
              scenario: item.scenario,
              questions: [],
            };
            grouped.push(existing);
          }
          existing.questions.push({
            subIndex: existing.questions.length + 1,
            question: item.question,
            options: item.options,
            answer: item.answer,
            _id: item._id,
          });
        });

        const take = Math.min(5, grouped.length);
        setAllScenarios(grouped);
        setScenarios(pickRandom(grouped, take));
        setAnswers({});
      })
      .catch((err) => {
        console.error("❌ Error fetching scenario quizzes:", err);
        setAllScenarios([]);
        setScenarios([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // ✅ Reattempt new random set
  const handleReattempt = () => {
    const take = Math.min(5, allScenarios.length);
    setScenarios(pickRandom(allScenarios, take));
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOptionChange = (qid, option) => {
    setAnswers((prev) => ({ ...prev, [qid]: option }));
  };

  const handleSubmit = () => {
    const allQs = scenarios.flatMap((s) => s.questions ?? []);
    const allAnswered = allQs.every((q) => answers[q._id]);

    if (!allAnswered) {
      alert("⚠️ Please answer all questions before submitting.");
      return;
    }

    let sc = 0;
    allQs.forEach((q) => {
      if (answers[q._id] === q.answer) sc++;
    });

    setScore(sc);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Loading state
  if (loading) {
    return (
      <div className="quiz-container text-center">
        <p>⏳ Loading scenario questions…</p>
      </div>
    );
  }

  // ✅ Empty state
  if (!scenarios.length) {
    return (
      <div className="quiz-container text-center">
        <h2>No scenario questions available.</h2>
        <div style={{ marginTop: 16 }}>
          <button onClick={onBack} className="btn btn-secondary">
            ⬅ Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  const totalQs = scenarios.reduce(
    (sum, s) => sum + (s.questions?.length || 0),
    0
  );

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">📘 Scenario-based Quiz</h2>

      {!submitted ? (
        <>
          <div className="quiz-instructions">
            <strong>Answer all {totalQs} questions before submitting.</strong>
          </div>

          {scenarios.map((scenario, sIndex) => (
            <div key={scenario.scenarioId || sIndex} className="scenario-card">
              <p className="scenario-title">
                Scenario {sIndex + 1}: {scenario.scenario}
              </p>

              {(scenario.questions ?? []).map((q, qIndex) => (
                <div key={q._id || qIndex} className="question-card">
                  <p className="question-text">
                    Q{q.subIndex}. {q.question}
                  </p>

                  <div>
                    {(q.options ?? []).map((opt, i) => (
                      <label key={i} className="option-label">
                        <input
                          type="radio"
                          name={q._id}
                          value={opt}
                          checked={answers[q._id] === opt}
                          onChange={() => handleOptionChange(q._id, opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div className="flex gap-4 justify-center mt-6">
            <button onClick={handleSubmit} className="btn btn-primary">
              ✅ Submit
            </button>
          </div>
        </>
      ) : (
        <div className="result-box">
          <h3 className="result-score">
            🎯 You scored {score} / {totalQs}
          </h3>
          <p className="result-text">
            {score >= Math.round(totalQs * 0.7)
              ? "Excellent — strong situational awareness! Review missed items to strengthen recall."
              : "Good attempt — review the scenarios and laws you missed. Try reattempting for better confidence."}
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={handleReattempt} className="btn btn-primary">
              🔁 Reattempt (new set)
            </button>
            <button onClick={onBack} className="btn btn-secondary">
              ⬅ Back to Quizzes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SQuizPage;
