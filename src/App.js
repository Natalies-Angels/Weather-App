import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route

import CommentSection from './Comment';
import WeatherSearch from './SearchKey';
import WeatherForecast from './Forecast';
import DateTime from './TimeAndDate';
import CurrentWeather from './CurrentWeather';

function App() {
  return (
    <Router>
      <div className="App">
        <WeatherSearch /> 
        <DateTime />
        
        <Routes>
          <Route path="/" element={<CurrentWeather />} />
          <Route path="/forecast" element={<WeatherForecast />} />
          <Route path="/comments" element={<CommentSection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
