import dbConnect from "@/lib/dbConnect";
import Movie from "@/models/Movie";

export default async function Handler(req,res) {

    const {genreId} = req.query
    
    if (req.method === "GET") {
        try {
            await dbConnect()
            
            const movies = await Movie.find({ genre_ids: { $in: [genreId] } });
            if (!movies || movies.length === 0) {
                return res.status(404).json({ error: 'No movies found for this genre' });
            }

            res.status(200).json(movies);
        }
        catch(error) {
            res.status(500).json({ error: 'Failed to fetch movies by genre' });
        }
    }

}