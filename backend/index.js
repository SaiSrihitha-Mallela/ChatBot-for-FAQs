let express = require('express');
let app = express();
const allroutes = require('./allroutes')
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use("/api", allroutes);  // Route to handle all routes defined in allroutes.js

// The root route should be `/api` as per the structure in allroutes.js, but it's okay to keep a default root.
app.use("/", async (req, res) => {
    res.send("Welcome to KMIT");
});

// Connect to the database
let db = async () => {
    try {
        await mongoose.connect(process.env.DBURI);
        console.log("Connected to the database");
    } catch (err) {
        console.log("Error connecting to the database", err.message);
    }
};
db();

// Start the Express server
app.listen(5000, () => {
    console.log("Backend is running at http://localhost:5000");
});
