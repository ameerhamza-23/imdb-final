import { TMDB_API_BASE_URL, TMDB_API_KEY } from "@/keys/tmdbKey";

const BASE_URL= TMDB_API_BASE_URL
const API_KEY = TMDB_API_KEY

export const tmdb = async (endpoint, params = "") => {
	const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&${params}`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`TMDb API Error: ${response.statusText}`);
	}

	return response.json();
};
