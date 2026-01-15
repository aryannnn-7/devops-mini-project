import React from 'react';
import FeatureCard from '../components/FeatureCards';
import '../index.css'; // import the new CSS file

function Home() {
  const features = [
    { icon: '📚', title: 'Legal Rights', route: '/legal-rights' },
    { icon: '🃏', title: 'Flashcards', route: '/flashcards' },
    { icon: '✅', title: 'Quiz', route: '/quizzes' },
    { icon: '👤', title: 'Login', route: '/login' },
    { icon: '📞', title: 'Helpline', route: '/help' },
  ];

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Legal Rights Portal</h1>
      <p className="home-subtitle">
        Learn and test your knowledge of cyber laws, student rights, and safety.
      </p>

      <div className="feature-strip">
        {features.map((item, index) => (
          <FeatureCard key={index} icon={item.icon} title={item.title} route={item.route} />
        ))}
      </div>
    </div>
  );
}

export default Home;
