let express = require('express');
const allroutes = express.Router();  // Use Router() for modular routes
const axios = require('axios');
const bodyParser = require('body-parser'); 

// Parse incoming JSON requests
allroutes.use(bodyParser.json());

allroutes.get('/', (req, res) => {
    console.log("Reached root");
    res.send("KMIT chatbot");
});

// Define an API endpoint for RAG pipeline
allroutes.post('/rag', async (req, res) => {
    try {
        const userQuery = req.body.query;
        if (!userQuery) {
            return res.status(400).json({ error: 'Query is required.' });
        }

        // Call the Python RAG service (change URL if needed)
        const pythonServerUrl = 'http://localhost:5000/rag'; // Ensure this URL is correct
        const response = await axios.post(pythonServerUrl, { query: userQuery });

        // Send back the response to the client
        return res.json({ response: response.data.response });
    } catch (error) {
        console.error('Error in RAG pipeline:', error.message);
        return res.status(500).json({ error: 'Something went wrong.' });
    }
});

module.exports = allroutes;
