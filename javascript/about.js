import { removeOverlay, _overlay } from './Components/nav.js'
import './Components/footer.js'
import './Components/loading.js'

_overlay.addEventListener("click", removeAllOverlays);
function removeAllOverlays() { 
    removeOverlay();
}

const _main = document.querySelector("main");
const _details = document.querySelector('.details');
const _textarea = document.querySelector("textarea");
const _poda = document.querySelector('#poda');
const _sendButton = document.querySelector(".send-button");

_main.style.height = _details.getBoundingClientRect().height + "px";

_details.addEventListener('mouseenter', () => _poda.classList.add('hover'));
_details.addEventListener('mouseleave', () => _poda.classList.remove('hover'));
_textarea.addEventListener('mouseenter', () => _poda.classList.remove('hover'));
_textarea.addEventListener('mouseleave', () => _poda.classList.add('hover'));
window.addEventListener('resize', handleWindowResize);

function handleWindowResize() {
    _main.style.height = _details.getBoundingClientRect().height + "px";
}

_sendButton.addEventListener("click", (e) => {
    const textarea = e.target.parentElement.querySelector("textarea");
    if(textarea.value === '') return;
    const text = textarea.value;
    textarea.value = '';

    if(!localStorage.getItem("feedback"))
        localStorage.setItem("feedback", JSON.stringify([]));
    const feedback = JSON.parse(localStorage.getItem("feedback"));
    feedback.push(text);
    localStorage.setItem("feedback", JSON.stringify(feedback));
})
