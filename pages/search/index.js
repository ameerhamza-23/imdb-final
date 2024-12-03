import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const router = useRouter();

    const handleSearch = async () => {
        if (!query) return;
        try {
            const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
            if (response.ok) {
                const data = await response.json();
                setResults(data);
            } else {
                alert('Failed to fetch search results');
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
            alert('An error occurred while searching');
        }
        finally {
            setQuery('')
        }
    };

    const handleCardClick = (mediaType, id) => {
        router.push(`/${mediaType}/${id}`);
    };

    return (
        <div style={{ height: '90vh' }} className="">

            <div className="d-flex gap-2 my-4 mx-4">
                <input
                    type="text"
                    className="px-3 py-2 rounded"
                    placeholder="Search"
                    style={{ width: '500px' }}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-warning px-5 py-2" onClick={handleSearch}>
                    Search
                </button>
            </div>




            <div className="d-flex flex-column gap-4 mx-4">
                {results.map((item) => (
                    <div
                        key={item.id}
                        className=" p-3 d-flex gap-5 rounded"
                        style={{ cursor: 'pointer', backgroundColor: 'white', width: '50%' }}
                        onClick={() => handleCardClick(item.mediaType, item.id)}
                    >
                        <img
							src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
							style={{width:'100px', height:'100px'}}
							alt={item.title}
							/>
                        <div>
                            <h5 className="text-warning">{item.title || item.name}</h5>
                            <p className="text-muted">Rating: {item.vote_average}</p>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
}
