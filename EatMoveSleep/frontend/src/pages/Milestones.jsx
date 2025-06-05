import React from 'react';

const Milestones = () => {
  const achievements = [
    {
      icon: '✅',
      title: 'First Meal Logged',
      description: 'You logged your first meal. Great job starting your journey!',
    },
    {
      icon: '🏋️',
      title: 'First Workout Completed',
      description: 'You completed your first workout. Keep moving!',
    },
    {
      icon: '😴',
      title: 'First Sleep Record',
      description: 'You tracked your sleep for the first time. Rest is important!',
    },
    {
      icon: '🎯',
      title: 'Goal Weight Achieved',
      description: 'Congratulations on reaching your target weight!',
    },
    {
      icon: '🔁',
      title: '7-Day Streak',
      description: 'You’ve maintained healthy habits for a full week!',
    }
  ];

  return (
    <div style={container}>
      <h2 style={title}>Your Milestones</h2>
      <div style={grid}>
        {achievements.map((a, i) => (
          <div key={i} style={card}>
            <span style={icon}>{a.icon}</span>
            <h3 style={subtitle}>{a.title}</h3>
            <p style={description}>{a.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles
const container = {
  maxWidth: '960px',
  margin: '0 auto',
  padding: '1rem'
};

const title = {
  fontSize: '1.5rem',
  textAlign: 'center',
  marginBottom: '1.5rem',
  color: '#1f2937'
};

const grid = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  justifyContent: 'center'
};

const card = {
  backgroundColor: '#f3f4f6',
  borderRadius: '12px',
  padding: '1rem',
  width: '250px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  textAlign: 'center'
};

const icon = {
  fontSize: '2rem'
};

const subtitle = {
  fontSize: '1.2rem',
  margin: '0.5rem 0'
};

const description = {
  fontSize: '0.95rem',
  color: '#4b5563'
};

export default Milestones;
