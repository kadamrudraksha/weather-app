import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import assests from '../../assets/assets';
import { logout as firebaseLogout } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';

const Weather = () => {
  const inputRef = useRef(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const allIcons = {
    "01d": assests.clear,
    "01n": assests.clear,
    "02d": assests.cloud,
    "02n": assests.cloud,
    "03d": assests.cloud,
    "03n": assests.cloud,
    "04d": assests.drizzle,
    "04n": assests.drizzle,
    "09d": assests.rain,
    "09n": assests.rain,
    "10d": assests.rain,
    "10n": assests.rain,
    "13d": assests.snow,
    "13n": assests.snow
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      const icon = allIcons[data.weather[0].icon] || assests.clear;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: data.main.temp,
        location: data.name,
        icon
      });
     
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("Mumbai");
  }, []);

  const handleLogout = async () => {
      await firebaseLogout();
      navigate('/'); // Navigate to the home page after logout
  };

  return (
    <div className="weather">
      <div className="weather-page">
        <div className="nav">
          <h1>CLoUD</h1>
          <button onClick={handleLogout}>Log Out</button>
        </div>
        <div className="nav1">
          <input ref={inputRef} type="search" placeholder="Search.." />
          <img
            src={assests.search}
            alt="Search Icon"
            onClick={() => search(inputRef.current.value)}
          />
        </div>

        {error && <p className="error">{error}</p>}
        {weatherData ? (
          <>
            <img src={weatherData.icon} alt="Weather Icon" className="weather-icon" />
            <p className="Temperature">{weatherData.temperature}°C</p>
            <p className="City">{weatherData.location}</p>
            <div className="weather-data">
              <div className="col">
                <img src={assests.humidity} alt="Humidity Icon" />
                <div>
                  <p>{weatherData.humidity}%</p>
                  <span>Humidity</span>
                </div>
              </div>

              <div className="col">
                <img src={assests.wind} alt="Wind Speed Icon" />
                <div>
                  <p>{weatherData.windSpeed} Km/hr</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Weather;
