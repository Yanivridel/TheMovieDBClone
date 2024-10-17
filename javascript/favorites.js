import moviesService from './movies.services.js'
import { removeOverlay, _overlay } from './Components/nav.js'
import { handleCardClick , _moviePopup, _iframe, _movieClose  } from './Components/movie-popup.js';
import './Components/footer.js'
import './Components/loading.js'

const favorites = await moviesService.getFavoriteMovies();

_overlay.addEventListener("click", removeAllOverlays);
_movieClose.addEventListener("click", removeAllOverlays);
function removeAllOverlays() { 
    removeOverlay();
    _moviePopup.classList.add("invisible");
    _iframe.src = "";
}
