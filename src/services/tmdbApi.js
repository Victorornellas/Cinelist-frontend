const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export async function searchMovies(query) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results
}

