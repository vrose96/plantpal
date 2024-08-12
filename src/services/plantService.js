import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

// Trefle API constants
const API_URL = 'https://trefle.io/api/v1/plants';
const API_KEY = 'n1G1WCpmpGinxgwa_YEuq4Mtr-adpG9m0pQ22oJM5Zg';
const PROXY_URL = 'https://api.allorigins.win/raw?url=';

// Supabase constants
const supabaseUrl = 'https://vhkyoconiayqwtdxickg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoa3lvY29uaWF5cXd0ZHhpY2tnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5OTQzNzUsImV4cCI6MjAzODU3MDM3NX0.erVdi1gxUEiVDqz1ykkR8KWZOzUQQmLOglnNCn12mwo';
const supabase = createClient(supabaseUrl, supabaseKey);

// Supabase function to add a plant to the database
export const addPlantToSupabase = async (plantData) => {
  try {
    const { data, error } = await supabase
      .from('plants')
      .insert([plantData]);
    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error('Error adding plant to Supabase');
  }
};

// Trefle API function to fetch all plants
export const getPlants = async () => {
  try {
    const response = await axios.get(`${PROXY_URL}${encodeURIComponent(`${API_URL}?token=${API_KEY}`)}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching plant list');
  }
};

// Trefle API function to fetch plant details
export const getPlantDetails = async (id) => {
    try {
      const response = await axios.get(`${PROXY_URL}${encodeURIComponent(`${API_URL}/${id}?token=${API_KEY}`)}`);
      return response.data; // Ensure this is returning the correct data structure
    } catch (error) {
      throw new Error('Error fetching plant details');
    }
  };
  

// (Optional) Trefle API function to add a plant directly to Trefle (if needed)
export const addPlantToTrefle = async (plantData) => {
  try {
    const response = await axios.post(`${PROXY_URL}${API_URL}`, plantData, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error adding plant to Trefle');
  }
};
