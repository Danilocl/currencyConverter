const express = require('express');
const axios = require('axios');
require('dotenv').config();
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname);

app.use(express.static(publicDirectoryPath));

app.use(cors({
    origin: 'http://localhost:8080', // Ajuste a origem conforme necessário
    methods: ['GET', 'PUT', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
}));

app.get('/convert', async (req, res) => {
    const { fromCurrency, toCurrency, amount } = req.query;
    const apiUrl = `${process.env.API_URL}/convert?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}&amount=${amount}`;    
    try {
        const response = await axios.get(apiUrl);        
        res.json(response.data); // Use response.data para enviar apenas os dados da resposta
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
