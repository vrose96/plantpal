// src/components/FavoritePlants.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PlantList.css';

const FavoritePlants = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (plantId) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== plantId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="page-container">
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">Your Favorite Plants</h1>
          <div className="button-container">
            <Link to="/" className="add-plant-button">Back to Plant List</Link>
          </div>
        </div>
      </header>
      <div className="plant-list-container">
        <div className="plant-grid">
          {favorites.map(plant => (
            <div key={plant.id} className="plant-item">
              <img src={plant.image_url} alt={plant.common_name} />
              <p>{plant.common_name}</p>
              <button onClick={() => removeFavorite(plant.id)}>Remove from Favorites</button>
              <Link to={`/plant/${plant.id}`}>
                <button>View Details</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritePlants;