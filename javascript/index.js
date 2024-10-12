import moviesService from './movies.services.js'
import { removeOverlay, _overlay } from './Components/header.js'
import { handleCardClick , _moviePopup, _iframe  } from './Components/movie-popup.js';

window.addEventListener('load', () => {
    const loadingOverlay = document.getElementById('loading-overlay');
    console.log(loadingOverlay)
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
});

const _headerCarousel = document.querySelector(".header-carousel");
const _cardsGrid = document.getElementById("cards-grid");
const _input = document.querySelector(".input");
const _searchIcon = document.getElementById("search-icon");

let currPage = 1;
let maxPage = 47000;

fillCardsGrid((await moviesService.getMovies(1)).movies);

_overlay.addEventListener("click", removeAllOverlays);
window.addEventListener('resize', checkScreenSize);
_searchIcon.addEventListener("click", handleSearchClick);

function checkScreenSize() {
    if (window.innerWidth > 1024)
        removeAllOverlays()
}
function removeAllOverlays() { 
    removeOverlay();
    _moviePopup.classList.add("invisible");
    _iframe.src = "";
}
async function handleSearchClick() {
    let data;
    if(_input.value === "")
        data = await moviesService.getMovies(1);
    else
        data = await moviesService.getMoviesByText(_input.value,currPage);
    fillCardsGrid(data.movies);
    setMaxPage(data.maxPage);
}

async function displayCarousel() {
    const movies = (await moviesService.getMovies(1)).movies;
    const carouselItems = movies.map(element => {
        return `<div><img src="${element.backdrop_path}" loading="lazy" /></div>`;
    }).join('');

    _headerCarousel.innerHTML = carouselItems;

    $('.carousel').slick({
        autoplay: true,
        infinite: true,
        autoplaySpeed: 7000
    });

    const slickArrows = document.querySelectorAll(".slick-arrow");
    slickArrows[0].innerHTML = "<i class='fa-solid fa-angles-left slide-button'></i>";
    slickArrows[1].innerHTML = "<i class='fa-solid fa-angles-right slide-button'></i>";

    const title = document.querySelector(".header-movie-title");
    const year = document.querySelector(".header-movie-year");
    const genre = document.querySelector(".header-movie-genre");
    const description = document.querySelector(".header-movie-description");
    title.textContent = movies[0].title;
    year.textContent = movies[0].release_date.slice(0, 4);
    genre.textContent = moviesService.getGenreById(movies[0].genre_ids[0]);
    description.textContent = movies[0].overview;

    $('.carousel').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        title.textContent = movies[nextSlide].title;
        year.textContent = movies[nextSlide].release_date.slice(0, 4);
        genre.textContent = moviesService.getGenreById(movies[nextSlide].genre_ids[0]);
        description.textContent = movies[nextSlide].overview;
    });
}
$(document).ready(function() {
    displayCarousel();
});

function fillCardsGrid(movies) {
    const cards = movies.map(element => {
        return `
        <div class="movie-card" data-id="${element.id}" style="background-image: url('${element.poster_path}');">
                <div class="card-details invisible">
                    <h3>${element.title}</h3>
                    <p>${element.release_date.slice(0,4)}</p>
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
        })
        element.addEventListener("mouseout", (e) => {
            element.firstElementChild.classList.add("invisible");
            element.style.overflow = 'hidden';
        })
        element.addEventListener("click", (e) => handleCardClick(e))
    });
}

// Pagination
function setMaxPage(page) {
    currPage = 1;
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
        const data = await moviesService.getMovies(currPage);
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
        const data = await moviesService.getMovies(currPage);
        fillCardsGrid(data.movies);
        maxPage = data.maxPage;
        window.scrollTo({top: _cardsGrid.getBoundingClientRect().top + window.scrollY - 150,behavior: 'smooth'});
    })
}

