function MovieCard({ movie, onAddFavorite }) {
    return (
        <div className="movie-card">
        <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        />
        <h3>{movie.title}</h3>
        <p> ⭐ {movie.vote_average}</p>
        <button onClick={() => onAddFavorite(movie)}>❤️ Favoritar</button>
        </div>
    )
}

export default MovieCard