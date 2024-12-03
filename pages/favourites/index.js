import { getAuth } from "@clerk/nextjs/server";
import { useState } from "react";
import {useUser} from "@clerk/nextjs"

export default function Favourites({ favourites }) {
    const [activeTab, setActiveTab] = useState("movies");
    const [favouritesState, setFavouritesState] = useState(favourites);

    const { isLoaded, user } = useUser();

    const removeFromFavourites = async (id, mediaType) => {
        try {
            const endpoint = `/api/favorites/${user.id}`; // Use the appropriate endpoint
            const response = await fetch(endpoint, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ mediaId: id, type: mediaType === "movies" ? "movie" : "show" }),
            });

            if (response.ok) {
                alert(`${mediaType.slice(0, -1)} removed successfully!`);
                setFavouritesState((prevState) => ({
                    ...prevState,
                    [mediaType]: prevState[mediaType].filter((item) => item.id !== id),
                }));
            } else {
                const errorData = await response.json();
                alert(`Failed to remove ${mediaType.slice(0, -1)}: ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error(`Error removing ${mediaType.slice(0, -1)}:`, error);
            alert(`An error occurred while trying to remove the ${mediaType.slice(0, -1)}.`);
        }
    };


    return (
        <div style={{ height: "90vh" }} className="d-flex flex-column align-items-center">
            <div style={{ width: "75vw" }} className="mt-5">
                <h1>Favourites</h1>

                {/* Tabs Navigation */}
                <div className="d-flex gap-3 mt-4">
                    <button
                        className={`btn ${activeTab === "movies" ? "border-warning" : ""} transparent-btn`}
                        onClick={() => setActiveTab("movies")}
                    >
                        Movies
                    </button>
                    <button
                        className={`btn ${activeTab === "shows" ? "border-warning" : ""} transparent-btn`}
                        onClick={() => setActiveTab("shows")}
                    >
                        TV Shows
                    </button>
                </div>

                {/* Conditionally render favourites based on the active tab */}
                {activeTab === "movies" && (
                    <table className="table table-striped table-dark rounded-3 mt-4">
                        <thead>
                            <tr>
                                <th scope="col">Poster</th>
                                <th scope="col">Title</th>
                                <th scope="col">Genre</th>
                                <th scope="col">Release Date</th>
                                <th scope="col">Rating</th>
                                <th scope="col">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {favouritesState.movies && favouritesState.movies.map((movie) => (
                                <tr key={movie.id}>
                                    <td>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={movie.title}
                                            style={{ width: "50px", height: "75px" }}
                                        />
                                    </td>
                                    <td>{movie.title}</td>
                                    <td>{movie.genre_ids.join(", ") || "N/A"}</td>
                                    <td>{movie.release_date || "N/A"}</td>
                                    <td>{movie.vote_average}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => removeFromFavourites(movie.id, "movies")}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {activeTab === "shows" && (
                    <table className="table table-striped table-dark rounded-3 mt-4">
                        <thead>
                            <tr>
                                <th scope="col">Poster</th>
                                <th scope="col">Title</th>
                                <th scope="col">Release Date</th>
                                <th scope="col">Rating</th>
                                <th scope="col">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {favouritesState.shows && favouritesState.shows.map((show) => (
                                <tr key={show.id}>
                                    <td>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                                            alt={show.name}
                                            style={{ width: "50px", height: "75px" }}
                                        />
                                    </td>
                                    <td>{show.name}</td>
                                    <td>{show.first_air_date || "N/A"}</td>
                                    <td>{show.vote_average}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => removeFromFavourites(show.id, "shows")}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <style jsx>{`
                .transparent-btn {
                    background: transparent;
                    border: none;
                    color: white;
                    font-weight: bold;
                    padding: 10px 15px;
                }
                .transparent-btn:hover {
                    cursor: pointer;
                }
                .transparent-btn:focus {
                    outline: none;
                }
                .border-warning {
                    border-bottom: 2px solid yellow;
                }
            `}</style>
        </div>
    );
}

// Server-side rendering to fetch favourites data
export async function getServerSideProps(context) {
    const { userId } = getAuth(context.req);

    if (!userId) {
        return {
            redirect: {
                destination: "/sign-in",
                permanent: false,
            },
        };
    }

    const res = await fetch(`http://localhost:3000/api/favorites/${userId}`);
    const favourites = await res.json();

    return { props: { favourites } };
}
