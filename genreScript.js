const mongoose = require('mongoose');
const Genre = require("./models/Genre")

// MongoDB Atlas connection URI
const MONGODB_URI = "mongodb+srv://imdb-user:Testpassword123@cluster0.2vmtk.mongodb.net/imdb-clone?retryWrites=true&w=majority&appName=Cluster0";

// Genres array from TMDB
const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
];

// Function to connect to MongoDB and insert genres
async function insertGenres() {
    try {
        // Connect to MongoDB Atlas
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');

        // Insert genres into the collection
        await Genre.insertMany(genres);
        console.log('Genres inserted successfully');

        // Close the connection
        mongoose.connection.close();
    } catch (error) {
        console.error('Error inserting genres:', error);

        // Close the connection in case of error
        mongoose.connection.close();
    }
}

// Execute the script
insertGenres();
