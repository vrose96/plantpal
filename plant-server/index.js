const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.use(express.json());

// Endpoint to fetch all plants
app.get('/api/plants', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('plants')
      .select('*');

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to add a new plant
app.post('/api/plants', async (req, res) => {
  const { common_name, scientific_name, image_url, description } = req.body;

  try {
    const { data, error } = await supabase
      .from('plants')
      .insert([{ common_name, scientific_name, image_url, description }]);

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});