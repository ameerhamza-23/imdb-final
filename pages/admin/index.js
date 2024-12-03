import { useState } from 'react';
import MediaModal from '@/components/MediaModal';
import EditMediaModal from '@/components/EditMediaModal';
import AddMediaModal from '@/components/AddMediaModal';

export default function Admin({ media }) {
    const [activeTab, setActiveTab] = useState('movies');
    const [mediaState, setMediaState] = useState(media); // Initialize media state
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedMediaType, setSelectedMediaType] = useState(null);





    const deleteMedia = async (id, mediaType) => {
        try {
            const endpoint =
                mediaType === 'movies'
                    ? `/api/movie/${id}`
                    : `/api/tv/${id}`;
            const response = await fetch(endpoint, { method: 'DELETE' });

            if (response.ok) {
                alert(`${mediaType.slice(0, -1)} deleted successfully!`);

                // Update the state dynamically based on mediaType
                setMediaState((prevMedia) => ({
                    ...prevMedia,
                    [mediaType]: prevMedia[mediaType].filter((item) => item.id !== id),
                }));
            } else {
                const errorData = await response.json();
                alert(`Failed to delete ${mediaType.slice(0, -1)}: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error(`Error deleting ${mediaType.slice(0, -1)}:`, error);
            alert(`An error occurred while trying to delete the ${mediaType.slice(0, -1)}.`);
        }
    };

    // Open the modal for creating a new item
    const openCreateModal = () => {
        setCreateModal(true);
    };

    const openEditModal = (item, mediaType) => {
        setSelectedItem(item);
        setSelectedMediaType(mediaType);
        setEditModal(true);
    };


    return (
        <div style={{ height: '90vh' }}>
            <div className="d-flex justify-content-between p-5">
                <div></div>
                <div>
                    <button
                        className="btn btn-outline-warning btn-lg mx-2 px-4"
                        onClick={openCreateModal}
                    >
                        Create
                    </button>
                </div>
            </div>
            <div className="px-5">
                <div className="pb-4 d-flex justify-content-between">
                    <div className="d-flex gap-3">
                        <button
                            className={`btn ${activeTab === 'movies' ? 'border-warning' : ''} transparent-btn`}
                            onClick={() => setActiveTab('movies')}
                        >
                            Movies
                        </button>
                        <button
                            className={`btn ${activeTab === 'shows' ? 'border-warning' : ''} transparent-btn`}
                            onClick={() => setActiveTab('shows')}
                        >
                            TV Shows
                        </button>
                    </div>
                </div>

                {/* Conditionally render tables based on activeTab */}
                {activeTab === 'movies' && (
                    <table className="table table-striped table-dark rounded-3">
                        <thead>
                            <tr>
                                <th scope="col">Poster</th>
                                <th scope="col">Title</th>
                                <th scope="col">Genre</th>
                                <th scope="col">Release Date</th>
                                <th scope="col">Rating</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mediaState.movies.map((movie) => (
                                <tr key={movie.id}>
                                    <td>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={movie.title}
                                            style={{ width: '50px', height: '75px' }}
                                        />
                                    </td>
                                    <td>{movie.title}</td>
                                    <td>{movie.genres.join(', ') || 'N/A'}</td>
                                    <td>{movie.release_date || 'N/A'}</td>
                                    <td>{movie.vote_average}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => openEditModal(movie, 'movies')}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => deleteMedia(movie.id, 'movies')}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {activeTab === 'shows' && (
                    <table className="table table-striped table-dark rounded-3">
                        <thead>
                            <tr>
                                <th scope="col">Poster</th>
                                <th scope="col">Title</th>
                                <th scope="col">Genre</th>
                                <th scope="col">Release Date</th>
                                <th scope="col">Rating</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mediaState.shows.map((show) => (
                                <tr key={show.id}>
                                    <td>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                                            alt={show.name}
                                            style={{ width: '50px', height: '75px' }}
                                        />
                                    </td>
                                    <td>{show.name}</td>
                                    <td>{show.genres.join(', ') || 'N/A'}</td>
                                    <td>{show.first_air_date || 'N/A'}</td>
                                    <td>{show.vote_average}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => openEditModal(show, 'shows')}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => deleteMedia(show.id, 'shows')}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {createModal === true ? <AddMediaModal mediaType={activeTab} setCreateModal={setCreateModal} /> : null}
            {editModal && (
                <EditMediaModal
                    mediaType={selectedMediaType}
                    item={selectedItem}
                    setEditModal={setEditModal}
                    onSave={(updatedItem) => {
                        // Update the media state with the edited item
                        setMediaState((prevMedia) => ({
                            ...prevMedia,
                            [selectedMediaType]: prevMedia[selectedMediaType].map((item) =>
                                item.id === updatedItem.id ? updatedItem : item
                            ),
                        }));
                    }}
                />
            )}

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

export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/api/movie/all');
    const movies = await res.json();

    const res2 = await fetch('http://localhost:3000/api/tv/all');
    const shows = await res2.json();

    const media = { movies, shows };

    return { props: { media } };
}
