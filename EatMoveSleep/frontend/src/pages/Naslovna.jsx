import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import heroImage from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Naslovna = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <Header />

      <section
        className="hero-section"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay">
          <h1 className="hero-title">
            Your Health, Your Rules.<br />
            Track, <span className="highlight">Improve</span>, And Thrive.
          </h1>
          <p className="hero-subtitle">
            Eat, Move, Sleep—track your wellness privately and <span className="underline-accent">effortlessly</span>.
          </p>
          <button className="get-started-btn" onClick={() => navigate('/signup')}>
            Get Started
          </button>
        </div>
      </section>

      <section className="info-section">
        <h2 className="info-title">Set Goals. Log Workouts. Stay on Track.</h2>
        <p className="info-desc">
          Easily track your workouts, set training plans, and discover new routines to crush your goals.
        </p>
        <div className="info-blocks">
          <div className="block">
            🏃‍♀️ <strong>240</strong><br />Workouts Logged
          </div>
          <div className="block">
            🍽️ <strong>180</strong><br />Meals Tracked
          </div>
          <div className="block">
            😴 <strong>940</strong><br />Sleep Sessions
          </div>
        </div>
      </section>

      <section className="feature-section">
        <div className="feature-text">
          <h2 className="feature-title">
            SET GOALS.<br />
            LOG WORKOUTS.<br />
            STAY ON TRACK.
          </h2>
          <p className="feature-desc">
            Easily track your Workouts, set Training Plans, and discover new Workout Routines to crush your goals.
          </p>
          <button className="feature-btn" onClick={() => navigate('/signup')}>GET STARTED</button>
        </div>
        <div className="feature-image">
          <img src={image2} alt="Workout Motivation" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Naslovna;
