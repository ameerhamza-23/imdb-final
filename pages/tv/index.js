import { useState, useEffect } from "react";
import Link from "next/link";

const PopularTVShows = () => {
	const [tvShows, setTVShows] = useState([]);

	useEffect(() => {
		const fetchPopularTVShows = async () => {
			const response = await fetch("/api/tv/popular");
			const data = await response.json();
			setTVShows(data);
		};
		fetchPopularTVShows();
	}, []);

	return (
		<div className="font container mt-5">
			<h1 className="text-center mb-4">Popular TV Shows</h1>
			<div className="row">
				{tvShows.map((show) => (
					<div className="col-md-4 col-lg-3 mb-4" key={show.id}>
						<div className="card h-100">
							<img
								src={
									show.poster_path
										? `https://image.tmdb.org/t/p/w500${show.poster_path}`
										: "https://via.placeholder.com/500x750?text=No+Image"
								}
								className="card-img-top"
								alt={show.name}
							/>
							<div className="card-body">
								<h5 className="card-title text-center">{show.name}</h5>
								
								<Link className="btn btn-primary w-100" href={`/tv/${show.id}`}>
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

export default PopularTVShows;
