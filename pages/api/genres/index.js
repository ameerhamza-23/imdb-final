import dbConnect from "@/lib/dbConnect";
import Genre from "@/models/Genre";

export default async function handler(req, res) {
    try {
        // Connect to the database
        await dbConnect();

        // Handle GET requests
        if (req.method === 'GET') {
            const genres = await Genre.find({}); // Fetch all genres
            return res.status(200).json({ genres });
        } else {
            // Method not allowed
            res.setHeader('Allow', ['GET']);
            return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
        }
    } catch (error) {
        console.error('Error fetching genres:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
