import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import './Forecast.css';

const WEEK_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const WeatherForecast = () => {
  // State for user-defined location and weather data
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location) {
      setLoading(true);
      const API_KEY = "918153fd1c93463199a62e31461268ac";
      const apiUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${location}&key=${API_KEY}&days=7`;

      axios
        .get(apiUrl)
        .then((response) => {
          setWeatherData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          setLoading(false);
        });
    }
  }, [location]);

  // Function to handle location input change
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="weather-forecast-card">
      <h2>Weather Forecast</h2>
      <input
        className="form-control me-2"
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={handleLocationChange}
      />

      {loading ? (
        <p>Loading...</p>
      ) : weatherData ? (
        <Forecast data={weatherData} />
      ) : null}
    </div>
  );
};

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek).concat(WEEK_DAYS.slice(0, dayInAWeek));

  return (
    <>
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded>
        {data.data.slice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    src={`https://www.weatherbit.io/static/img/icons/${item.weather.icon}.png`}
                    className="icon-small"
                    alt="weather"
                  />
                  <label className="day">{forecastDays[idx]}</label>
                  <label className="description">{item.weather.description}</label>
                  <label className="min-max">{Math.round(item.app_max_temp)}°C / {Math.round(item.app_min_temp)}°C</label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details">
                <div className="daily-details-items">
                  <label>Pressure:</label>
                  <label>{item.pres}</label>
                </div>
                <div className="daily-details-items">
                  <label>Humidity:</label>
                  <label>{item.rh}%</label>
                </div>
                <div className="daily-details-items">
                  <label>Clouds:</label>
                  <label>{item.clouds}%</label>
                </div>
                <div className="daily-details-items">
                  <label>Wind Speed:</label>
                  <label>{item.wind_spd} m/s</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default WeatherForecast;


