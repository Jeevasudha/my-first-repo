const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creationDate: { type: Date, required: true },
  responseCodes: { type: [String], required: true },
  imageLinks: { type: [String], required: true }
});

module.exports = mongoose.model('List', ListSchema);