const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 50142;

// MongoDB connection
mongoose.connect('mongodb+srv://Jeevasudha:Sudha1703@cluster0.xgepw0r.mongodb.net/mydatabase');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(cors());

// Example endpoint for fetching a dog image based on a code
app.get('/api/dogImage/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const response = await axios.get('https://http.dog/${code}.jpg');
    res.json({ imageLink: response.config.url });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch dog image' });
  }
});

// Example endpoint for fetching a random number
app.get('/api/randomNumber', (req, res) => {
  const randomNumber = Math.floor(Math.random() * 100); // Generate a random number between 0 and 99
  res.json({ randomNumber });
});

// Example POST endpoint that echoes back the message sent in the request body
app.post('/api/echo', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }
  res.json({ echoedMessage: message });
});
app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/auth')); 
app.use('/users', require('./routes/user')); 

// Start server
app.listen(PORT, () => {
  console.log('Server running on port ${PORT}');
});