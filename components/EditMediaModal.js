import { useState } from 'react';

export default function EditMediaModal({ mediaType, item, setEditModal, onSave }) {
    const [formData, setFormData] = useState(item);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const endpoint =
                mediaType === 'movies'
                    ? `/api/movie/${formData.id}`
                    : `/api/tv/${formData.id}`;

            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const updatedItem = await response.json();
                onSave(updatedItem);
                setEditModal(false);
                alert(`${mediaType.slice(0, -1)} updated successfully!`);
            } else {
                alert('Failed to update the item.');
            }
        } catch (error) {
            console.error('Error updating item:', error);
            alert('An error occurred while updating the item.');
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100"
            style={{ zIndex: 1050 }}
        >
            <div
                className="p-4 border rounded shadow"
                style={{ width: '50%', backgroundColor: '#333333', color: '#fff' }}
            >
                <h4 className="mb-4">Edit {mediaType === 'movies' ? 'Movie' : 'Show'}</h4>
                <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="gap-3">
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label text-warning">
                            {mediaType === 'movies' ? 'Title' : 'Name'}
                        </label>
                        <div className="col-sm-8">
                            <input
                                className="form-control"
                                name={mediaType === 'movies' ? 'title' : 'name'}
                                value={mediaType === 'movies' ? formData.title || '' : formData.name || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label text-warning">Genres (comma-separated)</label>
                        <div className="col-sm-8">
                            <input
                                className="form-control"
                                name="genres"
                                value={formData.genres || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label text-warning">
                            {mediaType === 'movies' ? 'Release Date' : 'First Air Date'}
                        </label>
                        <div className="col-sm-8">
                            <input
                                className="form-control"
                                name="release_date"
                                type="date"
                                value={mediaType === 'movies' ? formData.release_date : formData.first_air_date || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label text-warning">Rating</label>
                        <div className="col-sm-8">
                            <input
                                className="form-control"
                                name="vote_average"
                                type="number"
                                step="0.1"
                                value={formData.vote_average || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label text-warning">Description</label>
                        <div className="col-sm-8">
                            <textarea
                                className="form-control"
                                name="overview"
                                value={formData.overview || ''}
                                onChange={handleChange}
                                rows="3"
                            ></textarea>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-warning px-5 py-2">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
