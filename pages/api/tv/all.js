import TVShow from '../../../models/TVShow'
import dbConnect from '../../../lib/dbConnect'
import Genre from '../../../models/Genre'

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {

    try {
      const shows = await TVShow.find();
      const genreMap = await Genre.find().then((genres) =>
        genres.reduce((map, genre) => {
          map[genre.id] = genre.name;
          return map;
        }, {})
      );

      const showsWithGenres = shows.map((show) => ({
        ...show.toObject(),
        genres: show.genre_ids.map((id) => genreMap[id] || 'Unknown'),
      }));

      res.status(200).json(showsWithGenres);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch shows' });
    }

  } else if (req.method === 'POST') {
    
    try {
      const { name, genres, first_air_date, vote_average, overview } = req.body;

      const genreDocs = await Genre.find({ name: { $in: genres } });
      const genreIds = genreDocs.map((genre) => genre.id);

      const id = Math.floor(Math.random() * 1e15);

      const newShow = new TVShow({
        id:id,
        name,
        genre_ids: genreIds,
        first_air_date,
        vote_average,
        overview,
      });

      await newShow.save();

      res.status(201).json({ message: 'TV show created successfully', show: newShow });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create TV show', details: error.message });
    }

  } else {
    res.status(405).json({ error: 'Method Not Allowed' }); // Handle unsupported methods
  }
}