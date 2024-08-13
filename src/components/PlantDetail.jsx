import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlantDetails } from '../services/plantService';
import './PlantDetail.css'; 

const PlantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPlant = async () => {
      try {
        const plantData = await getPlantDetails(id);
        console.log('Fetched Plant Data:', plantData);
        setPlant(plantData.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getPlant();
  }, [id]);

  if (loading) return <p>Loading plant details...</p>;
  if (error) return <p>Error fetching plant details: {error}</p>;
  if (!plant) return <p>No plant found</p>;

  console.log('Plant:', plant);

  const {
    common_name,
    scientific_name,
    image_url,
    observations,
    care_instructions // Assuming this might be nested or need adjustment
  } = plant;

  const familyName = plant.family?.name || 'Unknown Family';
  const genusName = plant.genus?.name || 'Unknown Genus';

  return (
    <div className="plant-detail-container">
      <div className="plant-detail-box">
        <button className="back-button" onClick={() => navigate('/')}>Back</button>
        <h1 className="plant-detail-title">{common_name || scientific_name}</h1>
        {image_url && <img src={image_url} alt={common_name || scientific_name} className="plant-detail-image" />}
        <p><strong>Scientific Name:</strong> {scientific_name}</p>
        <p><strong>Family:</strong> {familyName}</p>
        <p><strong>Genus:</strong> {genusName}</p>
        <p><strong>Care Instructions:</strong> {care_instructions || 'No specific care instructions available.'}</p>
        <p><strong>Observations:</strong> {observations || 'No observations available.'}</p>
      </div>
    </div>
  );
};

export default PlantDetail;