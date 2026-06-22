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

      <div style={{ 
        margin: '20px auto 40px', /* <-- Changed this line to add 40px bottom margin */
        padding: '12px 20px', 
        backgroundColor: 'rgba(245, 158, 11, 0.1)', 
        border: '1px solid rgba(245, 158, 11, 0.2)', 
        color: '#fcd34d', 
        borderRadius: '12px', 
        fontSize: '0.85rem', 
        maxWidth: '550px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
      }}>
        <span>⚠️</span> 
        <span><strong>Please be patient:</strong> The database might take a little while to load initially.</span>
      </div>

      <div className="feature-strip">
        {features.map((item, index) => (
          <FeatureCard key={index} icon={item.icon} title={item.title} route={item.route} />
        ))}
      </div>
    </div>
  );
}

export default Home;