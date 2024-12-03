import Movie from '../../../models/Movie'
import dbConnect from '../../../lib/dbConnect'
import Genre from '../../../models/Genre'
const { v4: uuidv4 } = require('uuid');

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {

    try {
      const movies = await Movie.find();
      const genreMap = await Genre.find().then((genres) =>
        genres.reduce((map, genre) => {
          map[genre.id] = genre.name;
          return map;
        }, {})
      );

      const moviesWithGenres = movies.map((movie) => ({
        ...movie.toObject(),
        genres: movie.genre_ids.map((id) => genreMap[id] || 'Unknown'),
      }));

      res.status(200).json(moviesWithGenres);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch movies' });
    }

  } else if (req.method === 'POST') {
    try {
      const { title, genres, release_date, vote_average, overview } = req.body;

      const genreDocs = await Genre.find({ name: { $in: genres } });
      const genreIds = genreDocs.map((genre) => genre.id);

      const id = Math.floor(Math.random() * 1e15);
      console.log("id", id)

      const newMovie = new Movie({
        id: id,
        title,
        genre_ids: genreIds,
        release_date,
        vote_average,
        overview,
      });

      await newMovie.save();

      res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
    } catch (error) {
      console.log(error.message)  
      res.status(500).json({ error: 'Failed to create movie', details: error.message });
    }
  }
}