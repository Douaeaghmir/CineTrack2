
export async function fetchdata() 
{
    try {
        const response = await fetch(
            "https://6afb0f56730c1d152f33077a.mockapi.io/api/cinetrack/cinetrack"
        );
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const movies = await response.json();
        return movies;
    } catch (error) {
        console.error("Error fetching movies:", error.message);
        return [];
    }
}

export function saveFavorites(favMovies) {
    localStorage.setItem("favorites", JSON.stringify(favMovies));
}