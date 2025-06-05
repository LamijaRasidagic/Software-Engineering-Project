import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import oatmeal from '../assets/oatmeal.jpg';
import chickensalad from '../assets/chickensalad.jpg';
import grilledsalmon from '../assets/grilledsalmon.jpg';
import avocadotoast from '../assets/avocadotoast.jpg';
import turkeysandwich from '../assets/turkeysandwich.jpg';
import pasta from '../assets/pasta.jpg';
import image5 from '../assets/image6.jpg';

const defaultRecipes = [
  { name: 'Oatmeal with banana', calories: 300, category: 'Breakfast', image: oatmeal },
  { name: 'Chicken Salad', calories: 450, category: 'Lunch', image: chickensalad },
  { name: 'Grilled Salmon', calories: 500, category: 'Dinner', image: grilledsalmon },
  { name: 'Avocado Toast', calories: 250, category: 'Breakfast', image: avocadotoast },
  { name: 'Turkey Sandwich', calories: 400, category: 'Lunch', image: turkeysandwich },
  { name: 'Pasta with Tomato Sauce', calories: 600, category: 'Dinner', image: pasta },
];

const Meals = () => {
  const navigate = useNavigate();
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [category, setCategory] = useState('Breakfast');
  const [meals, setMeals] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('ems_logged_in') === 'true';
    const email = localStorage.getItem('ems_logged_in_email');
    if (!isLoggedIn || !email) {
      alert('You must be logged in to access Meals.');
      navigate('/login');
      return;
    }
    setUserEmail(email);

    const allMeals = JSON.parse(localStorage.getItem('ems_meals')) || [];
    const userMeals = allMeals.filter((m) => m.email === email);
    setMeals(userMeals);
  }, [navigate]);

  const handleAddMeal = (e) => {
    e.preventDefault();
    if (!mealName || !calories || !category) return;

    const newMeal = {
      id: Date.now(),
      name: mealName,
      calories: parseInt(calories),
      category,
      image: '',
      email: userEmail,
    };

    const allMeals = JSON.parse(localStorage.getItem('ems_meals')) || [];
    const updatedAllMeals = [...allMeals, newMeal];
    localStorage.setItem('ems_meals', JSON.stringify(updatedAllMeals));

    const userMeals = updatedAllMeals.filter((m) => m.email === userEmail);
    setMeals(userMeals);

    setMealName('');
    setCalories('');
    setCategory('Breakfast');
  };

  const handleLogDefaultRecipe = (recipe) => {
    const newMeal = {
      ...recipe,
      id: Date.now(),
      email: userEmail,
    };

    const allMeals = JSON.parse(localStorage.getItem('ems_meals')) || [];
    const updatedAllMeals = [...allMeals, newMeal];
    localStorage.setItem('ems_meals', JSON.stringify(updatedAllMeals));

    const userMeals = updatedAllMeals.filter((m) => m.email === userEmail);
    setMeals(userMeals);
  };

  const handleDelete = (id) => {
    const allMeals = JSON.parse(localStorage.getItem('ems_meals')) || [];
    const updatedAllMeals = allMeals.filter((m) => m.id !== id);
    localStorage.setItem('ems_meals', JSON.stringify(updatedAllMeals));

    const userMeals = updatedAllMeals.filter((m) => m.email === userEmail);
    setMeals(userMeals);
  };

  return (
    <div style={{
      fontFamily: 'sans-serif',
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0,0,0,0.6)), url(${image5})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      padding: '2rem',
      color: 'white',
      minHeight: '100vh'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>🍽 Create Meal</h2>

      <div style={formContainer}>
        <form style={formStyle}>
          <input type="text" placeholder="Meal name" value={mealName} onChange={(e) => setMealName(e.target.value)} style={inputStyle} />
          <input type="number" placeholder="Calories" value={calories} onChange={(e) => setCalories(e.target.value)} style={inputStyle} />
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
            <option value="Breakfast">🍳 Breakfast</option>
            <option value="Lunch">🥗 Lunch</option>
            <option value="Dinner">🍝 Dinner</option>
          </select>
          <button onClick={handleAddMeal} style={buttonStyleBlue}>Save Meal</button>
        </form>
      </div>

      <h3 style={{ textAlign: 'center', marginTop: '3rem', fontSize: '2rem' }}>🥘 Recipes</h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
        justifyContent: 'center',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {defaultRecipes.map((r, index) => (
          <div key={index} style={{ ...mealCardStyle, backgroundImage: `url(${r.image})` }}>
            <div style={overlay}>
              <div style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>
                <h4 style={{ margin: 0 }}>{r.name}</h4>
                <p style={{ margin: 0 }}>{r.category} · {r.calories} kcal</p>
              </div>
              <div>
                <button
                  onClick={() => handleLogDefaultRecipe(r)}
                  style={{ ...logButtonStyle, transition: 'background-color 0.3s' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#0284c7'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'}
                >
                  + Log
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ textAlign: 'center', marginTop: '3rem', fontSize: '2rem' }}>📋 Your Meals</h3>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem', maxWidth: '700px', marginInline: 'auto' }}>
        {meals.map((meal) => (
          <li key={meal.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#4b5563', color: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <div>
              <strong>🍴 {meal.name}</strong> — {meal.calories} kcal · {meal.category}
            </div>
            <button onClick={() => handleDelete(meal.id)} style={deleteStyle}>Delete</button>
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

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%'
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
  width: '100%',
  padding: '12px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#00aaff',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const mealCardStyle = {
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
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  color: 'white',
  padding: '1rem',
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
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

const deleteStyle = {
  backgroundColor: '#dc2626',
  color: 'white',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '6px',
  cursor: 'pointer'
};

export default Meals;
