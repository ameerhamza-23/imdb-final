// models/Movie.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const movieSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true,},
  title: { type: String },
  original_title: { type: String },
  overview: { type: String },
  poster_path: { type: String, default: null },
  backdrop_path: { type: String, default: null },
  media_type: { type: String, default: 'movie' },
  genre_ids: { type: [Number], default: [] },
  popularity: { type: Number, default: 0 },
  release_date: { type: String, default: null },
  vote_average: { type: Number, default: 0 },
  vote_count: { type: Number, default: 0 },
  adult: { type: Boolean, default: false },
  original_language: { type: String, default: null },
});

module.exports = mongoose.models.Movie || mongoose.model('Movie', movieSchema);
