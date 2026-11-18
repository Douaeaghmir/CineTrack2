import { fetchdata, modifierDonner } from "./api.js";
// import { fetchdata } from "./api.js";
import { affichCard , messages} from "./render.js";
import { searchMatch , FilterMatch } from "./filters.js";
import { clickButtonFav } from "./favorites.js"
import { openMovieModal } from "./modal.js";

const filterType = document.getElementById("kind");
const searchInput = document.getElementById("movie");
const displayCards = document.getElementById("movie-container");
const favourites = document.getElementById("favourites");
const Pagination = document.getElementById("pagination");
const movies = await fetchdata();
openMovieModal(movies);
let filterMovie = movies;
let currentPage = 1;
let NumberOfCards = 9;


async function searchByName() {   
    searchInput.addEventListener("input" , () =>{
         let searchResult = searchMatch(movies , searchInput.value);
         if(searchResult.length === 0)
         {
            messages(displayCards);
            Pagination.innerHTML = "";
         }
         else
         updateDisplay(searchResult); 
    })
}
searchByName();

async function filterByName()
{
    filterType.addEventListener("change" , () => {
        let filterResult = FilterMatch(movies , filterType.value);
        updateDisplay(filterResult)
    })
}
filterByName();

async function displayPages() {
    let start = (currentPage - 1) * NumberOfCards;
    let end = start + NumberOfCards;
    let moviesToDisplay = filterMovie.slice(start , end);

    displayCards.innerHTML = moviesToDisplay.map(movie => affichCard(movie)).join("");
    clickButtonFav(movies , favourites);
}
displayPages();

async function displayPagination() 
{
    console.log(filterMovie);
    let correctNumberOfPages = Math.ceil(filterMovie.length / NumberOfCards);
    Pagination.innerHTML = "";
    for(let i  = 1 ; i <= correctNumberOfPages ; i++)
    {
        let btn = document.createElement("button");
        btn.textContent = i;
        btn.className = "font-['poppins'] bg-red-600 text-white px-4 py-2 rounded focus:bg-red-800 focus:h-12";
        Pagination.appendChild(btn);
        btn.addEventListener("click" , ()=>{
            currentPage = i;
            displayPages();
        })
    }
}
displayPagination();

function updateDisplay(result)
{
    filterMovie = result;
    displayPages()
    displayPagination();
}


async function testPUT() {

    const movies = await fetchdata();

    console.log("All movies:", movies);

    const movie = movies[0];

    if (!movie) {
        console.log("No movies found!");
        return;
    }

    console.log("Before update:", movie);

    const updatedMovie = await modifierDonner(movie.id, {
        ...movie,
        title: "PUT TEST SUCCESS"
    });

    console.log("After update:", updatedMovie);

    const checkMovies = await fetchdata();

    const check = checkMovies.find(item => item.id == movie.id);

    console.log("Verification:", check);
}

testPUT();
