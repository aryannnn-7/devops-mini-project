import React from "react";
import { useNavigate } from "react-router-dom";
import "./FeatureCard.css";

function FeatureCard({ icon, title, route }) {
  const navigate = useNavigate();

  return (
    <div className="feature-card" onClick={() => navigate(route)}>
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
    </div>
  );
}

export default FeatureCard;
