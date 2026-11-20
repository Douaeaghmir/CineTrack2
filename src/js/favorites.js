import { displaCardFav } from "./render.js";
import { saveFavorites } from "./api.js"
let favMovies = JSON.parse(localStorage.getItem("favorites")) || [];


export function clickButtonFav(movies, favourites) {
    const favoriteMovies = movies.filter(movie =>
        favMovies.includes(String(movie.id))
    );
    favourites.innerHTML = favoriteMovies
        .map(movie => displaCardFav(movie))
        .join("");
    const btn = document.querySelectorAll(".added");

    btn.forEach(button => {
        button.addEventListener("click", () => {
            const movieId = button.dataset.id;
            const movie = movies.find(movie => movie.id == movieId);
            const exist = favMovies.includes(movieId);

            if (exist) {
                favMovies = favMovies.filter(id => id != movieId);
            }
            else
                favMovies.push(String(movie.id));
            saveFavorites(favMovies);
            const favoriteMovies = movies.filter(movie =>
                favMovies.includes(String(movie.id))
            );

            favourites.innerHTML = favoriteMovies
                .map(movie => displaCardFav(movie))
                .join("");
        })
    });
    favourites.addEventListener("click", (event) => {

        if (event.target.classList.contains("removeFav")) {
            const movieId = event.target.dataset.id;

            favMovies = favMovies.filter(id => id != movieId);
            saveFavorites(favMovies);
            const originalButton = document.querySelector(
                `.added[data-id="${movieId}"]`
            );

            if (originalButton) {
                originalButton.textContent = "🖤";
            }
            const favoriteMovies = movies.filter(movie =>
                favMovies.includes(String(movie.id))
            );

            favourites.innerHTML = favoriteMovies
                .map(movie => displaCardFav(movie))
                .join("");
        }
    });
}