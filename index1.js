const apiKey = 'd5c30f800a219d0c0a82321bd06c97c3';
const searchInput = document.querySelector('.navbar-search input');
const moviesContainer = document.getElementById('movies');

function fetchMovies() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results);
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

function displayMovies(movies) {
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesContainer.appendChild(movieCard);
    });
}

function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    const moviePoster = document.createElement('img');
    moviePoster.classList.add('movie-poster');
    moviePoster.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

    const movieDetails = document.createElement('div');
    movieDetails.classList.add('movie-details');

    const movieRating = document.createElement('p');
    movieRating.classList.add('movie-rating');
    movieRating.textContent = `Rating: ${movie.vote_average}`;

    const movieTitle = document.createElement('p');
    movieTitle.classList.add('movie-title');
    movieTitle.textContent = movie.title;

    const movieGenre = document.createElement('p');
    movieGenre.classList.add('movie-genre');
    movieGenre.textContent = movie.genre;

    movieDetails.appendChild(movieRating);
    movieDetails.appendChild(movieTitle);
    movieDetails.appendChild(movieGenre);

    movieCard.appendChild(moviePoster);
    movieCard.appendChild(movieDetails);

    return movieCard;
}

searchInput.addEventListener('input', () => {
    const searchQuery = searchInput.value.toLowerCase();
    const movieCards = document.querySelectorAll('.movie-card');
    
    movieCards.forEach(movieCard => {
        const movieTitle = movieCard.querySelector('.movie-title').textContent.toLowerCase();
        if (movieTitle.includes(searchQuery)) {
            movieCard.style.display = 'block';
        } else {
            movieCard.style.display = 'none';
        }
    });
});

fetchMovies();
