import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
  const navigate = useNavigate();
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [message, setMessage] = useState('');

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to delete all your local data?')) {
      localStorage.clear();
      alert('All local data has been deleted.');
      navigate('/');
    }
  };

  const handlePasswordChange = () => {
    const email = localStorage.getItem('ems_logged_in_email');
    const users = JSON.parse(localStorage.getItem('ems_users')) || [];
    const userIndex = users.findIndex((u) => u.email === email);

    if (userIndex === -1) {
      setMessage('User not found.');
      return;
    }

    const user = users[userIndex];

    if (user.password !== currentPass) {
      setMessage('Current password is incorrect.');
      return;
    }

    if (newPass !== confirmPass) {
      setMessage('New passwords do not match.');
      return;
    }

    users[userIndex].password = newPass;
    localStorage.setItem('ems_users', JSON.stringify(users));
    setMessage('Password successfully updated.');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  return (
    <div style={wrapper}>
      <div style={container}>
        <h2>🔒 Privacy Settings</h2>
        <p>This app stores your data locally in your browser.</p>

        <button style={button} onClick={handleClearData}>Delete All My Data</button>

        <hr style={{ margin: '2rem 0' }} />
        <h3>Change Password</h3>

        <div style={formBox}>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPass}
            onChange={(e) => setCurrentPass(e.target.value)}
            style={input}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            style={input}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            style={input}
          />
          <button style={buttonSecondary} onClick={handlePasswordChange}>Update Password</button>
        </div>

        {message && <p style={{ marginTop: '1rem', color: '#ef4444' }}>{message}</p>}
      </div>
    </div>
  );
};

// Background
const wrapper = {
  minHeight: '100vh',
  backgroundColor: '#00aaff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem'
};

// Inner container
const container = {
  width: '100%',
  maxWidth: '600px',
  padding: '2rem',
  backgroundColor: '#f9fafb',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  textAlign: 'center'
};

// Shorter password inputs container
const formBox = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem',
  marginTop: '1rem'
};

// Input fields (shorter)
const input = {
  width: '300px',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  fontSize: '1rem'
};

const button = {
  marginTop: '1rem',
  padding: '10px 20px',
  backgroundColor: '#ef4444',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const buttonSecondary = {
  width: '350px',
  marginTop: '1rem',
  padding: '10px',
  backgroundColor: '#00aaff',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default Privacy;
