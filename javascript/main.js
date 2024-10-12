import moviesService from './movies.services.js'

const _menuBar = document.querySelector('.menu-bar');
const _navMenu = document.getElementById('nav-menu');
const _closeMenuBar = document.querySelector('.close-menu-icon');
const _overlay = document.getElementById("overlay");
const _headerCarousel = document.querySelector(".header-carousel");
const _cardsGrid = document.getElementById("cards-grid");
const _input = document.querySelector(".input");
const _searchIcon = document.getElementById("search-icon");
const _moviePopup = document.getElementById("movie-popup");
const _iframe = _moviePopup.querySelector("iframe");
const _crewContainer = _moviePopup.querySelector(".crew-container");
let currPage = 1;
let maxPage = 47000;

_menuBar.addEventListener('click', () => {
    _navMenu.classList.add('show');
    _overlay.classList.add("active");
});
_closeMenuBar.addEventListener('click', () => {
    _navMenu.classList.remove('show');
    _overlay.classList.remove("active");
});
_searchIcon.addEventListener("click", handleSearchClick);

async function handleSearchClick() {
    let data;
    if(_input.value === "")
        data = await moviesService.getMovies(1);
    else
        data = await moviesService.getMoviesByText(_input.value,currPage);
    fillCardsGrid(data.movies);
    setMaxPage(data.maxPage);
}
function setMaxPage(page) {
    currPage = 1;
    for (const num of pagiNum) num.textContent = currPage;
    maxPage = page;
    if(currPage === maxPage){
        for(const button of document.querySelectorAll("#pagi-next"))
            button.style.cursor = "no-drop";
    }
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
        async function handleCardClick(e) {
            const movieId = e.target.closest(".movie-card").dataset.id;
            _overlay.classList.add("active");
            const videos = await moviesService.getMovieVideos(movieId);
            _moviePopup.classList.remove("invisible");
            _iframe.src = videos[0].key;
            const crew = await moviesService.getMovieCredits(movieId);
            const persons = crew.map(element => {
                return `
                <div class="person">
                <img src="${element.profile_path}" width="100px" height="150px"/>
                <h3>${element.name}</h3>
                <p>${element.character}</p>
                </div>
                `
            })
            _crewContainer.innerHTML = persons;
        }
    });
}
fillCardsGrid((await moviesService.getMovies(1)).movies);


function removeOverlay() {
    _overlay.classList.remove('active');
    _navMenu.classList.remove('show');
    _moviePopup.classList.add("invisible");
    _iframe.src = "";
}
// removes dark overlay upon resize to desktop
function checkScreenSize() {
    if (window.innerWidth > 1024) {
        removeOverlay();
    }
}
window.addEventListener('resize', checkScreenSize);
_overlay.addEventListener("click", removeOverlay);


// Pagination
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