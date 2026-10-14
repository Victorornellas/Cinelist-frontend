function MovieCard({ movie, onAddFavorite }) {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform">
        <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        />
        <div className="p-4">
          <h3 className="font-semibold text-sm mb-1 truncate">{movie.title}</h3>
          <p className="text-yellow-400 text-sm mb-3"> ⭐ {movie.vote_average}</p>
          <button 
          onClick={() => onAddFavorite(movie)}
          className="w-full bg-red-600 hover:bg-red-700 py-2 rounded font-semibold cursor-pointer"
          >
            ❤️ Favoritar
        </button>
        </div>
        </div>
    )
}

export default MovieCard