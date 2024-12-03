import React, { useState } from "react";
import styles from '../styles/MediaModal.module.css'
const MediaModal = ({
  isOpen,
  onClose,
  onSubmit,
  mediaData = {},
  genres = [],
}) => {
  const [formData, setFormData] = useState({
    name: mediaData.name || "",
    description: mediaData.description || "",
    releaseDate: mediaData.release_date || "",
    rating: mediaData.vote_average || "",
    genreIds: mediaData.genre_ids || [],
    poster: mediaData.poster_path || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenreChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      genreIds: checked
        ? [...prevState.genreIds, value]
        : prevState.genreIds.filter((id) => id !== value),
    }));
  };

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setFormData({ ...formData, poster: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modalContent}>
        <h2>{mediaData.id ? "Edit Media" : "Add Media"}</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Poster Image */}
          <div>
            <label>Poster Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePosterChange}
            />
            {formData.poster && (
              <img
                src={formData.poster}
                alt="Poster Preview"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginTop: "10px",
                }}
              />
            )}
          </div>

          {/* Description */}
          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          {/* Release Date */}
          <div>
            <label>Release Date</label>
            <input
              type="date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Rating */}
          <div>
            <label>Rating</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              min="0"
              max="10"
              step="0.1"
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Genres */}
          <div>
            <label>Genres</label>
            <div>
              {genres.map((genre) => (
                <label key={genre.id} style={{ marginRight: "10px" }}>
                  <input
                    type="checkbox"
                    value={genre.id}
                    checked={formData.genreIds.includes(genre.id)}
                    onChange={handleGenreChange}
                  />
                  {genre.name}
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MediaModal;
