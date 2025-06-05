import React, { useEffect, useState } from 'react';

const ProgressSummary = () => {
  const [summary, setSummary] = useState({
    sleepCount: 0,
    avgSleepHours: 0,
    workoutCount: 0,
    totalWorkoutMinutes: 0,
    mealCount: 0,
    totalCalories: 0
  });

  useEffect(() => {
    const email = localStorage.getItem('ems_logged_in_email');
    if (!email) return;

    const sleepData = JSON.parse(localStorage.getItem(`ems_sleep_${email}`)) || [];
    const workoutData = JSON.parse(localStorage.getItem(`ems_workouts_${email}`)) || [];
    const mealData = JSON.parse(localStorage.getItem(`ems_meals_${email}`)) || [];

    // Sleep
    const totalSleepHours = sleepData.reduce((sum, entry) => sum + (entry.hours || 0), 0);
    const avgSleep = sleepData.length ? (totalSleepHours / sleepData.length).toFixed(1) : 0;

    // Workouts
    const totalWorkoutMinutes = workoutData.reduce((sum, entry) => sum + (entry.durationMinutes || 0), 0);

    // Meals
    const totalCalories = mealData.reduce((sum, meal) => sum + (meal.calories || 0), 0);

    setSummary({
      sleepCount: sleepData.length,
      avgSleepHours: avgSleep,
      workoutCount: workoutData.length,
      totalWorkoutMinutes,
      mealCount: mealData.length,
      totalCalories
    });
  }, []);

  return (
    <div className="App">
      <h2>📊 Progress Summary</h2>
      <ul>
        <li><strong>Sleep Entries:</strong> {summary.sleepCount}</li>
        <li><strong>Average Sleep Hours:</strong> {summary.avgSleepHours}h</li>
        <li><strong>Workout Sessions:</strong> {summary.workoutCount}</li>
        <li><strong>Total Workout Time:</strong> {summary.totalWorkoutMinutes} minutes</li>
        <li><strong>Meals Logged:</strong> {summary.mealCount}</li>
        <li><strong>Total Calories:</strong> {summary.totalCalories} kcal</li>
      </ul>
    </div>
  );
};

export default ProgressSummary;
