import Link from "next/link";

export async function getServerSideProps() {

	const moviesRes = await fetch("http://localhost:3000/api/movie/trending");
	const tvShowsRes = await fetch("http://localhost:3000/api/tv/popular");

	const trendingMovies = await moviesRes.json();
	const popularTvShows = await tvShowsRes.json();

	return {
		props: {
			trendingMovies: trendingMovies.slice(0, 4),
			popularTvShows: popularTvShows.slice(0, 4),
		},
	};
}

const HomePage = ({ trendingMovies, popularTvShows }) => {
	return (
		<div className="landing-page">
			{/* Hero Section */}
			<div className="hero-section text-center py-5">
				<h1 className="font display-3 mb-3">Welcome to IMDb Clone</h1>
				<p className="font lead mb-4">
					Discover the latest movies, TV shows, and official trailers. Stay
					updated and entertained with our professional platform.
				</p>
				<div className="font d-flex justify-content-center">
					<Link href="/movies" className="btn btn-primary btn-lg mx-2">
						Explore Movies
					</Link>
					<Link href="/tv" className="btn btn-secondary btn-lg mx-2">
						Explore TV Shows
					</Link>
				</div>
			</div>

			{/* Featured Movies Section */}
			<div className="featured-section text-center py-5">
				<h2 className="font mb-4">Featured Movies</h2>
				<div className="row">
					{trendingMovies.map((movie) => (
						<div key={movie.id} className="col-md-4 col-lg-3 mb-4">
							<div className="card h-100">
								<img
									src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
									className="card-img-top"
									alt={movie.title}
								/>
								<div className="card-body">
									<h5 className="card-title">{movie.title}</h5>
									<p className="card-text">
										{movie.overview.substring(0, 80)}...
									</p>
									<Link
										href={`/movies/${movie.id}`}
										className="btn btn-primary"
									>
										View Details
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Popular TV Shows Section */}
			<div className="popular-tv-shows-section text-center py-5">
				<h2 className="font mb-4">Popular TV Shows</h2>
				<div className="row">
					{popularTvShows.map((show) => (
						<div key={show.id} className="col-md-4 col-lg-3 mb-4">
							<div className="card h-100">
								<img
									src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
									className="card-img-top"
									alt={show.name}
								/>
								<div className="card-body">
									<h5 className="card-title">{show.name}</h5>
									<p className="card-text">
										{show.overview.substring(0, 80)}...
									</p>
									<Link href={`/tv/${show.id}`} className="btn btn-secondary">
										View Details
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Now Starring Section */}
			<div className="now-starring d-flex align-items-center p-4">
				<div className="text-content">
					<h4 className="font">Now Starring:</h4>
				</div>
				<div className="video-wrapper">
					<iframe
						src="https://www.youtube.com/embed/5UijUOy0MmE?controls=1"
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					></iframe>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
