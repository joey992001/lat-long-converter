require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Define Schema and Model
const coordSchema = new mongoose.Schema({
    latitude: String,
    longitude: String,
    convertedCoords: String
});
const Coordinate = mongoose.model('Coordinate', coordSchema);

// API to Save Coordinates
app.post('/api/save-coords', async (req, res) => {
    const { latitude, longitude, convertedCoords } = req.body;
    try {
        const newCoord = new Coordinate({ latitude, longitude, convertedCoords });
        await newCoord.save();
        res.json({ message: 'Coordinates saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving coordinates' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
