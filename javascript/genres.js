import moviesServices from './movies.services.js';
import { removeOverlay } from './Components/header.js'
import { handleCardClick , _moviePopup, _iframe  } from './Components/movie-popup.js';

const carouselOptions = {
    centerMode: true,
    arrows: true,
    centerPadding: '60px',
    slidesToShow: 7,
    prevArrow: "<button type='button' class='slick-prev'><i class='fa-solid fa-angles-left slide-button'></i></button>",
    nextArrow: "<button type='button' class='slick-next'><i class='fa-solid fa-angles-right slide-button'></i></button>",
    responsive:[
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

// Loading
const loadingOverlay = document.getElementById('loading-overlay');
if (loadingOverlay)
    loadingOverlay.style.display = 'none';

const _overlay = document.getElementById("overlay");

_overlay.addEventListener("click", () => {
    removeOverlay();
    _moviePopup.classList.add("invisible");
    _iframe.src = "";
});

async function displayTopRatedCarousel() {
    const movies = await moviesServices.getTopRatedIL();
    const carouselItems = movies.map(element => {
        return `<div class="movie-card" data-id="${element.id}"><img src="${element.poster_path}" loading="lazy" /></div>`;
    }).join('');

    const topRatedCarousel = document.querySelector(".top-rated-carousel");
    topRatedCarousel.innerHTML = carouselItems;

    const slickElement = $('.top-rated-carousel.center');

    slickElement.slick(carouselOptions);

    slickElement.on('click', '.slick-slide.slick-active', function(e) {
        const index = $(this).data('slick-index');
        slickElement.slick('slickGoTo', index);
        handleCardClick(e);
    });
}
async function upcomingCarousel() {
    const movies = await moviesServices.getUpcomingMovies();
    const carouselItems = movies.map(element => {
        return `<div class="movie-card" data-id="${element.id}"><img src="${element.poster_path}" loading="lazy" /></div>`;
    }).join('');

    const topRatedCarousel = document.querySelector(".upcoming-carousel");
    topRatedCarousel.innerHTML = carouselItems;

    const slickElement = $('.upcoming-carousel');

    slickElement.slick(carouselOptions);

    slickElement.on('click', '.slick-slide.slick-active', function(e) {
        const index = $(this).data('slick-index');
        slickElement.slick('slickGoTo', index);
        handleCardClick(e);
    });
}
$(document).ready(function() {
    displayTopRatedCarousel();
    upcomingCarousel();
});

// document.querySelector(".movie-card").addEventListener("click", (e) => handleCardClick(e))
