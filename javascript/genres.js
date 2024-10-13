import { removeOverlay } from './Components/header.js'
import { handleCardClick , _moviePopup, _iframe  } from './Components/movie-popup.js';


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

// document.querySelector(".movie-card").addEventListener("click", (e) => handleCardClick(e))
