import React, { useEffect, useState } from "react";
import './index.css';
import WeatherSearch from "./SearchKey"; // Import the WeatherSearch component

function CurrentWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");

  function handleLocationChange(event) {
    setLocation(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Fetch weather data for the entered location
    const apiKey = 'e1d8300996f740bdb8222874f573feba';
    const apiUrl = `http://api.weatherbit.io/v2.0/current?key=${apiKey}&city=${location}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setWeatherData(data))
      .catch((error) => console.error("Error fetching weather data: ", error));

    // Clear the form input
    setLocation("");
  }

  useEffect(() => {
    // Define your default location here
    const defaultLocation = "Nairobi";

    // Fetch weather data for the default location
    const apiKey = 'e1d8300996f740bdb8222874f573feba';
    const apiUrl = `http://api.weatherbit.io/v2.0/current?key=${apiKey}&city=${defaultLocation}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setWeatherData(data))
      .catch((error) => console.error("Error fetching weather data: ", error));
  }, []);

  if (!weatherData) {
    return (
      <div className="container" style={{ paddingTop: '100px' }}>
        <div className="alert alert-info mt-4" >Loading...</div>
      </div>
    );
  }

  if (!weatherData.data || weatherData.data.length === 0) {
    return (
      <div className="container">
        <div className="alert alert-warning mt-4">Weather data is not available.</div>
      </div>
    );
  }

  const currentWeather = weatherData.data[0];

  return (
    <div className="container mt-4">
      <WeatherSearch
        location={location}
        onLocationChange={handleLocationChange}
        onSearchSubmit={handleSubmit}
      />

      <div className="card custom-card mb-4">
        <div className="card-body">
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <h1>{currentWeather.city_name}</h1>
                <p className="temp">
                  {currentWeather.temp}°C
                </p>
              </div>
            </div>
          </div>

          <div className="card inner-card custom-inner-card mt-4">
            <div className="card-body">
              <div className="row">
                <div className="col text-center">
                  <p className="card-text label" style={{ fontSize: '24px' }}>
                    <span><i className="fas fa-cloud"></i></span>
                    Weather
                  </p>
                  <p className="card-text">
                    {currentWeather.weather.description}
                  </p>
                </div>
                <div className="col text-center">
                  <p className="card-text label" style={{ fontSize: '24px' }}>
                    <span><i className="fas fa-wind"></i></span>
                    Wind Speed
                  </p>
                  <p className="card-text">
                    {currentWeather.wind_spd} m/s
                  </p>
                </div>
                <div className="col text-center">
                  <p className="card-text label" style={{ fontSize: '24px' }}>
                    <span><i className="fas fa-arrow-right"></i></span>
                    Wind Direction
                  </p>
                  <p className="card-text">
                    {currentWeather.wind_cdir}
                  </p>
                </div>
                <div className="col text-center">
                  <p className="card-text label" style={{ fontSize: '24px' }}>
                    <span><i className="fas fa-tachometer-alt"></i></span>
                    Air Pressure
                  </p>
                  <p className="card-text">
                    {currentWeather.pres}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;