import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema({
  id: Number,
  name: String,
});

const Genre = mongoose.models.Genre || mongoose.model("Genre", GenreSchema);

export default Genre;
