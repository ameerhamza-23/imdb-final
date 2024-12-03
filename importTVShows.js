const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const TVShow = require('./models/TVShow');

const MONGODB_URI="mongodb+srv://imdb-user:Testpassword123@cluster0.2vmtk.mongodb.net/imdb-clone?retryWrites=true&w=majority&appName=Cluster0"

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

async function importTVShows() {
  await connectDB();

  try {
    const tvShowsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'tvshows.json'), 'utf-8')
    );


    const tvShows = tvShowsData.map((show) => ({
      id: show.id,
      name: show.name || 'Unknown Name',
      original_name: show.original_name || 'Unknown Original Name',
      overview: show.overview || 'No overview available',
      poster_path: show.poster_path || null,
      backdrop_path: show.backdrop_path || null,
      media_type: 'tv',
      genre_ids: show.genre_ids || [],
      popularity: show.popularity || 0,
      first_air_date: show.first_air_date || null,
      vote_average: show.vote_average || 0,
      vote_count: show.vote_count || 0,
      adult: show.adult || false,
      original_language: show.original_language || 'Unknown',
      origin_country: show.origin_country || [],
    }));

    await TVShow.insertMany(tvShows);
    console.log('TV shows data successfully inserted!');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error reading JSON file or inserting data:', error);
    mongoose.connection.close();
  }
}

importTVShows();
