import './App.css'
import { searchMovies } from "./services/tmdbApi"
import  MovieCard  from "./components/MovieCard"
import { useState, useEffect } from "react"
import { addFavorite, getFavorites } from "./services/favoritesApi"
import { removeFavorite } from "./services/favoritesApi"

function App(){
const [ search, setSearch ] = useState("")
const [ movies, setMovies ] = useState([])
const handleSearch = async () => {
  const results = await searchMovies(search)
  setMovies(results)
  console.log(results)
}
const [favorites, setFavorites] = useState([])
useEffect(() => {
  loadFavorites()
}, [])
const loadFavorites = async () => {
  const data = await getFavorites()
  setFavorites(data)
}
const handleAddFavorite = async (movie) =>{
  await addFavorite({
    movieId: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    voteAverage: movie.vote_average
  })
  loadFavorites()
}
const handleRemoveFavorite = async (id) => {
    await removeFavorite(id)
    loadFavorites()
}
return (
  <div> 
    <h1>CineList 🎬</h1>

    <input
    type="text"
    placeholder="Buscar filme..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    />
    <button onClick={handleSearch}>Buscar</button>
    <div className="movie-list">{movies.map((movie) =>(
      <MovieCard key={movie.id} movie={movie} onAddFavorite={handleAddFavorite}/>
    ))}
      </div>
    <h2>Meus Favoritos</h2>
    <div className="favorites-list">
      {favorites.map((fav) => (
        <div key={fav._id} className="favorite-card">
          <img src={`https://image.tmdb.org/t/p/w500${fav.posterPath}`} alt={fav.title} />
          <h3>{fav.title}</h3>
          <p>{fav.voteAverage}</p>
          <button onClick={() => handleRemoveFavorite(fav._id)}>Remover</button>
        </div>
      ))}
    </div>

  </div>
)
}


export default App