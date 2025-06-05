import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [notifications, setNotifications] = useState(false);
  const navigate = useNavigate();

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
      const notifs = localStorage.getItem(`ems_notify_${email}`);
      if (notifs !== null) {
        setNotifications(notifs === 'true');
      }
    }

    const storedImage = localStorage.getItem('ems_user_image');
    if (storedImage) setImage(storedImage);
  }, [navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setImage(base64);
      localStorage.setItem('ems_user_image', base64);
    };
    reader.readAsDataURL(file);
  };

  const toggleNotifications = () => {
    const email = localStorage.getItem('ems_logged_in_email');
    const newValue = !notifications;
    setNotifications(newValue);
    localStorage.setItem(`ems_notify_${email}`, newValue.toString());
  };

  if (!user) return <p style={{ textAlign: 'center' }}>Loading profile...</p>;

  return (
    <div style={container}>
      <div style={header}>
        {image ? (
          <img src={image} alt="Profile" style={profileImage} />
        ) : (
          <div style={placeholderImage} />
        )}
        <h2 style={{ marginTop: '1rem', color: 'white' }}>{user.name}</h2>

        <label htmlFor="profileUpload" style={uploadLabel}>
          Set Profile Picture
        </label>
        <input
          id="profileUpload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </div>

      <div style={contentWrapper}>
        <Section title="Account">
          <Row icon="👤" label="Edit Profile" link="/edit-profile" />
          <Row icon="🔔" label="Notifications" toggle checked={notifications} onToggle={toggleNotifications} />
        </Section>

        <Section title="Health & Fitness">
          <Row icon="📈" label="Current Status" link="/status" />
        </Section>

        <Section title="Settings">
          <Row icon="🔒" label="Privacy" link="/privacy" />
        </Section>

        <Section title="Achievements">
          <Row icon="🏆" label="Milestones" link="/milestones" />
          <Row icon="📅" label="Progress Summary" link="/summary" />
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '2rem', width: '100%' }}>
    <h3 style={{ fontSize: '1rem', color: '#4b5563', marginBottom: '0.5rem' }}>{title}</h3>
    <div style={cardStyle}>{children}</div>
  </div>
);

const Row = ({ icon, label, toggle, link, checked = false, onToggle }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) navigate(link);
  };

  return (
    <div style={rowStyle} onClick={toggle ? null : handleClick}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '1.2rem' }}>{icon}</span>
        <span>{label}</span>
      </div>
      {toggle ? (
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            e.stopPropagation();
            onToggle && onToggle();
          }}
        />
      ) : (
        <span style={{ color: '#9ca3af' }}>{'>'}</span>
      )}
    </div>
  );
};

// Styles
const container = {
  maxWidth: '960px',
  margin: '0 auto',
  padding: '1rem'
};

const header = {
  backgroundColor: '#3b82f6',
  padding: '2rem 1rem',
  textAlign: 'center',
  borderRadius: '12px',
  marginBottom: '2rem',
  color: 'white'
};

const profileImage = {
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '3px solid white'
};

const placeholderImage = {
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  backgroundColor: '#e5e7eb',
  display: 'inline-block'
};

const uploadLabel = {
  display: 'inline-block',
  marginTop: '1rem',
  padding: '10px 16px',
  backgroundColor: '#2563eb',
  color: 'white',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '0.9rem'
};

const contentWrapper = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const cardStyle = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  overflow: 'hidden'
};

const rowStyle = {
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #e5e7eb',
  cursor: 'pointer'
};

export default Profile;
