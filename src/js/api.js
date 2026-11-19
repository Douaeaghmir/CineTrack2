
const URl = "https://6afb0f56730c1d152f33077a.mockapi.io/api/cinetrack/cinetrack"
export async function fetchdata() 
{
    try {
        const response = await fetch(URl);
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
export async function ajouterDonnees(movie)
{
    try{
        const response = await fetch(URl , {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(movie)
        })
        if(!response.ok)
        {
            throw new Error(`HTTP error Status: ${response.status}`)
        }
        const newMovie = await response.json();
        return newMovie;
    }
    catch(error)
    {
        console.error("error adding movie : " , error.message);
        return null;
    }
}
export async function modifierDonner(id , movie)
{
    try{
        const response = await fetch(`${URl}/${id}` , {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(movie)
        })
        if(!response.ok)
        {
            throw new Error(`HTTP error status : ${response.status}`)
        }
        const UpadeteTheMovie = await response.json();
        return UpadeteTheMovie;
    }catch(error)
    {
        console.error("error updating movie : " , error.message);
        return null;
    }
}
export async function deletedonner(id) {
    try{
        const response = await fetch(`${URl}/${id}` , {
            method : "DELETE",
        })
        if(!response.ok)
        {
            throw new Error(`HTTP error status : ${response.status}`)
        }
        return true;
    }
    catch(error) {
        console.error("error updating movie : " , error.message);
        return false;
    }
}