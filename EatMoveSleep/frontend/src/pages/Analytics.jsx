import React, { useEffect, useState } from 'react';

const Analytics = () => {
  const [summary, setSummary] = useState({
    mealCount: 0,
    caloriesIn: 0,
    caloriesOut: 0,
    sleepHours: 0,
    avgSleep: 0
  });

  useEffect(() => {
    const email = localStorage.getItem('ems_logged_in_email');
    if (!email) return;

    const meals = JSON.parse(localStorage.getItem(`ems_meals_${email}`)) || [];
    const workouts = JSON.parse(localStorage.getItem(`ems_workouts_${email}`)) || [];
    const sleep = JSON.parse(localStorage.getItem(`ems_sleep_${email}`)) || [];

    const caloriesIn = meals.reduce((sum, m) => sum + (m.calories || 0), 0);
    const caloriesOut = workouts.reduce((sum, w) => sum + (w.durationMinutes || 0), 0);
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
    <div style={container}>
      <h2 style={title}>📊 Your Analytics</h2>

      <div style={topRow}>
        <div style={{ ...card, backgroundColor: '#d1d5db', color: '#111827' }}>
          🍽️ <strong>Total Meals Logged</strong>
          <div>{summary.mealCount}</div>
        </div>

        <div style={{ ...card, backgroundColor: '#facc15' }}>
          🔥 <strong>Calories In</strong>
          <div>{summary.caloriesIn} kcal</div>
        </div>

        <div style={{ ...card, backgroundColor: '#34d399' }}>
          🏋️ <strong>Calories Out</strong>
          <div>{summary.caloriesOut} kcal</div>
        </div>
      </div>

      <div style={bottomRow}>
        <div style={{ ...card, backgroundColor: '#818cf8' }}>
          😴 <strong>Total Sleep Hours</strong>
          <div>{summary.sleepHours} h</div>
        </div>

        <div style={{ ...card, backgroundColor: '#60a5fa' }}>
          💤 <strong>Avg Sleep</strong>
          <div>{summary.avgSleep} h/night</div>
        </div>
      </div>
    </div>
  );
};

const container = {
  padding: '2rem',
  textAlign: 'center'
};

const title = {
  marginBottom: '2rem'
};

const topRow = {
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
  flexWrap: 'wrap'
};

const bottomRow = {
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
  marginTop: '2rem'
};

const card = {
  width: '200px',
  height: '120px',
  borderRadius: '12px',
  padding: '1rem',
  fontWeight: 'bold',
  fontSize: '1rem',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white'
};

export default Analytics;
