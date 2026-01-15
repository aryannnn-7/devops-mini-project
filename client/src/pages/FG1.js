// src/pages/FG1.js
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

function FG1() {
  const navigate = useNavigate();

  // Game state
  const [rights, setRights] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [showQuestion, setShowQuestion] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [questionLocked, setQuestionLocked] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // NEW: start control (added, nothing else changed)
  const [started, setStarted] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    loadRights();
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    if (rights.length >= 4) {
      const qs = buildQuestions(rights, 10);
      setQuestions(qs);
      startQuestion(qs, 0, true);
    }
  }, [rights]);

  useEffect(() => {
    if (finished) return;
    if (!questions.length) return;

    if (!showQuestion && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    }
    if (!showQuestion && timeLeft === 0) {
      setShowQuestion(true);
      setCards((prev) => prev.map((c) => ({ ...c, isFlipped: false })));
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, showQuestion, finished, questions.length]);

  const loadRights = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/rights`);
      if (!res.ok) throw new Error("Failed to fetch rights");
      const data = await res.json();
      setRights(data);
    } catch (err) {
      console.error("Error loading rights:", err);
    }
  };

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const buildQuestions = (pool, n = 10) => {
    const base = shuffle(pool).slice(0, Math.min(n, pool.length));
    return base.map((target) => {
      const others = shuffle(pool.filter((r) => r._id !== target._id)).slice(0, 3);
      const mode = Math.random() < 0.5 ? "titlesOnCards" : "descriptionsOnCards";
      const optionRights = shuffle([target, ...others]);
      const cards = optionRights.map((r) => ({
        id: `${r._id}-${mode}`,
        rightId: r._id,
        isFlipped: true,
        content: mode === "titlesOnCards" ? r.title : r.description,
      }));
      const promptText = mode === "titlesOnCards" ? target.description : target.title;
      return { mode, targetId: target._id, promptText, cards };
    });
  };

  const startQuestion = (qs, index, resetTotals = false) => {
    const q = qs[index];
    if (!q) return;
    setCards(q.cards);
    setShowQuestion(false);
    setTimeLeft(15);
    setWrongAttempts(0);
    setQuestionLocked(false);
    if (resetTotals) {
      setTotalScore(0);
      setFinished(false);
      setQIndex(0);
    } else {
      setQIndex(index);
    }
  };

  const goNext = () => {
    const next = qIndex + 1;
    if (next >= questions.length) {
      setFinished(true);
      return;
    }
    startQuestion(questions, next);
  };

  const handleAnswer = (card) => {
    if (!showQuestion || questionLocked) return;
    if (card.isFlipped) return;

    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c))
    );

    const currentQ = questions[qIndex];
    const isCorrect = card.rightId === currentQ.targetId;

    if (isCorrect) {
      const gained = Math.max(0, 1 - 0.25 * wrongAttempts);
      setTotalScore((s) => +(s + gained).toFixed(2));
      setQuestionLocked(true);
      setTimeout(goNext, 700);
    } else {
      setWrongAttempts((w) => {
        const nw = w + 1;
        if (nw >= 4) {
          setQuestionLocked(true);
          setTimeout(goNext, 700);
        }
        return nw;
      });
    }
  };

  const currentQ = questions[qIndex];
  const progressText = finished
    ? `Finished`
    : questions.length
    ? `Q ${qIndex + 1} / ${questions.length}`
    : "";

  // Preserve your original JSX exactly in a variable (no changes)
  const gameMarkup = (
    <div className="container">
      {/* Stage heading */}
      <h2 className="stageHeading">Stage 1: Match Title with Description</h2>

      {/* Header bar: question count (left), timer (center), score (right) */}
      <div className="header">
        <div className="info">
          <span className="progress">{progressText}</span>
          <span className="timer">⏳ {showQuestion ? "Go!" : `${timeLeft}s`}</span>
          <span className="totals">Score: {totalScore.toFixed(2)}</span>
        </div>
      </div>

      <div className="split">
        {/* LEFT SIDE */}
        <div className="left">
          <div className="grid">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`card ${showQuestion ? "clickable" : ""}`}
                onClick={() => showQuestion && handleAnswer(card)}
              >
                <div
                  className="inner"
                  style={{
                    transform: card.isFlipped
                      ? "rotateY(0deg)"
                      : "rotateY(180deg)",
                  }}
                >
                  <div className="front">{card.content}</div>
                  <div className="back">?</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="right">
          {!finished ? (
            showQuestion ? (
              <div className="questionBox">
                <h2 style={{ marginTop: 0 }}>
                  {currentQ?.mode === "titlesOnCards"
                    ? "Select the TITLE that matches this description:"
                    : "Select the DESCRIPTION that matches this title:"}
                </h2>
                <p className="promptText">{currentQ?.promptText}</p>
                <div style={{ opacity: 0.7, marginTop: 6 }}>
                  Wrong attempts: {wrongAttempts} (−0.25 each)
                </div>
              </div>
            ) : (
              <h2 style={{ opacity: 0.5 }}>Memorize these cards…</h2>
            )
          ) : (
            <div className="questionBox">
              <h2 style={{ marginTop: 0 }}>🎉 Quiz Complete!</h2>
              <p style={{ fontSize: 18, marginBottom: 10 }}>
                Final Score: {totalScore.toFixed(2)} / {questions.length}
              </p>
              <div className="resultBtns">
                <button
                  onClick={() => {
                    const qs = buildQuestions(rights, 10);
                    setQuestions(qs);
                    startQuestion(qs, 0, true);
                  }}
                  className="btnPrimary"
                >
                  🔄 Play Again
                </button>
                <button
                  onClick={() => navigate("/flashcards")}
                  className="btnSecondary"
                >
                  ⬅ Back
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Start screen (minimal, added only)
  const startScreen = (
    <div className="container">
      <div style={{ textAlign: "center", marginTop: 80 }}>
        <h2 className="stageHeading">Stage 1: Match Title with Description</h2>
        <p style={{ fontSize: 16, marginTop: 8 }}>Ready to begin?</p>
        <button
          onClick={() => {
            // Reset timer/score/attempts to ensure a fresh start
            setTotalScore(0);
            setTimeLeft(15);
            setWrongAttempts(0);
            setFinished(false);
            setQuestions((qs) => qs); // no-op to keep original data
            setStarted(true);
          }}
          className="btnPrimary"
          style={{ marginTop: 20 }}
        >
          Start
        </button>
      </div>
    </div>
  );

  // Render start screen until user clicks Start, then render the original game UI
  return started ? gameMarkup : startScreen;
}

export default FG1;
