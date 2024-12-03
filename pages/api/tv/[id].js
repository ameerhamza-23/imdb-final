import TVShow from '../../../models/TVShow';
import dbConnect from '../../../lib/dbConnect';
import Genre from '@/models/Genre';

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
        // Find the TV show by ID
        const show = await TVShow.findOne({ id });
        if (!show) {
          return res.status(404).json({ error: 'Show not found' });
        }
  
        // Fetch the genres associated with the TV show
        const genres = await Genre.find({ id: { $in: show.genre_ids } }).select('name -_id');
  
        // Add genres to the TV show object
        const showWithGenres = {
          ...show.toObject(),
          genres: genres.map((genre) => genre.name),
        };
  
        res.status(200).json(showWithGenres);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch show' });
      }
  } else if (req.method === 'PUT') {
   
    try {
      const { genres, ...otherFields } = req.body;

      // Convert genre names back to genre_ids
      const genreDocs = await Genre.find({ name: { $in: genres } });
      const genreIds = genreDocs.map((genre) => genre.id);

      const updatedShow = await TVShow.findOneAndUpdate(
          { id },
          { ...otherFields, genre_ids: genreIds },
          { new: true }
      );

      if (!updatedShow) {
          return res.status(404).json({ error: 'Show not found' });
      }

      // Fetch updated genres
      const updatedGenres = await Genre.find({ id: { $in: updatedShow.genre_ids } }).select('name -_id');

      res.status(200).json({
          ...updatedShow.toObject(),
          genres: updatedGenres.map((genre) => genre.name),
      });
  } catch (error) {
      res.status(500).json({ error: 'Failed to update show' });
  }

  } else if (req.method === 'DELETE') {
    try {
      const deletedShow = await TVShow.findOneAndDelete({ id:id });
      if (!deletedShow) {
        return res.status(404).json({ error: 'Show not found' });
      }
      res.status(200).json({ message: 'Show deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete show' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
