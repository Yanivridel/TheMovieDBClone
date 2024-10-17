import moviesServices from './movies.services.js';
import { removeOverlay, _overlay } from './Components/nav.js'
import { handleCardClick , _moviePopup, _iframe  } from './Components/movie-popup.js';
import './Components/footer.js'
import './Components/loading.js'

const carouselOptions = {
    centerMode: true,
    arrows: true,
    centerPadding: '60px',
    slidesToShow: 9,
    variableWidth: false,
    prevArrow: "<button type='button' class='slick-prev'><i class='fa-solid fa-angles-left slide-button'></i></button>",
    nextArrow: "<button type='button' class='slick-next'><i class='fa-solid fa-angles-right slide-button'></i></button>",
    responsive:[
        {
            breakpoint: 1750,
            settings: {
                centerMode: true,
                arrows: true,
                centerPadding: '40px',
                slidesToShow: 7
            }
        },
    {
        breakpoint: 1400,
        settings: {
            centerMode: true,
            arrows: true,
            centerPadding: '40px',
            slidesToShow: 5
        }
    },
    {
        breakpoint: 1000,
        settings: {
            centerMode: true,
            arrows: true,
            centerPadding: '40px',
            slidesToShow: 3
        }
    },
    {
        breakpoint: 670,
        settings: {
            centerMode: true,
            arrows: true,
            centerPadding: '40px',
            slidesToShow: 1
        }
    },
    ]
}
function makeMovieCards(movies) {
    return movies.map(element => {
        return `<div class="movie-card" data-id="${element.id}"><img src="${element.poster_path}" loading="lazy" /></div>`;
    }).join('');
}

_overlay.addEventListener("click", removeAllOverlays);
function removeAllOverlays() { 
    removeOverlay();
    _moviePopup.classList.add("invisible");
    _iframe.src = "";
}

