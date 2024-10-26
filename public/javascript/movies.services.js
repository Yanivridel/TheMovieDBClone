
let bearerToken;

async function initialize() {
    try {
        const response = await fetch('/api/token');
        const data = await response.json();
        bearerToken = data.bearerToken;
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}
await initialize();

const baseApiUrl = "https://api.themoviedb.org/3";
const basePosterUrl = "https://image.tmdb.org/t/p/w500";
const baseBannerUrl = "http://image.tmdb.org/t/p/original/";
const baseVideoUrl = "https://www.youtube.com/embed/";
const accountId = "21563515";
const _genres = await getGenres();
let currPage = 1;

// console.log(_genres);

function getMovies(page, genre) {
    return fetch(`${baseApiUrl}/discover/movie?page=${page}${genre ? `&with_genres=${genre}` : ""}`,{
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const maxPage = data.total_pages;
        const movies = data.results;
        setMovieImages(movies);
        return {movies, maxPage};
    })
    .catch(err => console.log("Error Fetching Movies: " + err));
}
// console.log(await getMovies(1, 9648));
function getGenres() {
    return fetch(`${baseApiUrl}/genre/movie/list`,{
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data =>  data.genres)
    .catch(err => console.log("Error Fetching Movies: " + err));
}
function getGenreById(genreId) {
    for (const element of _genres)
        if(element.id === genreId) return element.name;
    return null;
}
// console.log(getGenreById(28));
function getMovieCredits(movieId) {
    return fetch(`${baseApiUrl}/movie/${movieId}/credits`,{
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data =>  {
        const crew = data.cast;
        crew.forEach(element => {
            element.profile_path = element.profile_path ?
            `${basePosterUrl}${element.profile_path}` :
            './../assets/unknow-crew.png'
        })
        return crew;
        })
    .catch(err => console.log("Error Fetching Movies: " + err));
}
// console.log(await getMovieCredits(533535)); 

function setMovieImages(movies) {
    movies.forEach(movie => {
        if(movie.poster_path)
            movie.poster_path = `${basePosterUrl}${movie.poster_path}`;
        else
            movie.poster_path = './../assets/no-poster.png';
        movie.backdrop_path = `${baseBannerUrl}${movie.backdrop_path}`;
    });
    return movies;
}
function getMovieVideos(movieId) {
    return fetch(`${baseApiUrl}/movie/${movieId}/videos`,{
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const videos = data.results;
        videos.forEach(element => element.key = `${baseVideoUrl}${element.key}`);
        return videos;
    })
    .catch(err => console.log("Error Fetching Movies: " + err));
}
// console.log(await getMovieVideos(933260));


function getFavoriteMovies(page) {
    return fetch(`${baseApiUrl}/account/${accountId}/favorite/movies?page=${page}`,{
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const maxPage = data.total_pages;
        const movies = data.results;
        setMovieImages(movies);
        return {movies, maxPage};
    })
    .catch(err => console.log("Error Fetching Movies: " + err));
}
// console.log(await getFavoriteMovies());

function setFavoriteMovie(movieId, action) {
    action = action === "add" ? true : false;
    fetch(`${baseApiUrl}/account/${accountId}/favorite`,{
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(
        {
            media_type: "movie",
            media_id: movieId,
            favorite: action
        })
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data)
    })
    .catch(err => console.log("Error Fetching Movies: " + err));
}

// setFavoriteMovie(1362217,"add");
function getMoviesByText(text,page) {
    return fetch(`${baseApiUrl}/search/movie?query="${text}"&page=${page}`,{
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const maxPage = data.total_pages;
        const movies = data.results;
        setMovieImages(movies);
        return  {movies, maxPage};
    })
    .catch(err => console.log("Error Fetching Movies: " + err));
}
// console.log(await getMoviesByText("deadpool"));

function getTopRatedIL() {
    return fetch(`${baseApiUrl}/movie/top_rated?region=IL`,{
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const movies = data.results;
        setMovieImages(movies);
        return movies;
    })
    .catch(err => console.log("Error Fetching Movies: " + err));
}
// console.log(await getTopRatedIL());
function getUpcomingMovies() {
    return fetch(`${baseApiUrl}/movie/upcoming`,{
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const movies = data.results;
        setMovieImages(movies);
        return movies;
    })
    .catch(err => console.log("Error Fetching Movies: " + err));
}

export default {
    getFavoriteMovies,
    getGenreById,
    getTopRatedIL,
    getMovieCredits,
    getMovieVideos,
    getUpcomingMovies,
    getMovies,
    setFavoriteMovie,
    getMoviesByText,
    getGenreById
};