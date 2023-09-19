import React from "react";
import { NavLink } from "react-router-dom";
function WeatherSearch({ location, onLocationChange, onSearchSubmit }) {
  return (
  <div>
    <nav className="navbar navbar-expand-sm navbar-dark custom-bg fixed-top">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/" exact className="nav-link" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/comments"
              className="nav-link"
              activeClassName="active"
            >
              Comment Section
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/forecast"
              className="nav-link"
              activeClassName="active"
            >
              Weather Forecast
            </NavLink>
          </li>
        </ul>
        <form onSubmit={onSearchSubmit} className="d-flex">
          <input
            className="form-control me-2"
            type="text"
            placeholder="Search a location"
            value={location}
            onChange={onLocationChange}
          />
          <button className="btn custom-btn" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
    
    {/* <div class="footer">
      <p>WeatherApp@2023</p>
    </div> */}
  </div>
  );
}

export default WeatherSearch;
