const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const API_URL = 'https://trefle.io/api/v1/plants';
const API_KEY = 'n1G1WCpmpGinxgwa_YEuq4Mtr-adpG9m0pQ22oJM5Zg';

// Endpoint to search plants by common name
app.get('/api/search', async (req, res) => {
    const { query } = req.query;

    console.log(`Received search query: ${query}`); // Log the search query

    try {
        const response = await axios.get(`${API_URL}`, {
            params: {
                token: API_KEY,
                filter: {
                    common_name: query,
                },
            },
        });

        // Log the full response object for deeper inspection
        console.log('Trefle API Response:', response.data);

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from Trefle API:', error.response?.data || error.message);
        res.status(500).json({ error: 'Error fetching data from Trefle API' });
    }
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
