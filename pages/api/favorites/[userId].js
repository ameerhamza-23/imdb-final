import Favorite from '@/models/Favorite';
import Movie from '@/models/Movie';
import TVShow from '@/models/TVShow';
import dbConnect from '@/lib/dbConnect';

export default async function handler(req, res) {
    await dbConnect();

    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'Missing required field: userId.' });
    }

    if (req.method === 'POST') {
        const { mediaId, type } = req.body;

        if (!mediaId || !type) {
            return res.status(400).json({ message: 'Missing required fields: mediaId or type.' });
        }

        if (!['movie', 'show'].includes(type)) {
            return res.status(400).json({ message: 'Invalid media type. Must be "movie" or "show".' });
        }

        try {
            let favorite = await Favorite.findOne({ userId });

            if (!favorite) {
                favorite = new Favorite({ userId });
            }

            if (type === 'movie' && !favorite.movies.includes(mediaId)) {
                favorite.movies.push(mediaId);
            } else if (type === 'show' && !favorite.shows.includes(mediaId)) {
                favorite.shows.push(mediaId);
            }

            await favorite.save();
            res.status(200).json({ message: `${type} added to favorites!` });
        } catch (error) {
            console.error('Error adding to favorites:', error);
            res.status(500).json({ message: 'Failed to add to favorites.' });
        }
    } else if (req.method === 'DELETE') {
        const { mediaId, type } = req.body;

        if (!mediaId || !type) {
            return res.status(400).json({ message: 'Missing required fields: mediaId or type.' });
        }

        if (!['movie', 'show'].includes(type)) {
            return res.status(400).json({ message: 'Invalid media type. Must be "movie" or "show".' });
        }

        try {
            let favorite = await Favorite.findOne({ userId });

            if (!favorite) {
                return res.status(404).json({ message: 'Favorites not found.' });
            }

            // Remove mediaId from the appropriate array
            if (type === 'movie') {
                favorite.movies = favorite.movies.filter(id => id !== mediaId);
            } else if (type === 'show') {
                favorite.shows = favorite.shows.filter(id => id !== mediaId);
            }

            await favorite.save();
            res.status(200).json({ message: `${type} removed from favorites!` });
        } catch (error) {
            console.error('Error removing from favorites:', error);
            res.status(500).json({ message: 'Failed to remove from favorites.' });
        }
    } else if (req.method === 'GET') {
        try {
            const favorite = await Favorite.findOne({ userId });

            if (!favorite) {
                return res.status(404).json({});
            }

            const movies = await Movie.find({ id: { $in: favorite.movies } });
            const shows = await TVShow.find({ id: { $in: favorite.shows } });

            res.status(200).json({
                movies,
                shows,
            });
        } catch (error) {
            console.error('Error fetching favorites:', error);
            res.status(500).json({ message: 'Failed to fetch favorites.' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed. Use GET, POST, or DELETE.' });
    }
}
