import './App.css'
import { searchMovies } from "./services/tmdbApi"
import  MovieCard  from "./components/MovieCard"
import { useState, useEffect } from "react"
import { addFavorite, getFavorites } from "./services/favoritesApi"
import { removeFavorite } from "./services/favoritesApi"

function App(){
const [ loading, setLoading] = useState(false)
const [ search, setSearch ] = useState("")
const [ movies, setMovies ] = useState([])
const handleSearch = async () => {
  setLoading(true)
  const results = await searchMovies(search)
  setMovies(results)
  setLoading(false)
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
  const alreadyFavorite = favorites.some((fav) => fav.movieId === movie.id)
  if(alreadyFavorite){
    alert("Filme já favoritado!")
    return
  }
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
  <div className="min-h-screen bg-gray-900 text-white p-8"> 
    <h1 className="text-4xl font-bold mb-8 text-center">CineList 🎬</h1>
  <div className="flex justify-center mb-8">
    <input
    type="text"
    placeholder="Buscar filme..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-red-500 w-80"
    />
    <button 
    onClick={handleSearch}
    className="ml-2 px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 font-semibold cursor-pointer">
      Buscar
    </button>
  </div>
  {loading && <p className="text-center text-gray-400 mb-4"> Buscando...</p>}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">{movies.map((movie) =>(
      <MovieCard key={movie.id} movie={movie} onAddFavorite={handleAddFavorite}/>
    ))}
      </div>
    <h2 className="text-2xl font-bold mb-4 mt-12">Meus Favoritos</h2>
    {favorites.length === 0 ? (
      <p className="text-gray-400">Nenhum filme favoritado ainda. Busque e adicione!</p>) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {favorites.map((fav) => (
        <div key={fav._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <img src={`https://image.tmdb.org/t/p/w500${fav.posterPath}`} alt={fav.title} className="w-full h-72 object-cover" />
          <div className="p-4">
          <h3 className="font-semibold text-sm mb-1 truncate">{fav.title}</h3>
          <p className="text-yellow-400 text-sm mb-3">{fav.voteAverage}</p>
          <button 
          onClick={() => handleRemoveFavorite(fav._id)}
          className="w-full bg-gray-600 hover:bg-gray-700 py-2 rounded font-semibold cursor-pointer"
          >
            Remover
          </button>
        </div>
        </div>
      ))}
    </div>
    )}

  </div>
)
}


export default App