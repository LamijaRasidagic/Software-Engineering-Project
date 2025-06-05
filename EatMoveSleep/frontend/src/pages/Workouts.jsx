import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import image6 from '../assets/image6.jpg';
import triceps from '../assets/triceps.jpg';
import biceps from '../assets/biceps.jpg';
import shoulderpress from '../assets/shoulderpress.jpg';
import legextension from '../assets/legextension.jpg';
import calfraises from '../assets/calfraises.jpg';
import squats from '../assets/squats.jpg';
import russiantwist from '../assets/russiantwist.jpg';
import situp from '../assets/situp.jpg';
import plank from '../assets/plank.jpg';

const exercises = {
  Arms: [
    { name: 'Triceps Dips', image: triceps, calories: 80 },
    { name: 'Bicep Curl', image: biceps, calories: 70 },
    { name: 'Shoulder Press', image: shoulderpress, calories: 90 }
  ],
  Legs: [
    { name: 'Leg Extension', image: legextension, calories: 100 },
    { name: 'Calf Raises', image: calfraises, calories: 60 },
    { name: 'Squats', image: squats, calories: 110 }
  ],
  Stomach: [
    { name: 'Russian Twist', image: russiantwist, calories: 50 },
    { name: 'Sit-ups', image: situp, calories: 60 },
    { name: 'Plank', image: plank, calories: 40 }
  ]
};

const Workouts = () => {
  const navigate = useNavigate();
  const [workoutTitle, setWorkoutTitle] = useState('');
  const [exerciseInput, setExerciseInput] = useState('');
  const [exerciseList, setExerciseList] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('ems_logged_in');
    if (!isLoggedIn) {
      navigate('/');
      return;
    }

    const storedWorkouts = JSON.parse(localStorage.getItem('ems_grouped_workouts')) || [];
    setWorkouts(storedWorkouts);
  }, [navigate]);

  const handleAddExercise = () => {
    if (exerciseInput.trim() === '') return;
    setExerciseList([...exerciseList, { name: exerciseInput.trim(), calories: 50 }]);
    setExerciseInput('');
  };

  const handleAddFromCard = (exerciseName) => {
    const found = Object.values(exercises).flat().find(ex => ex.name === exerciseName);
    if (found) {
      setExerciseList([...exerciseList, { name: found.name, calories: found.calories }]);
    }
  };

  const handleSaveWorkout = () => {
    if (!workoutTitle || exerciseList.length === 0) return;

    const caloriesBurned = exerciseList.reduce((sum, ex) => sum + ex.calories, 0);

    const newWorkout = {
      id: Date.now(),
      title: workoutTitle.trim(),
      exercises: exerciseList,
      caloriesBurned
    };

    const updated = [...workouts, newWorkout];
    setWorkouts(updated);
    localStorage.setItem('ems_grouped_workouts', JSON.stringify(updated));

    const burnedToday = parseInt(localStorage.getItem('ems_calories_out') || '0');
    localStorage.setItem('ems_calories_out', burnedToday + caloriesBurned);

    setWorkoutTitle('');
    setExerciseInput('');
    setExerciseList([]);
  };

  const handleDelete = (id) => {
    const updated = workouts.filter((w) => w.id !== id);
    setWorkouts(updated);
    localStorage.setItem('ems_grouped_workouts', JSON.stringify(updated));
  };

  return (
    <div style={{
      fontFamily: 'sans-serif',
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0,0,0,0.6)), url(${image6})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      padding: '2rem',
      color: 'white',
      minHeight: '100vh'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>🏋️ Create Workout</h2>

      <div style={formContainer}>
        <input type="text" placeholder="Workout title (e.g. Leg Day)" value={workoutTitle} onChange={(e) => setWorkoutTitle(e.target.value)} style={{ ...inputStyle, marginBottom: '1rem' }} />

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input type="text" placeholder="Exercise name" value={exerciseInput} onChange={(e) => setExerciseInput(e.target.value)} style={{ ...inputStyle, flex: 1 }} />
          <button onClick={handleAddExercise} style={{ ...buttonStyleBlue, transition: 'background-color 0.3s' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#0284c7'} onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}>+ Add</button>
        </div>

        {exerciseList.length > 0 && (
          <ul style={exerciseListStyle}>
            {exerciseList.map((ex, index) => (
              <li key={index}>✅ {ex.name}</li>
            ))}
          </ul>
        )}

        <button onClick={handleSaveWorkout} style={buttonStyleGreen}>Save Workout</button>
      </div>

      <h3 style={{ textAlign: 'center', marginTop: '3rem', fontSize: '2rem' }}>🏋️ Exercises</h3>

      {Object.entries(exercises).map(([category, items]) => (
        <div key={category}>
          <h4 style={{ textAlign: 'center', fontSize: '1.5rem', marginTop: '2rem' }}>{category}</h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            justifyContent: 'center',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {items.map((exercise, index) => (
              <div key={index} style={{ ...exerciseCardStyle, backgroundImage: `url(${exercise.image})` }}>
                <div style={overlay}>
                  <strong style={{ fontSize: '1.2rem' }}>{exercise.name}</strong>
                  <button
                    onClick={() => handleAddFromCard(exercise.name)}
                    style={{ ...logButtonStyle, marginTop: '0.5rem' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#0284c7'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'}
                  >
                    + Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <h3 style={{ textAlign: 'center', marginTop: '3rem', fontSize: '2rem' }}>📋 Your Workouts</h3>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem', maxWidth: '700px', marginInline: 'auto' }}>
        {workouts.map((workout) => (
          <li key={workout.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#4b5563', color: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <div>
              <strong>💪 {workout.title}</strong> — {workout.exercises.map(ex => ex.name).join(', ')}<br />
              🔥 {workout.caloriesBurned} kcal burned
            </div>
            <button onClick={() => handleDelete(workout.id)} style={deleteStyle}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const formContainer = {
  width: '100%',
  maxWidth: '400px',
  margin: '0 auto',
  backgroundColor: '#f9fafb',
  padding: '1.5rem',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.06)'
};

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  boxSizing: 'border-box'
};

const buttonStyleBlue = {
  padding: '10px 16px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#00aaff',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const buttonStyleGreen = {
  marginTop: '1rem',
  padding: '12px',
  width: '100%',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#00aaff',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const deleteStyle = {
  backgroundColor: '#dc2626',
  color: 'white',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '6px',
  cursor: 'pointer'
};

const exerciseCardStyle = {
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '10px',
  overflow: 'hidden',
  height: '200px',
  maxWidth: '350px',
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-end',
  width: '100%'
};

const overlay = {
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  color: 'white',
  padding: '1rem',
  boxSizing: 'border-box',
  fontSize: '1.2rem',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

const exerciseListStyle = {
  textAlign: 'left',
  marginBottom: '1rem',
  paddingLeft: '1.2rem',
  color: '#111'
};

const logButtonStyle = {
  padding: '8px 12px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default Workouts;
