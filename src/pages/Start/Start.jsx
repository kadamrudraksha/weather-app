import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Start.css';
import assets from '../../assets/assets';

const Start = () => {
  const navigate = useNavigate();  // Get the navigate function

  const handleStartClick = () => {
    navigate('/login');  // Navigate to the /login page
  };

  return (
    <section className="start-section">
      <div className="start">
        <img src={assets.start} className="gif" alt="Weather prediction animation" />
        <div className="text">
          <h3>CLOUD</h3>
          <h1>Find your weather predictions in your city.</h1>
          <p>Easy steps to predict the weather.</p>
        </div>
        <button onClick={handleStartClick} >
          Start Now
        </button>
      </div>
    </section>
  );
};

export default Start;
