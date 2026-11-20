
const URl = "https://6afb0f56730c1d152f33077a.mockapi.io/api/cinetrack/cinetrack"
const UrlComment = "https://6afb0f56730c1d152f33077a.mockapi.io/api/cinetrack/comment";
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

export async function fetchcomment(contentId) {
    try{
        const response = await fetch(UrlComment);
        if(!response.ok)
        {
            throw new Error(`HTTP error ${response.status}`);
        }
        const comment = await response.json();

        return comment.filter(comment => comment.contentId == contentId)
    }
    catch(error)
    {
        console.error("error fetching comments : " , error.message);
        return[];
    }
}
export async function addcomment(comment)
{
    try{
        const response = await fetch(UrlComment , {
            method : "POST",
            headers:{"Content-Type" : "application/json" 
            },
            body : JSON.stringify(comment)
        })
        if(!response.ok)
        {
            throw new Error (`HTTP error : ${response.status}`)
        }
        const newComment = await response.json();
        return newComment;
    }
    catch(error){
        console.error("Error adding comment:", error.message);
        return null;
    }
}