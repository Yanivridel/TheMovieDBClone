
const _nav = document.querySelector("nav");
_nav.innerHTML = 
`
<div class="nav-logo-menu-bar">
<div class="logo">
    <img src="./../assets/tmdb_icon.png" alt="main logo" />
</div>
<div class="menu-bar" onclick="">
    <img src="./../assets/icon-menu.png" style="width: 35px;" alt="icon menu"/>
</div>
</div>
<!--** Hidden Mobile **-->
<div class="nav-menu" id="nav-menu">
    <div class="close-menu-icon" onclick="">
        <img src="./../assets/icon-close-menu.png" style="width: 50px; height: 40px;" alt="close icon menu" />
    </div>
    <!-- Nav Items -->
    <div class="nav-menu-item-container">
        <a href="./index.html" class="home nav-item" tabindex="1">Home</a>
        <a href="./genres.html" class="genres nav-item">Genres</a>
        <a href="./favorites.html" class="nav-item" tabindex="3">Favorites</a>
        <a href="./about.html" class="nav-item" tabindex="4">About</a>
    </div>
</div>
</div>
`
const _menuBar = document.querySelector('.menu-bar');
const _navMenu = document.getElementById('nav-menu');
const _closeMenuBar = document.querySelector('.close-menu-icon');
const _overlay = document.getElementById("overlay");

_menuBar.addEventListener('click', () => {
    _navMenu.classList.add('show');
    _overlay.classList.add("active");
});
_closeMenuBar.addEventListener('click', () => {
    _navMenu.classList.remove('show');
    _overlay.classList.remove("active");
});

function removeOverlay() {
    _overlay.classList.remove('active');
    _navMenu.classList.remove('show');
}
function showOverlay() {
    _overlay.classList.add('active');
}


export { removeOverlay, showOverlay, _overlay };