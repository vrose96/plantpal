import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPlants } from '../services/plantService';
import './PlantList.css';
import logo from '../assets/plantpal_logo.png';

const PlantList = () => {
  const [plants, setPlants] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [searchResults, setSearchResults] = useState([]); 
  const [error, setError] = useState(null);

  useEffect(() => {
    getPlants()
      .then(data => setPlants(data.data))
      .catch(err => setError(err.message));
  }, []);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (plant) => {
    if (favorites.some(fav => fav.id === plant.id)) {
      setFavorites(favorites.filter(fav => fav.id !== plant.id));
    } else {
      setFavorites([...favorites, plant]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`http://localhost:5001/api/search?query=${searchQuery}`);
        const data = await response.json();
        console.log('Search Results:', data); // Log the data
        setSearchResults(data.data); // Ensure this matches the data structure
    } catch (err) {
        setError('Error fetching search results');
    }
};

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
            <Link to="/add-plant" className="add-plant-button">Add New Plant</Link>
            <Link to="/favorites" className="favorite-plant-button">View Favorites</Link>
          </div>
        </div>
      </header>
      <form onSubmit={handleSearch}> {/* Search Form */}
        <input 
          type="text" 
          placeholder="Search for a plant..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="plant-list-container">
        <div className="plant-grid">
          {Array.isArray(searchResults) && searchResults.length > 0 ? (
            searchResults.map(plant => (
              <div key={plant.id} className="plant-item">
                <img src={plant.image_url} alt={plant.common_name} />
                <p>{plant.common_name}</p>
                <Link to={`/plant/${plant.id}`}>
                  <button>View Details</button>
                </Link>
                <button
                  className="favorite-button"
                  onClick={() => toggleFavorite(plant)}
                >
                  {favorites.some(fav => fav.id === plant.id) ? 'Unfavorite' : 'Favorite'}
                </button>
              </div>
            ))
          ) : (
            plants.map(plant => (
              <div key={plant.id} className="plant-item">
                <img src={plant.image_url} alt={plant.common_name} />
                <p>{plant.common_name}</p>
                <Link to={`/plant/${plant.id}`}>
                  <button>View Details</button>
                </Link>
                <button
                  className="favorite-button"
                  onClick={() => toggleFavorite(plant)}
                >
                  {favorites.some(fav => fav.id === plant.id) ? 'Unfavorite' : 'Favorite'}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantList;
