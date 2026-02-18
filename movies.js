const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const moviesContainer = document.getElementById('moviesContainer');
const error = document.getElementById('error');

async function searchMovies(query) {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );
        
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            displayMovies(data.results);
            error.classList.add('hidden');
        } else {
            showError('No movies found. Try another search.');
        }
    } catch (err) {
        showError('Error fetching movies. Please try again.');
    }
}

function displayMovies(movies) {
    moviesContainer.innerHTML = '';
    
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        
        const posterUrl = movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/300x450?text=No+Poster';
        
        movieCard.innerHTML = `
            <img src="${posterUrl}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p class="year">${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
                <p class="rating">⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
                <p class="overview">${movie.overview || 'No description available.'}</p>
            </div>
        `;
        
        moviesContainer.appendChild(movieCard);
    });
}

function showError(message) {
    error.textContent = message;
    error.classList.remove('hidden');
    moviesContainer.innerHTML = '';
}

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        searchMovies(query);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            searchMovies(query);
        }
    }
});
