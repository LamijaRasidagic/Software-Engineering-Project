import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/image7.jpg'; 

const Sleep = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');
  const [quality, setQuality] = useState('');
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('ems_logged_in');
    if (!isLoggedIn) {
      navigate('/');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    setDate(today);

    const stored = JSON.parse(localStorage.getItem('ems_sleep')) || [];
    setRecords(stored);
  }, [navigate]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!date || !hours) return;

    const newRecord = {
      id: Date.now(),
      date,
      hours: parseFloat(hours),
      quality: quality || 'N/A'
    };

    const updated = [...records, newRecord];
    setRecords(updated);
    localStorage.setItem('ems_sleep', JSON.stringify(updated));

    setHours('');
    setQuality('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleDelete = (id) => {
    const updated = records.filter((r) => r.id !== id);
    setRecords(updated);
    localStorage.setItem('ems_sleep', JSON.stringify(updated));
  };

  return (
    <div style={wrapperStyle}>
      <div style={overlayStyle}></div>

      <div style={contentWrapper}>
        <div style={formWrapper}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>😴 Sleep Tracker</h2>
          <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={inputStyle}
            />
            <input
              type="number"
              placeholder="Hours slept"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              style={inputStyle}
            />
            <input
              type="number"
              placeholder="Sleep quality (1–5)"
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              min="1"
              max="5"
              style={inputStyle}
            />
            <button type="submit" style={buttonStyleBlue}>Add Sleep Record</button>
          </form>
        </div>

        <h3 style={{ textAlign: 'center', margin: '3rem 0 1rem', color: 'white' }}>
          Saved Sleep Records
        </h3>

        <div style={gridStyle}>
          {records.map((r) => (
            <div key={r.id} style={cardStyle}>
              <h4>🛏 {r.date}</h4>
              <p><strong>Hours:</strong> {r.hours} h</p>
              <p><strong>Quality:</strong> {r.quality}/5</p>
              <button onClick={() => handleDelete(r.id)} style={deleteStyle}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Styles
const wrapperStyle = {
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  position: 'relative',
  overflow: 'hidden'
};

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // crni overlay
  backdropFilter: 'blur(3px)',
  zIndex: 0
};

const contentWrapper = {
  position: 'relative',
  zIndex: 1,
  padding: '3rem 1rem'
};

const formWrapper = {
  maxWidth: '460px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  padding: '2rem',
  borderRadius: '10px',
  margin: '0 auto',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  boxSizing: 'border-box'
};

const buttonStyleBlue = {
  padding: '12px',
  width: '100%',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#3b82f6',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const gridStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '1.5rem',
  padding: '0 1rem 4rem'
};

const cardStyle = {
  backgroundColor: '#f3f4f6',
  borderRadius: '12px',
  padding: '1rem 1.5rem',
  textAlign: 'left',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  fontSize: '0.95rem',
  maxWidth: '500px',
  width: '100%'
};

const deleteStyle = {
  marginTop: '1rem',
  backgroundColor: '#dc2626',
  color: 'white',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '6px',
  cursor: 'pointer'
};

export default Sleep;
