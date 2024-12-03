const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type:String,
      required: true,
      unique: true,
    },
    movies: {
      type: [Number],
      default: [],
    },
    shows: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true }
);

// Check if the model already exists before defining it
module.exports = mongoose.models.Favorite || mongoose.model('Favorite', favoriteSchema);
