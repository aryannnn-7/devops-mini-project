// src/pages/Flashcards.js
import React from "react";
import FeatureCard from "../components/FeatureCards";

function Flashcards() {
  const stages = [
    { icon: "📝", title: "Stage 1: Title → Description", route: "/flashcards/fg1" },
    { icon: "⚖️", title: "Stage 2: Title → Law Reference", route: "/flashcards/fg2" }
  ];

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ textAlign: "center" }}>Choose a Flashcard Stage</h1>
      <p style={{ textAlign: "center", marginBottom: "30px" }}>
        Test your knowledge in different ways.
      </p>

      <div
        className="feature-strip"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px"
        }}
      >
        {stages.map((item, index) => (
          <FeatureCard
            key={index}
            icon={item.icon}
            title={item.title}
            route={item.route}
          />
        ))}
      </div>
    </div>
  );
}

export default Flashcards;
