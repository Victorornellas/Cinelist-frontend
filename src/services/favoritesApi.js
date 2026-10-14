const API_URL = "https://cinelist-backend-goka.onrender.com/favorites";

export async function getFavorites(){
    const response = await fetch(API_URL)
    const data = await response.json()
    return data
}

export async function addFavorite(movie){
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie)
    })
    const data = await response.json()
    return data
}

export async function removeFavorite(id){
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
}