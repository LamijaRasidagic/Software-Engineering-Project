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
    <div style={wrapper}>
      {/* Background Blur */}
      <div style={{ ...bgImage, backgroundImage: `url(${background})` }} />
      {/* Dark Overlay */}
      <div style={blackOverlay} />

      {/* Foreground Content (aligned to top again) */}
      <div style={contentTop}>
        <h2 style={title}>📊 Your Analytics</h2>

        <div style={grid}>
          <div style={cardRow}>
            <AnalyticsCard
              label="Total Meals Logged"
              icon="🍽️"
              value={summary.mealCount}
              bgColor="#d1d5db"
              color="#111827"
              onClick={() => navigate('/meals')}
            />
            <AnalyticsCard
              label="Calories In"
              icon="🔥"
              value={`${summary.caloriesIn} kcal`}
              bgColor="#facc15"
              onClick={() => navigate('/meals')}
            />
            <AnalyticsCard
              label="Calories Out"
              icon="🏋️"
              value={`${summary.caloriesOut} kcal`}
              bgColor="#34d399"
              onClick={() => navigate('/workouts')}
            />
          </div>

          <div style={cardRow}>
            <AnalyticsCard
              label="Total Sleep Hours"
              icon="😴"
              value={`${summary.sleepHours} h`}
              bgColor="#818cf8"
              onClick={() => navigate('/sleep')}
            />
            <AnalyticsCard
              label="Avg Sleep"
              icon="💤"
              value={`${summary.avgSleep} h/night`}
              bgColor="#60a5fa"
              onClick={() => navigate('/sleep')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const AnalyticsCard = ({ label, icon, value, bgColor, color = 'white', onClick }) => (
  <div
    style={{
      ...card,
      backgroundColor: bgColor,
      color
    }}
    onClick={onClick}
  >
    {icon} <strong>{label}</strong>
    <div>{value}</div>
  </div>
);

// Styles
const wrapper = {
  position: 'relative',
  width: '100%',
  minHeight: '100vh',
  overflow: 'hidden',
};

const bgImage = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  filter: 'blur(6px)',
  zIndex: 0,
};

const blackOverlay = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  zIndex: 1,
};

const contentTop = {
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  padding: '4rem 2rem 2rem',
};

const title = {
  marginBottom: '2rem',
  fontSize: '28px',
  color: 'white',
  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
};

const grid = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  alignItems: 'center'
};

const cardRow = {
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
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out'
};

export default Analytics;
