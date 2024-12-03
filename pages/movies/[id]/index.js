import { useUser } from '@clerk/nextjs';

export async function getServerSideProps({ params }) {
    const res = await fetch("http://localhost:3000/api/movie/" + params.id);
    const movie = await res.json();
    return { props: { movie } };
}

const MovieDetails = ({ movie }) => {

     const { isLoaded, user } = useUser();

     const addToFavourites = async (movieId) => {
        if (isLoaded && user) {
            const userId = user.id;

            try {
                // Make API call to add movie to favorites
                const response = await fetch(`/api/favorites/${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ mediaId:movieId, type:'movie' }),
                });

                if (response.ok) {
                    alert("Added to favourites!");
                } else {
                    const errorData = await response.json();
                    console.error("Failed to add to favourites:", errorData);
                    alert("Failed to add to favourites.");
                }
            } catch (error) {
                console.error("Error adding to favourites:", error);
                alert("Something went wrong.");
            }
        } else {
            alert("Please sign in to add this movie to your favourites.");
        }
    };

    return (
        <div className="font container mt-5">
            <div className="d-flex flex-column flex-md-row align-items-start">
                {/* Left Side: Movie Poster */}
                <div className="movie-poster me-md-4">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="img-fluid rounded"
                    />
                </div>

                {/* Right Side: Movie Details */}
                <div className="movie-details">
                    <h1 className="text-center text-md-start">{movie.title}</h1>
                    <p className="mt-4">{movie.overview}</p>
                    <p>
                        <strong>Release Date:</strong> {movie.release_date}
                    </p>
                    <p>
                        <strong>Rating:</strong> {movie.vote_average}
                    </p>
                    <p>
                        <strong>Genres:</strong>{" "}
                        {movie.genres && movie.genres.map((genre) => genre).join(", ")}
                    </p>
                    <button className="bg-warning px-4 py-2 rounded" onClick={() => {addToFavourites(movie.id)}}>Add to favourites</button>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
