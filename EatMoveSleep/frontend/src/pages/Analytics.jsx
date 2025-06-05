import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/image9.jpg';

const Analytics = () => {
  const [summary, setSummary] = useState({
    mealCount: 0,
    caloriesIn: 0,
    caloriesOut: 0,
    sleepHours: 0,
    avgSleep: 0
  });

  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('ems_logged_in_email');
    if (!email) return;

    const meals = JSON.parse(localStorage.getItem(`ems_meals_${email}`)) || [];
    const workouts = JSON.parse(localStorage.getItem(`ems_workouts_${email}`)) || [];
    const sleep = JSON.parse(localStorage.getItem(`ems_sleep_${email}`)) || [];

    const caloriesIn = meals.reduce((sum, m) => sum + (m.calories || 0), 0);

    const today = new Date().toISOString().split('T')[0];
    const caloriesOut = workouts
      .filter(w => w.date === today)
      .reduce((sum, w) => sum + (w.calories || 0), 0);

    const totalSleep = sleep.reduce((sum, s) => sum + (s.hours || 0), 0);
    const avgSleep = sleep.length ? (totalSleep / sleep.length).toFixed(1) : 0;

    setSummary({
      mealCount: meals.length,
      caloriesIn,
      caloriesOut,
      sleepHours: totalSleep,
      avgSleep
    });
  }, []);

  return (
    <div style={{
      ...container,
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      position: 'relative',
    }}>
      <div style={overlay} />

      <div style={content}>
        <h2 style={title}>📊 Your Analytics</h2>

        <div style={topRow}>
          <div style={{ ...card, backgroundColor: '#d1d5db', color: '#111827' }} onClick={() => navigate('/meals')}>
            🍽️ <strong>Total Meals Logged</strong>
            <div>{summary.mealCount}</div>
          </div>

          <div style={{ ...card, backgroundColor: '#facc15' }} onClick={() => navigate('/meals')}>
            🔥 <strong>Calories In</strong>
            <div>{summary.caloriesIn} kcal</div>
          </div>

          <div style={{ ...card, backgroundColor: '#34d399' }} onClick={() => navigate('/workouts')}>
            🏋️ <strong>Calories Out</strong>
            <div>{summary.caloriesOut} kcal</div>
          </div>
        </div>

        <div style={bottomRow}>
          <div style={{ ...card, backgroundColor: '#818cf8' }} onClick={() => navigate('/sleep')}>
            😴 <strong>Total Sleep Hours</strong>
            <div>{summary.sleepHours} h</div>
          </div>

          <div style={{ ...card, backgroundColor: '#60a5fa' }} onClick={() => navigate('/sleep')}>
            💤 <strong>Avg Sleep</strong>
            <div>{summary.avgSleep} h/night</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const container = {
  textAlign: 'center',
  overflow: 'hidden'
};

const overlay = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  backdropFilter: 'blur(6px)',
  zIndex: 1,
};

const content = {
  position: 'relative',
  zIndex: 2,
  paddingTop: '5rem'
};

const title = {
  marginBottom: '2rem',
  color: 'white',
  textShadow: '2px 2px 4px rgba(0,0,0,0.4)'
};

const topRow = {
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
  flexWrap: 'wrap',
  marginBottom: '2rem'
};

const bottomRow = {
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
  flexWrap: 'wrap'
};

const card = {
  width: '220px',
  height: '140px',
  borderRadius: '12px',
  padding: '1rem',
  fontWeight: 'bold',
  fontSize: '1rem',
  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out'
};

export default Analytics;
