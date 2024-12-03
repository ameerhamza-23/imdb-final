import { TMDB_API_BASE_URL, TMDB_API_KEY } from "@/keys/tmdbKey";
import Link from "next/link";
import { useState } from "react";

export async function getServerSideProps() {
	// Fetch all available genres
	const genresRes = await fetch("http://localhost:3000/api/genres");
	const genresData = await genresRes.json();

	return {
		props: {
			genres: genresData.genres || [], // Fallback to empty array
		},
	};
}

const GenresPage = ({ genres }) => {
	const [movies, setMovies] = useState([]);
	const [selectedGenre, setSelectedGenre] = useState(null);

	const fetchMoviesByGenre = async (genreId) => {
		const res = await fetch("http://localhost:3000/api/movie/genre/"+genreId);
		const data = await res.json();
		setMovies(data || []);
		setSelectedGenre(genreId);
	};

	return (
		<div className="font container mt-5">
			<h1 className="text-center mb-4">Browse Movies by Genre</h1>

			{/* Genre List */}
			<div className="row mb-5">
				{genres.map((genre) => (
					<div className="col-md-3 col-sm-4 mb-3" key={genre.id}>
						<button
							className={`btn btn-${
								selectedGenre === genre.id ? "primary" : "outline-primary"
							} w-100`}
							onClick={() => fetchMoviesByGenre(genre.id)}
                            style={{
                                color:"white", 
                                backgroundColor: 'orange'
                            }}
						>
							{genre.name}
						</button>
					</div>
				))}
			</div>

			{/* Movies List */}
			<div>
				{movies.length > 0 && (
					<h2 className="text-center mb-4">
						Movies in {genres.find((g) => g.id === selectedGenre)?.name}
					</h2>
				)}
				<div className="row">
					{movies.length > 0 && movies.map((movie) => (
						<div className="col-md-4 col-lg-3 mb-4" key={movie.id}>
							<div className="card h-100">
								<img
									src={
										movie.poster_path
											? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
											: "https://via.placeholder.com/500x750?text=No+Image"
									}
									className="card-img-top"
									alt={movie.title}
								/>
								<div className="card-body">
									<h5 className="card-title">{movie.title}</h5>
									<Link
										className="btn btn-primary w-100"
										href={`/movies/${movie.id}`}
									>
										View Details
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
				{movies.length === 0 && selectedGenre && (
					<p className="text-center">No movies found in this genre.</p>
				)}
			</div>
		</div>
	);
};

export default GenresPage;
