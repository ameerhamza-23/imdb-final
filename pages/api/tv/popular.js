import TVShow from '../../../models/TVShow';
import dbConnect from '../../../lib/dbConnect';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const popularShows = await TVShow.find().sort({ popularity: -1 }).limit(10);
      res.status(200).json(popularShows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch popular shows' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
