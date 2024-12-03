import Movie from '../../../models/Movie';
import dbConnect from '../../../lib/dbConnect';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const popularMovies = await Movie.find().sort({ popularity: -1 }).limit(10);
      res.status(200).json(popularMovies);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch popular movies' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
