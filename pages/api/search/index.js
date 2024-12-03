import Movie from '@/models/Movie';
import TVShow from '@/models/TVShow';
import dbConnect from '@/lib/dbConnect';

export default async function handler(req, res) {
    await dbConnect();

    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        // Find matching movies and TV shows
        const movies = await Movie.find({ title: { $regex: query, $options: 'i' } }).select('id title vote_average poster_path');
        const tvShows = await TVShow.find({ name: { $regex: query, $options: 'i' } }).select('id name vote_average poster_path');

        // Combine and return results
        const results = [
            ...movies.map((movie) => ({ ...movie.toObject(), mediaType: 'movies' })),
            ...tvShows.map((show) => ({ ...show.toObject(), mediaType: 'tv' })),
        ];

        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).json({ error: 'Failed to fetch search results' });
    }
}
