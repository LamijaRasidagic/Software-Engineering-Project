import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CurrentStatus = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [note, setNote] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('ems_logged_in');
    if (!isLoggedIn) {
      navigate('/');
      return;
    }

    const users = JSON.parse(localStorage.getItem('ems_users')) || [];
    const email = localStorage.getItem('ems_logged_in_email');
    const activeUser = users.find((u) => u.email === email);

    if (activeUser) {
      setUser(activeUser);
    }

    const notes = JSON.parse(localStorage.getItem(`ems_notes_${email}`)) || [];
    setSavedNotes(notes);
  }, [navigate]);

  const handleSaveNote = () => {
    if (!note.trim()) return;

    const date = new Date().toLocaleDateString();
    const newNote = { text: note.trim(), date };
    const updatedNotes = [...savedNotes, newNote];

    const email = localStorage.getItem('ems_logged_in_email');
    localStorage.setItem(`ems_notes_${email}`, JSON.stringify(updatedNotes));
    setSavedNotes(updatedNotes);
    setNote('');
  };

  const handleDeleteNote = (index) => {
    const email = localStorage.getItem('ems_logged_in_email');
    const updatedNotes = savedNotes.filter((_, i) => i !== index);
    localStorage.setItem(`ems_notes_${email}`, JSON.stringify(updatedNotes));
    setSavedNotes(updatedNotes);
  };

  const handleEditNote = (index) => {
    setNote(savedNotes[index].text);
    handleDeleteNote(index);
  };

  if (!user) return <p style={{ textAlign: 'center', color: 'white' }}>Loading...</p>;

  return (
    <div style={{ ...wrapper, backgroundColor: '#00aaff', color: 'white' }}>
      <div style={container}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>📈 Current Status</h2>
        <div style={card}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Date of Birth:</strong> {user.dob}</p>
          <p><strong>Weight:</strong> {user.weight} kg</p>
          <p><strong>Goal:</strong> {user.goal}</p>
          <p><strong>Target Weight:</strong> {user.targetWeight} kg</p>
          <p><strong>Experience:</strong> {user.experience}</p>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>📝 My Daily Notes</h3>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={6}
            style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #ccc', color: 'black' }}
          />
          <button onClick={handleSaveNote} style={saveButton}>Save Note</button>

          {savedNotes.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <h4>🗂 Saved Notes</h4>
              {savedNotes.map((n, index) => (
                <div key={index} style={noteBox}>
                  <p style={{ marginBottom: '0.5rem' }}><strong>{n.date}</strong></p>
                  <p style={{ marginBottom: '0.5rem' }}>{n.text}</p>
                  <button onClick={() => handleEditNote(index)} style={editButton}>Edit</button>
                  <button onClick={() => handleDeleteNote(index)} style={deleteButton}>Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const wrapper = {
  minHeight: '100vh',
  paddingTop: '3rem',
  paddingBottom: '3rem'
};

const container = {
  maxWidth: '700px',
  margin: '0 auto',
  padding: '2rem'
};

const card = {
  backgroundColor: '#f3f4f6',
  padding: '1.5rem',
  borderRadius: '12px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  color: 'black'
};

const saveButton = {
  marginTop: '1rem',
  backgroundColor: '#2563eb',
  color: 'white',
  padding: '10px 16px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

const editButton = {
  marginRight: '0.5rem',
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '6px',
  cursor: 'pointer'
};

const deleteButton = {
  backgroundColor: '#ef4444',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '6px',
  cursor: 'pointer'
};

const noteBox = {
  backgroundColor: '#fff',
  padding: '1rem',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
  marginBottom: '1rem',
  color: 'black'
};

export default CurrentStatus;
