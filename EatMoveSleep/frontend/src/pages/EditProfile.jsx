import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    weight: '',
    goal: '',
    targetWeight: '',
    experience: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('ems_logged_in') === 'true';
    const email = localStorage.getItem('ems_logged_in_email');
    if (!isLoggedIn || !email) {
      alert('You must be logged in to edit your profile.');
      navigate('/login');
      return;
    }

    const allUsers = JSON.parse(localStorage.getItem('ems_users')) || [];
    const currentUser = allUsers.find((u) => u.email === email);
    if (currentUser) setFormData(currentUser);
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    const email = localStorage.getItem('ems_logged_in_email');
    const allUsers = JSON.parse(localStorage.getItem('ems_users')) || [];
    const updatedUsers = allUsers.map((u) =>
      u.email === email ? { ...formData } : u
    );
    localStorage.setItem('ems_users', JSON.stringify(updatedUsers));
    localStorage.setItem('ems_logged_in_email', formData.email);
    alert('Profile updated successfully!');
    navigate('/profile');
  };

  return (
    <div style={{ ...wrapper, backgroundColor: '#00aaff' }}>
      <div style={container}>
        <h2>Edit Profile</h2>
        <div style={form}>
          {[
            { label: 'Full Name', name: 'name', type: 'text' },
            { label: 'Date of Birth', name: 'dob', type: 'date' },
            { label: 'Current Weight (kg)', name: 'weight', type: 'number' },
            { label: 'Goal (lose/gain)', name: 'goal', type: 'text' },
            { label: 'Target Weight (kg)', name: 'targetWeight', type: 'number' },
            { label: 'Experience (beginner/advanced)', name: 'experience', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Password', name: 'password', type: 'password' }
          ].map(({ label, name, type }) => (
            <div key={name} style={field}>
              <label style={labelStyle}>{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                style={input}
              />
            </div>
          ))}

          <button onClick={handleSave} style={button}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

// Styles
const wrapper = {
  minHeight: '100vh',
  paddingTop: '3rem',
  paddingBottom: '3rem'
};

const container = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '2rem',
  border: '1px solid #ccc',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  backgroundColor: '#fff'
};

const form = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const field = {
  display: 'flex',
  flexDirection: 'column'
};

const labelStyle = {
  marginBottom: '4px',
  fontWeight: 'bold'
};

const input = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc'
};

const button = {
  marginTop: '1rem',
  padding: '12px',
  backgroundColor: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

export default EditProfile;
