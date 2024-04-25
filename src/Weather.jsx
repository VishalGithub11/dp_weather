import React, { useEffect, useState } from 'react';
import WeatherCard from './WeatherCard';
import "./Weather.css"
import Loader from './Loader';
import ErrorComponent from './Error';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchWeatherData = async (url) => {
      setLoading(true);
      setError('');
      setWeatherData(null)
      try {
          const res = await fetch(url);
          if (!res.ok) {
              throw new Error('City not found');   
          }
          const response = await res.json();
          setWeatherData(response);
      } catch (error) {
          setError(error.message);
          setWeatherData(null)
      } finally {
          setLoading(false);
      }
  };

    const searchLocation = () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=046198adc13ed6be0bce316595638053`;
            fetchWeatherData(url);
            setLocation('');
    };

    const handleEnter = (event) =>{
      if (event.key === 'Enter') {
        searchLocation()
      }
    }

    return (
        <div className="weather-app">
            <div className="search">
                <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="Search City"
                    onKeyDown={handleEnter}
                    type="text"
                />
                 <button className="search-button" onClick={searchLocation}>
                    Search
                </button>
            </div>
            {loading && <Loader />}
            {error && <ErrorComponent message={error} />}
            {weatherData?.name && <WeatherCard data={weatherData} />}
        </div>
    );
};

export default Weather;
