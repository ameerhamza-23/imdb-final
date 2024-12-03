import { useState } from 'react';

export default function AddMediaModal({ mediaType, setCreateModal }) {
    const [formData, setFormData] = useState({
        title: '',
        genres: '',
        release_date: '',
        vote_average: '',
        overview: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const addMedia = async () => {

        const payload =
            mediaType === 'movies'
                ? {
                      title: formData.title,
                      genres: formData.genres.split(',').map((g) => g.trim()),
                      release_date: formData.release_date,
                      vote_average: parseFloat(formData.vote_average) || 0,
                      overview: formData.overview,
                  }
                : {
                      name: formData.title,
                      genres: formData.genres.split(',').map((g) => g.trim()),
                      first_air_date: formData.release_date,
                      vote_average: parseFloat(formData.vote_average) || 0,
                      overview: formData.overview,
                  };

        try {
            let url
            if (mediaType === "movies") {
                url = "/api/movie/all"
            }
            else {
                url = "/api/tv/all" 
            }
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to add media');
            }

            alert(`${mediaType === 'movies' ? 'Movie' : 'Show'} added successfully!`);
        } catch (error) {
            alert(error.message);
        }
        finally {
            setCreateModal(false)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addMedia();
    };

    return (
        <div className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100" style={{ zIndex: 1050 }}>
            <div className="p-4 border rounded shadow" style={{ width: '50%', backgroundColor: '#333333', color: '#fff' }}>
                <h4 className="mb-4">Add {mediaType === 'movies' ? 'Movie' : 'Show'}</h4>
                <form onSubmit={handleSubmit} className="gap-3">
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label text-warning">{mediaType === 'movies' ? 'Title' : 'Name'}</label>
                        <div className="col-sm-8">
                            <input className="form-control" name="title" value={formData.title} onChange={handleInputChange} required />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label text-warning">Genres (comma-separated)</label>
                        <div className="col-sm-8">
                            <input className="form-control" name="genres" value={formData.genres} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label text-warning">{mediaType === 'movies' ? 'Release Date' : 'First Air Date'}</label>
                        <div className="col-sm-8">
                            <input className="form-control"  name="release_date" type="date" value={formData.release_date} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label text-warning">Rating</label>
                        <div className="col-sm-8">
                            <input className="form-control"  name="vote_average" type="number" step="0.1" value={formData.vote_average} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label text-warning">Description</label>
                        <div className="col-sm-8">
                            <textarea className="form-control" name="overview" value={formData.overview} onChange={handleInputChange} rows="3" ></textarea>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-warning px-5 py-2">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
