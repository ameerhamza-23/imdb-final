const AboutPage = () => {
	return (
		<div className="font container mt-5">
			<h1
				className="text-center mb-4"
				style={{
					color: "#8b0000", // Darker red
					textShadow:
						"2px 2px 8px rgba(255, 255, 255, 0.8), 4px 4px 10px rgba(0, 0, 0, 0.8)", // White and black shadows
					fontWeight: "bold",
					fontSize: "3.5rem",
					borderBottom: "3px solid #8b0000", // Darker red underline
					paddingBottom: "12px",
					letterSpacing: "2px",
				}}
			>
				About IMDb Clone
			</h1>

			<div className="row">
				<div className="col-md-6">
					<img
						src="/about.jpg"
						alt="About IMDb Clone"
						className="img-fluid rounded shadow"
					/>
				</div>
				<div className="col-md-6">
					<p>
						Welcome to the IMDb Clone! This platform is designed to provide you
						with information about the latest movies, TV shows, and trending
						content. Whether you're a casual viewer or a movie enthusiast, our
						goal is to bring you the best entertainment details at your
						fingertips.
					</p>
					<p>
						This project is built using modern web development technologies like
						<strong> Next.js</strong>, <strong>Bootstrap</strong>, and the{" "}
						<strong>TMDB API</strong>. It’s an educational project aimed at
						demonstrating the integration of APIs, dynamic routing, and state
						management in a real-world scenario.
					</p>
					<h5>Features:</h5>
					<ul>
						<li>Search for movies and TV shows</li>
						<li>Explore trending and popular content</li>
						<li>Browse movies by genres</li>
						<li>View detailed information about your favorite shows</li>
					</ul>
					<p>
						This clone is not affiliated with IMDb or TMDB. It is created solely
						for educational purposes to practice web development skills and API
						integrations.
					</p>
				</div>
			</div>
		</div>
	);
};

export default AboutPage;
