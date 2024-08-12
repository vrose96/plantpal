import React, { useEffect, useState } from 'react';
import { getFavoritePlants, getPlantDetails } from '../services/plantService';

const FavoritePlants = ({ user_id }) => {
  const [favoritePlants, setFavoritePlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteEntries = await getFavoritePlants(user_id);
        const plantDetails = await Promise.all(
          favoriteEntries.map(async (fav) => {
            const plant = await getPlantDetails(fav.plant_id);
            return plant;
          })
        );
        setFavoritePlants(plantDetails);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user_id]);

  if (loading) return <p>Loading favorite plants...</p>;
  if (error) return <p>Error loading favorite plants: {error}</p>;

  return (
    <div className="favorite-plants-container">
      <h2>My Favorite Plants</h2>
      {favoritePlants.length === 0 ? (
        <p>You have no favorite plants yet.</p>
      ) : (
        <div className="plant-grid">
          {favoritePlants.map(plant => (
            <div key={plant.id} className="plant-item">
              <img src={plant.image_url} alt={plant.common_name} />
              <p>{plant.common_name}</p>
              <p>{plant.scientific_name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritePlants;
