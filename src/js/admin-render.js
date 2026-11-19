import { fetchdata, deletedonner } from "./api.js";

// import { fetchdata}  from "./api.js";
const moviesTable = document.getElementById("moviesTable");

const movies = await fetchdata();


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
