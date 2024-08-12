import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PlantList from './components/PlantList';
import PlantDetail from './components/PlantDetail';
import AddPlantForm from './components/AddPlantForm';

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<PlantList />} />
        <Route path="/plant/:id" element={<PlantDetail />} />
        <Route path="/add-plant" element={<AddPlantForm />} />
      </Routes>
    </div>
  );
};

export default App;
