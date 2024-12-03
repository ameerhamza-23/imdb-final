const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Movie = require('./models/Movie'); 

const MONGODB_URI="mongodb+srv://imdb-user:Testpassword123@cluster0.2vmtk.mongodb.net/imdb-clone?retryWrites=true&w=majority&appName=Cluster0"
B
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

async function importMovies() {
  await connectDB();

  try {
    const moviesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'movies.json'), 'utf-8')
    );

    const movies = moviesData.map((movie) => ({
      id: movie.id,
      title: movie.title || 'Unknown Title',
      original_title: movie.original_title || 'Unknown Original Title',
      overview: movie.overview || 'No overview available',
      poster_path: movie.poster_path || null,
      backdrop_path: movie.backdrop_path || null,
      media_type: 'movie',
      genre_ids: movie.genre_ids || [],
      popularity: movie.popularity || 0,
      release_date: movie.release_date || null,
      vote_average: movie.vote_average || 0,
      vote_count: movie.vote_count || 0,
      adult: movie.adult || false,
      original_language: movie.original_language || 'Unknown',
    }));

    await Movie.insertMany(movies);
    console.log('Movies data successfully inserted!');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error reading JSON file or inserting data:', error);
    mongoose.connection.close();
  }
}

importMovies();
