import { useState } from "react"
import './App.css'
import { searchMovies } from "./services/tmdbApi"
import  MovieCard  from "./components/MovieCard"


function App(){
const [ search, setSearch ] = useState("")
const [ movies, setMovies ] = useState([])
const handleSearch = async () => {
  const results = await searchMovies(search)
  setMovies(results)
  console.log(results)
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
      <MovieCard key={movie.id} movie={movie}/>
    ))}
      </div>

  </div>
)
}


export default App