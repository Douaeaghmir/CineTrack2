
import { fetchcomment, addcomment } from "./api.js";
export function openMovieModal(movies) {

    const movieContainer = document.getElementById("movie-container");
    const modal = document.getElementById("movieModal");
    const commentsList = document.getElementById("commentsList");
    const commentForm = document.getElementById("commentForm");
    let currentMovieId = null;
    const closeModal = document.getElementById("closeModal");
    movieContainer.addEventListener("click", async (event) => {

        const card = event.target.closest("article[data-id]");
        if (!card) return;
        if (event.target.closest("button")) return;

        const movieId = card.dataset.id;
        currentMovieId = movieId;
        const comment = await fetchcomment(movieId);
        commentsList.innerHTML = comment.map(comment => `<div class="bg-gray-800 p-3 rounded-lg">
        <div class="flex justify-between">
        <h4 class="text-white font-bold">${comment.author}</h4>
        </div>
        <p class="text-gray-300 mt-2">${comment.text}</p>
        <small class="text-gray-500">${comment.createdAt}</small>
        </div>`).join("");

        const movie = movies.find(movie => movie.id == movieId);
        if (!movie)
            return;
        else {
            const seasonsContainer = document.getElementById("seasonsContainer");
            const seasonSelect = document.getElementById("seasonSelect");

            seasonSelect.className += " border-2 border-red-600"
            if (movie.type === "series") {
                seasonsContainer.classList.remove("hidden");

                seasonSelect.innerHTML = movie.seasons.map(season =>
                    `<option value="${season}">Season ${season}</option>`
                ).join("");

            } else {
                seasonsContainer.classList.add("hidden");
            }
        }

        document.getElementById("modalTitle").textContent = movie.title;
        document.getElementById("modalTime").textContent = movie.duration;
        document.getElementById("modalTime").className = "bg-red-600 text-white font-['Robot'] pl-2 w-[40px] rounded";
        document.getElementById("modalImage").src = movie.image;
        let describe = document.getElementById("modalDescription")

        describe.textContent = movie.description;
        describe.className = "font-['Robot']"
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    });
    commentForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const newComment = {
            contentId: currentMovieId,
            author: document.getElementById("commentAuthor").value,
            text: document.getElementById("commentText").value,
            createdAt: new Date().toISOString()
        };
        const result = await addcomment(newComment);

        if(result)
        {
            commentForm.reset();
            const comments = await fetchcomment(currentMovieId);
             commentsList.innerHTML = comments.map(comment => `
                <div class="bg-gray-800 p-3 rounded-lg">
            <div class="flex justify-between">
            <h4 class="text-white font-bold">${comment.author}</h4>
                </div>
            <p class="text-gray-300 mt-2">${comment.text}</p>
            <small class="text-gray-500">${comment.createdAt}</small>
        </div>
    `).join("");
        }
    });
    closeModal.addEventListener("click", () => {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    });
}