import Link from "next/link";

export async function getServerSideProps() {
	const res = await fetch("http://localhost:3000/api/movie/trending");
	const data = await res.json();

	return { props: { trendingMovies: data } };
}


const TrendingMovies = ({ trendingMovies }) => {
	if (!trendingMovies || trendingMovies.length === 0) {
		return <div className="container mt-5">No trending movies found.</div>;
	}

	return (
		<div className="font container mt-5">
			<h1 className="text-center mb-4">Trending Movies</h1>
			<div className="row">
				{trendingMovies.map((movie) => (
					<div className="col-md-4 col-lg-3 mb-4" key={movie.id}>
						<div className="card h-100">
							<img
								src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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
		</div>
	);
};

export default TrendingMovies;
