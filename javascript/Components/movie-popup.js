import { showOverlay } from "./header.js";
import moviesService from '.././movies.services.js'

const _moviePopup = document.getElementById("movie-popup");
const _iframe = _moviePopup.querySelector("iframe");
const _crewContainer = _moviePopup.querySelector(".crew-container");

async function handleCardClick(e) {
    const movieId = e.target.closest(".movie-card").dataset.id;
    showOverlay();
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
    }).join('');
    _crewContainer.innerHTML = persons;
}

export { handleCardClick, _moviePopup, _iframe };