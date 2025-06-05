import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import image3 from '../assets/image4.jpg';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', dob: '', weight: '', goal: 'lose',
    targetWeight: '', experience: 'beginner',
    email: '', password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, dob, weight, goal, targetWeight, experience, email, password } = formData;

    if (!name || !dob || !weight || !targetWeight || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('ems_users')) || [];
    const emailExists = users.some((u) => u.email === email);
    if (emailExists) {
      setError('An account with this email already exists.');
      return;
    }

    const user = { name, dob, weight, goal, targetWeight, experience, email, password };
    const updatedUsers = [...users, user];
    localStorage.setItem('ems_users', JSON.stringify(updatedUsers));
    localStorage.setItem('ems_logged_in', 'true');
    localStorage.setItem('ems_logged_in_email', email);

    alert('Signup successful! Please log in.');
    navigate('/login');
  };

  return (
    <div className="login-fullscreen-wrapper">
      <div className="login-background-image" style={{ backgroundImage: `url(${image3})` }}>
  <div className="login-dark-overlay"></div>
</div>

      

      <div className="login-content-overlay">
        <div className="login-form-container">
          <h2 className="login-title">Sign Up</h2>
          {error && <p className="login-error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              className="login-input"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              className="login-input"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            <input
              className="login-input"
              type="number"
              name="weight"
              placeholder="Current Weight (kg)"
              value={formData.weight}
              onChange={handleChange}
            />
            <select
              className="login-input"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
            >
              <option value="lose">Lose Weight</option>
              <option value="gain">Gain Weight</option>
            </select>
            <input
              className="login-input"
              type="number"
              name="targetWeight"
              placeholder="Target Weight (kg)"
              value={formData.targetWeight}
              onChange={handleChange}
            />
            <select
              className="login-input"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            >
              <option value="beginner">Beginner</option>
              <option value="advanced">Advanced</option>
            </select>
            <input
              className="login-input"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className="login-input"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit" className="login-button">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
