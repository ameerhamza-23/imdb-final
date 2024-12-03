// models/TVShow.js
const mongoose = require('mongoose');

const tvShowSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String },
  original_name: { type: String },
  overview: { type: String },
  poster_path: { type: String, default: null },
  backdrop_path: { type: String, default: null },
  media_type: { type: String, default: 'tv' },
  genre_ids: { type: [Number], default: [] },
  popularity: { type: Number, default: 0 },
  first_air_date: { type: String, default: null },
  vote_average: { type: Number, default: 0 },
  vote_count: { type: Number, default: 0 },
  adult: { type: Boolean, default: false },
  original_language: { type: String, default: null },
  origin_country: { type: [String], default: [] },
});

module.exports = mongoose.models.TVShow || mongoose.model('TVShow', tvShowSchema);
