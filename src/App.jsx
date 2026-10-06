import { useState } from "react"
import './App.css'
import { searchMovies } from "./services/tmdbApi"
import  MovieCard  from "./components/MovieCard"
import { addFavorite } from "./services/favoritesApi"

function App(){
const [ search, setSearch ] = useState("")
const [ movies, setMovies ] = useState([])
const handleSearch = async () => {
  const results = await searchMovies(search)
  setMovies(results)
  console.log(results)
}
const handleAddFavorite = async (movie) => {
  await addFavorite({
    movieId: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    voteAverage: movie.vote_average
  })
  alert("Filme adicionado aos favoritos!")
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

  </div>
)
}


export default App