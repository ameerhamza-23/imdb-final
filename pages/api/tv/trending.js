import TVShow from '../../../models/TVShow';
import dbConnect from '../../../lib/dbConnect';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const trendingShows = await TVShow.find().sort({ popularity: -1, first_air_date: -1 }).limit(10);
      res.status(200).json(trendingShows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch trending shows' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
