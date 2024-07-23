const express = require('express');
const router = express.Router();
const Image = require('../models/Image'); // Assuming 'Image' is your MongoDB model
const List = require('../models/List');
// Route to handle fetching images based on query
router.get('/images', async (req, res) => {
  const query = req.query.q; // Example: '203', '2xx', '20x', '3xx', etc.
  '^${query.replace(/x/g, '%d,')}$'; 
  // Convert '2xx' to /^2\d\d$/
  const regex = new RegExp(regexString);

  try {
    const images = await Image.find({ responseCode: { $regex: regex } });
    res.json({ images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to handle saving a list of images
router.post('/lists', async (req, res) => {
  const { name, creationDate, responseCodes, imageLinks } = req.body;

  try {
    // Save the list to MongoDB or any other storage
    // Assuming 'List' is a model that stores lists of images
    const newList = await List.create({
      name,
      creationDate,
      responseCodes,
      imageLinks,
    });

    res.json({ savedList: newList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save list.' });
  }
});

module.exports = router;