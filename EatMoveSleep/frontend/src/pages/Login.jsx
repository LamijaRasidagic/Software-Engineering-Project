import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import image3 from '../assets/image3.jpg';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    const users = JSON.parse(localStorage.getItem('ems_users')) || [];
    const matchedUser = users.find((u) => u.email === email && u.password === password);

    if (matchedUser) {
      localStorage.setItem('ems_logged_in', 'true');
      localStorage.setItem('ems_logged_in_email', matchedUser.email);
      navigate('/dashboard');
      alert(`Welcome back, ${matchedUser.name}!`);
    } else {
      setError('Incorrect email or password.');
    }
  };

  return (
    <div className="login-fullscreen-wrapper">
      <div className="login-background-image" style={{ backgroundImage: `url(${image3})` }}>
        <div className="login-dark-overlay"></div>
      </div>

      <div className="login-content-overlay">
        <div className="login-form-container">
          <p className="login-welcome">Welcome back !!!</p>
          <h2 className="login-title">Log In</h2>

          {error && <p className="login-error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              className="login-input"
              type="email"
              placeholder="login@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label style={{ marginTop: '1rem' }}>Password</label>
            <input
              className="login-input"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="login-button">LOGIN →</button>
          </form>

          <p className="signup-text">
            Don’t have an account yet?{' '}
            <span className="signup-link" onClick={() => navigate('/signup')}>
              Sign up for free
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