// Carousels Display
async function displayTopRatedCarousel() {
    const movies = await moviesServices.getTopRatedIL();
    const carouselItems = makeMovieCards(movies);

    document.querySelector(".top-rated-carousel").innerHTML = carouselItems;

    const slickElement = $('.top-rated-carousel.center');

    slickElement.slick(carouselOptions);

    slickElement.on('click', '.slick-slide.slick-active', function(e) {
        const index = $(this).data('slick-index');
        slickElement.slick('slickGoTo', index);
        handleCardClick(e);
    });
}
async function displayUpcomingCarousel() {
    const movies = await moviesServices.getUpcomingMovies();
    const carouselItems = makeMovieCards(movies);

    document.querySelector(".upcoming-carousel").innerHTML = carouselItems;

    const slickElement = $('.upcoming-carousel');

    slickElement.slick(carouselOptions);

    slickElement.on('click', '.slick-slide.slick-active', function(e) {
        const index = $(this).data('slick-index');
        slickElement.slick('slickGoTo', index);
        handleCardClick(e);
    });
}
async function displayHorrorCarousel() {
    const movies = (await moviesServices.getMovies(1, 27)).movies;
    const carouselItems = makeMovieCards(movies);

    document.querySelector(".horror-carousel").innerHTML = carouselItems;

    const slickElement = $('.horror-carousel');
    slickElement.slick(carouselOptions);

    slickElement.on('click', '.slick-slide.slick-active', function(e) {
        const index = $(this).data('slick-index');
        slickElement.slick('slickGoTo', index);
        handleCardClick(e);
    });
}
async function displayComediesCarousel() {
    const movies = (await moviesServices.getMovies(1, 35)).movies;
    const carouselItems = makeMovieCards(movies);

    document.querySelector(".comedies-carousel").innerHTML = carouselItems;

    const slickElement = $('.comedies-carousel');
    slickElement.slick(carouselOptions);

    slickElement.on('click', '.slick-slide.slick-active', function(e) {
        const index = $(this).data('slick-index');
        slickElement.slick('slickGoTo', index);
        handleCardClick(e);
    });
}
async function displayRomanticCarousel() {
    const movies = (await moviesServices.getMovies(1, 10749)).movies;
    const carouselItems = makeMovieCards(movies);

    document.querySelector(".romantic-carousel").innerHTML = carouselItems;

    const slickElement = $('.romantic-carousel');
    slickElement.slick(carouselOptions);

    slickElement.on('click', '.slick-slide.slick-active', function(e) {
        const index = $(this).data('slick-index');
        slickElement.slick('slickGoTo', index);
        handleCardClick(e);
    });
}
async function displayActionCarousel() {
    const movies = (await moviesServices.getMovies(1, 28)).movies;
    const carouselItems = makeMovieCards(movies);

    document.querySelector(".action-carousel").innerHTML = carouselItems;

    const slickElement = $('.action-carousel');
    slickElement.slick(carouselOptions);

    slickElement.on('click', '.slick-slide.slick-active', function(e) {
        const index = $(this).data('slick-index');
        slickElement.slick('slickGoTo', index);
        handleCardClick(e);
    });
}
async function displayThrillerCarousel() {
    const movies = (await moviesServices.getMovies(1, 53)).movies;
    const carouselItems = makeMovieCards(movies);

    document.querySelector(".thriller-carousel").innerHTML = carouselItems;

    const slickElement = $('.thriller-carousel');
    slickElement.slick(carouselOptions);

    slickElement.on('click', '.slick-slide.slick-active', function(e) {
        const index = $(this).data('slick-index');
        slickElement.slick('slickGoTo', index);
        handleCardClick(e);
    });
}
async function displayScienceFictionCarousel() {
    const movies = (await moviesServices.getMovies(1, 878)).movies;
    const carouselItems = makeMovieCards(movies);

    document.querySelector(".science-fiction-carousel").innerHTML = carouselItems;

    const slickElement = $('.science-fiction-carousel');
    slickElement.slick(carouselOptions);

    slickElement.on('click', '.slick-slide.slick-active', function(e) {
        const index = $(this).data('slick-index');
        slickElement.slick('slickGoTo', index);
        handleCardClick(e);
    });
}
async function displayFantasyCarousel() {
    const movies = (await moviesServices.getMovies(1, 14)).movies;
    const carouselItems = makeMovieCards(movies);

    document.querySelector(".fantasy-carousel").innerHTML = carouselItems;

    const slickElement = $('.fantasy-carousel');
    slickElement.slick(carouselOptions);

    slickElement.on('click', '.slick-slide.slick-active', function(e) {
        const index = $(this).data('slick-index');
        slickElement.slick('slickGoTo', index);
        handleCardClick(e);
    });
}
async function displayFamilyCarousel() {
    const movies = (await moviesServices.getMovies(1, 10751)).movies;
    const carouselItems = makeMovieCards(movies);

    document.querySelector(".family-carousel").innerHTML = carouselItems;

    const slickElement = $('.family-carousel');
    slickElement.slick(carouselOptions);

    slickElement.on('click', '.slick-slide.slick-active', function(e) {
        const index = $(this).data('slick-index');
        slickElement.slick('slickGoTo', index);
        handleCardClick(e);
    });
}
async function displayAdventureCarousel() {
    const movies = (await moviesServices.getMovies(1, 12)).movies;
    const carouselItems = makeMovieCards(movies);

    document.querySelector(".adventure-carousel").innerHTML = carouselItems;

    const slickElement = $('.adventure-carousel');
    slickElement.slick(carouselOptions);

    slickElement.on('click', '.slick-slide.slick-active', function(e) {
        const index = $(this).data('slick-index');
        slickElement.slick('slickGoTo', index);
        handleCardClick(e);
    });
}
async function displayAnimationCarousel() {
    const movies = (await moviesServices.getMovies(1, 16)).movies;
    const carouselItems = makeMovieCards(movies);

    document.querySelector(".animation-carousel").innerHTML = carouselItems;

    const slickElement = $('.animation-carousel');
    slickElement.slick(carouselOptions);

    slickElement.on('click', '.slick-slide.slick-active', function(e) {
        const index = $(this).data('slick-index');
        slickElement.slick('slickGoTo', index);
        handleCardClick(e);
    });
}
async function displayCrimeCarousel() {
    const movies = (await moviesServices.getMovies(1, 80)).movies;
    const carouselItems = makeMovieCards(movies);

    document.querySelector(".crime-carousel").innerHTML = carouselItems;

    const slickElement = $('.crime-carousel');
    slickElement.slick(carouselOptions);

    slickElement.on('click', '.slick-slide.slick-active', function(e) {
        const index = $(this).data('slick-index');
        slickElement.slick('slickGoTo', index);
        handleCardClick(e);
    });
}

function createObserver(selector, callback) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback();
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // Use the viewport as the root
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    const element = document.querySelector(selector);
    if (element) {
        observer.observe(element);
    }
}
$(document).ready(() => {
    createObserver('.top-rated-carousel', displayTopRatedCarousel);
    createObserver('.upcoming-carousel', displayUpcomingCarousel);
    createObserver('.horror-carousel', displayHorrorCarousel);
    createObserver('.comedies-carousel', displayComediesCarousel);
    createObserver('.romantic-carousel', displayRomanticCarousel);
    createObserver('.action-carousel', displayActionCarousel);
    createObserver('.thriller-carousel', displayThrillerCarousel);
    createObserver('.science-fiction-carousel', displayScienceFictionCarousel);
    createObserver('.fantasy-carousel', displayFantasyCarousel);
    createObserver('.family-carousel', displayFamilyCarousel);
    createObserver('.adventure-carousel', displayAdventureCarousel);
    createObserver('.animation-carousel', displayAnimationCarousel);
    createObserver('.crime-carousel', displayCrimeCarousel);
});

