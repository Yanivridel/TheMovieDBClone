import moviesService from './movies.services.js'
import { removeOverlay, _overlay } from './Components/nav.js'
import { handleCardClick , _moviePopup, _iframe, _movieClose  } from './Components/movie-popup.js';
import './Components/footer.js'
import './Components/loading.js'

const _cardsGrid = document.getElementById("cards-grid");
const cardHeight = 500;
const data = await moviesService.getFavoriteMovies(1);
let favorites = data.movies;
let maxPage = data.maxPage;
let currPage = 1;

fillCardsGrid(favorites);

_overlay.addEventListener("click", removeAllOverlays);
_movieClose.addEventListener("click", removeAllOverlays);
function removeAllOverlays() { 
    removeOverlay();
    _moviePopup.classList.add("invisible");
    _iframe.src = "";
}

function fillCardsGrid(movies) {
    // No movies Found
    if(!movies || movies.length === 0) {
        _cardsGrid.innerHTML = '<p class="not-found-err">Unfortunately no movies found...</p>';
        return;
    }
    // Movies Found
    const cards = movies.map(element => {
        return `
        <div class="movie-card" data-id="${element.id}" style="background-image: url('${element.poster_path}');">
            <div class="card-details invisible">
                <h3>${element.title}</h3>
                <div class="flex">
                    <p>${element.release_date?.slice(0,4)}</p>
                    <span class="heart">❤️</span>
                </div>
                <p>${element.overview}</p>
            </div>
        </div>
        `;
    }).join('');
    
    _cardsGrid.innerHTML = cards;
    const movieCards = Array.from(_cardsGrid.children);
    movieCards.forEach(element => {
        element.addEventListener("mouseover", (e) => {
            element.firstElementChild.classList.remove("invisible");
            element.style.overflow = 'auto';

            const cardDetails = element.querySelector('.card-details');
            const textHeight = cardDetails.getBoundingClientRect().height;
            element.style.setProperty('--blur-height', `${Math.max(textHeight + 22, cardHeight)}px`);
        })
        element.addEventListener("mouseout", (e) => {
            element.firstElementChild.classList.add("invisible");
            element.style.overflow = 'hidden';
        })
        element.addEventListener("click", async (e) => {
            await handleCardClick(e)
            if(e.target.matches(".heart"))
                setTimeout(async () => {
                    console.log("PAGE", currPage)
                    console.log("FAV", favorites)
                    currPage = currPage !== 1 && favorites.length === 1 ? currPage-1 : currPage;
                    const data = await moviesService.getFavoriteMovies(currPage);
                    favorites = data.movies;
                    fillCardsGrid(favorites);
                    setMaxPage(data.maxPage);
                }, 400);
        })
    });
}


// Pagination
function setMaxPage(page) {
    // currPage = 1;
    for (const num of pagiNum) num.textContent = currPage;
    maxPage = page;
    if(currPage === maxPage){
        for(const button of document.querySelectorAll("#pagi-next"))
            button.style.cursor = "no-drop";
    }
}
const pagiNum = document.querySelectorAll(".pagi-num");
for(const button of document.querySelectorAll("#pagi-prev")){
    button.addEventListener("click", async () => {
        if(currPage === 1) return;
        currPage--; 
        for (const num of pagiNum) num.textContent = currPage;
        button.style.cursor = currPage === 1 ? "no-drop" : "pointer";
        button.closest("ul").querySelector("#pagi-next").style.cursor = "pointer";
        const data = await moviesService.getFavoriteMovies(currPage);
        fillCardsGrid(data.movies);
        maxPage = data.maxPage;
        window.scrollTo({top: _cardsGrid.getBoundingClientRect().top + window.scrollY - 150,behavior: 'smooth'});
})}
for(const button of document.querySelectorAll("#pagi-next")){
    button.addEventListener("click", async (e) => {
        if(currPage === maxPage) return;
        currPage++; 
        for (const num of pagiNum) num.textContent = currPage;
        button.style.cursor = currPage === maxPage ? "no-drop" : "pointer";
        button.closest("ul").querySelector("#pagi-prev").style.cursor = "pointer";
        for(const num of pagiNum) num.textContent = currPage;
        const data = await moviesService.getFavoriteMovies(currPage);
        fillCardsGrid(data.movies);
        maxPage = data.maxPage;
        window.scrollTo({top: _cardsGrid.getBoundingClientRect().top + window.scrollY - 150,behavior: 'smooth'});
    })
}
