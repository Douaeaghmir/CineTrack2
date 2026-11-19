import { fetchdata, ajouterDonnees, modifierDonner, deletedonner } from "./api.js";

const ajouter = document.getElementById("ajouter");
const formContainer = document.getElementById("formContainer");
const addMovieForm = document.getElementById("addMovieForm")
const cancelAdd = document.getElementById("cancelAdd");
const moviesTable = document.getElementById("moviesTable");
const close = document.getElementById("close");
let editmovie = null;
let movies = await fetchdata();

document.addEventListener("click", async (event) => {
    if (event.target.closest("#ajouter")) {
        editmovie = null;
        document.getElementById("formTitle").textContent = "Add a new movie";
        document.getElementById("saveMovie").textContent = "Save movie";
        formContainer.classList.remove("hidden");
    }
    else if (event.target.closest("#close") || event.target.closest("#cancelAdd")) {
        formContainer.classList.add("hidden");
        addMovieForm.reset();
        editmovie = null;
    }
    else if (event.target.closest('[data-action="edit"]')) {
        const button = event.target.closest('[data-action="edit"]');
        const id = button.dataset.id;

        const movie = movies.find(item => item.id == id);

        if (!movie) return;
        editmovie = movie.id;

        document.getElementById("title").value = movie.title;
        document.getElementById("type").value = movie.type;
        document.getElementById("releaseYear").value = movie.releaseYear;
        document.getElementById("duration").value = movie.duration;
        document.getElementById("image").value = movie.image;
        document.getElementById("description").value = movie.description;

        document.getElementById("genres").value = movie.genres.join(", ");
        document.getElementById("directors").value = movie.directors.join(", ");
        document.getElementById("productionCountries").value =
            movie.productionCountries.join(", ");

        document.getElementById("formTitle").textContent = "Edit movie";
        document.getElementById("saveMovie").textContent = "Update movie";

        formContainer.classList.remove("hidden");
    }
    else if (event.target.closest('[data-action="delete"]')) {
        const button = event.target.closest('[data-action="delete"]');
        const id = button.dataset.id;

        const confirmDelete = confirm("Are you sure you want to delete this movie?");

        if (!confirmDelete) return;
        const result = await deletedonner(id);
        if (result) {
            movies = movies.filter(movie => movie.id != id);

            renderAdminMovies(movies);

            console.log("Movie deleted successfully");
        }
        else
            alert("Failed to delete movie");
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
                <button data-action="edit"  data-id="${movie.id}" class="text-gray-400 hover:text-white mr-3">✎</button>
         <button data-action="delete" data-id="${movie.id}" class="text-red-500 hover:text-red-400">⌫</button>
            </td>
        </tr>
    `).join("");
}
renderAdminMovies(movies);

addMovieForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newMovie = {
        title: document.getElementById("title").value,
        type: document.getElementById("type").value,
        releaseYear: document.getElementById("releaseYear").value,
        duration: Number(document.getElementById("duration").value),
        image: document.getElementById("image").value,
        description: document.getElementById("description").value,
        genres: document.getElementById("genres").value.split(",").map(items => items.trim()),
        directors: document.getElementById("directors").value.split(",").map(items => items.trim()),
        productionCountries: document.getElementById("productionCountries").value.split(",").map(items => items.trim()),
    }
    let result;
    if (editmovie !== null) {
        result = await modifierDonner(editmovie, newMovie);
        if (result) {
            const index = movies.findIndex(movie => movie.id == editmovie);
            movies[index] = result;
        }
    }
    else {
        result = await ajouterDonnees(newMovie);
        if (result) {
        movies.push(result);
        }
    }
    if (result) {
        renderAdminMovies(movies);
        console.log("movie was added successfully", result);
        addMovieForm.reset();
        formContainer.classList.add("hidden");
        editmovie = null;
        document.getElementById("formTitle").textContent = "Add a new movie";
        document.getElementById("saveMovie").textContent = "Save movie";
    }
    else {
        alert("failed to add the movie");
    }
})