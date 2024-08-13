import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPlantToSupabase } from '../services/plantService';
import './AddPlantForm.css';

const AddPlantForm = () => {
  const [commonName, setCommonName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const plantData = {
      common_name: commonName,
      scientific_name: scientificName,
      image_url: imageUrl,
      description,
    };

    try {
      await addPlantToSupabase(plantData);
      setConfirmationMessage('Your plant has been added!');
      setCommonName('');
      setScientificName('');
      setImageUrl('');
      setDescription('');
      setTimeout(() => setConfirmationMessage(''), 3000); // Hide message after 3 seconds
    } catch (error) {
      console.error('Error adding plant:', error);
    }
  };

  return (
    <div className="add-plant-container">
      <button className="back-button" onClick={() => navigate('/')}>Back</button>
      <div className="plant-form-box">
        <h2>Add a New Plant</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Common Name:</label>
            <input type="text" value={commonName} onChange={(e) => setCommonName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Scientific Name:</label>
            <input type="text" value={scientificName} onChange={(e) => setScientificName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Image URL:</label>
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <button type="submit">Add Plant</button>
          {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddPlantForm;