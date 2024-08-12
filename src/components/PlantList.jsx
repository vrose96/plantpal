import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPlants } from '../services/plantService';
import './PlantList.css';
import logo from '../assets/plantpal_logo.png';

const PlantList = () => {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPlants()
      .then(data => setPlants(data.data))
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="page-container">
      <header className="header">
        <div className="header-content">
          <div className="logo-container">
            <img src={logo} alt="PlantPal Logo" className="logo" />
          </div>
          <h1 className="header-title">Your Plant Best Friend</h1>
          <div className="button-container">
            <Link to="/add-plant" className="add-plant-button">
              Add New Plant
            </Link>
          </div>
        </div>
      </header>
      <div className="plant-list-container">
        <div className="plant-list-box">
          <div className="plant-grid">
            {plants.map(plant => (
              <div key={plant.id} className="plant-item">
                <img src={plant.image_url} alt={plant.common_name} />
                <p>{plant.common_name}</p>
                <Link to={`/plant/${plant.id}`}>
                  <button>View Details</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantList;
