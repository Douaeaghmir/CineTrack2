import { fetchdata, ajouterDonnees } from "./api.js";

const ajouter = document.getElementById("ajouter");
const formContainer = document.getElementById("formContainer");
const addMovieForm = document.getElementById("addMovieForm") 
const cancelAdd = document.getElementById("cancelAdd");
const moviesTable = document.getElementById("moviesTable");
const close = document.getElementById("close");
const movies = await fetchdata();

document.addEventListener("click" , (event)=>{
    if(event.target.closest("#ajouter"))
    {
        formContainer.classList.remove("hidden");
    }
    else if(event.target.closest("#close") || event.target.closest("#cancelAdd"))
    {
        formContainer.classList.add("hidden");
        addMovieForm.reset();
    }
})
export function renderAdminMovies(movies) {
    console.log(movies);
    moviesTable.innerHTML = movies.map(movie => `
        <tr class="border-b border-[#29292d] hover:bg-[#222226]">
            <td class="p-4">
        <div class="flex items-center gap-3">
            <img src="${movie.image}"
                 alt="${movie.title}"
                 class="w-10 h-14 object-cover rounded">
                    <span class="font-semibold">${movie.title}</span>
                </div>
            </td>
            <td class="p-4 text-gray-400">${movie.type}</td>
            <td class="p-4 text-gray-400">${movie.releaseYear}</td>
            <td class="p-4 text-yellow-400">
                ${movie.rating ?? "—"}
            </td>
            <td class="p-4 text-gray-400">
         ${movie.status ?? "—"}
            </td>
            <td class="p-4">
                <button class="text-gray-400 hover:text-white mr-3">✎</button>
         <button class="text-red-500 hover:text-red-400">⌫</button>
            </td>
        </tr>
    `).join("");
}
renderAdminMovies(movies);

addMovieForm.addEventListener("submit" , async (e)=> {
    e.preventDefault();

    const newMovie = {
        title : document.getElementById("title").value,
        type : document.getElementById("type").value,
        releaseYear : document.getElementById("releaseYear").value,
        duration : Number(document.getElementById("duration").value),
        image : document.getElementById("image").value,
        description : document.getElementById("description").value,
        genres : document.getElementById("genres").value.split(",").map(items => items.trim()),
        directors : document.getElementById("directors").value.split(",").map(items => items.trim()),
        productionCountries : document.getElementById("productionCountries").value.split(",").map(items => items.trim()),
    }
    const result = await ajouterDonnees(newMovie);
    if(result)
    {
        console.log("movie was added successfully" , result);
        addMovieForm.reset();
        formContainer.classList.add("hidden");
    }
    else{
        alert("failed to add the movie");
    }
})