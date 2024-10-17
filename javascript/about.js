import { removeOverlay, _overlay } from './Components/nav.js'
import './Components/footer.js'
import './Components/loading.js'

_overlay.addEventListener("click", removeAllOverlays);
function removeAllOverlays() { 
    removeOverlay();
}
