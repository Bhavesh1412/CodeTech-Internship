const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  authors: {
    type: [String],
    default: []
  },
  isbn: {
    type: String,
    trim: true,
    index: true,
    unique: false
  },
  description: {
    type: String
  },
  genres: {
    type: [String],
    default: []
  },
  publishedDate: {
    type: Date
  },
  pages: {
    type: Number
  },
  copiesAvailable: {
    type: Number,
    default: 1,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Book', bookSchema);
