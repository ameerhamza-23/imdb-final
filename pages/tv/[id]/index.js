import { useUser } from '@clerk/nextjs';

export async function getServerSideProps({ params }) {
	const res = await fetch("http://localhost:3000/api/tv/" + params.id);
	const show = await res.json();

	return { props: { show } };
}



const TVShowDetails = ({ show }) => {

	const { isLoaded, user } = useUser();

	const addToFavourites = async (showId) => {

		
		if (isLoaded && user) {
			const userId = user.id;

			try {
				// Make API call to add movie to favorites
				const response = await fetch(`/api/favorites/${userId}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ mediaId: showId, type: 'show' }),
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
			<div className="row">
				<div className="col-md-4">
					<img
						src={
							show.poster_path
								? `https://image.tmdb.org/t/p/w500${show.poster_path}`
								: "https://via.placeholder.com/500x750?text=No+Image"
						}
						className="img-fluid rounded"
						alt={show.name}
					/>
				</div>
				<div className="col-md-8">
					<h1>{show.name}</h1>
					<p>
						<strong>Overview:</strong>{" "}
						{show.overview || "No description available."}
					</p>
					<p>
						<strong>First Air Date:</strong> {show.first_air_date || "N/A"}
					</p>
					<p>
						<strong>Rating:</strong> {show.vote_average || "N/A"}
					</p>
					<p>
						<strong>Genres:</strong>{" "}
						{show.genres
							? show.genres.map((genre) => genre).join(", ")
							: "N/A"}
					</p>
					<button className="bg-warning px-4 py-2 rounded" onClick={() => { addToFavourites(show.id) }}>Add to favourites</button>
				</div>
			</div>
		</div>
	)



};

export default TVShowDetails;
