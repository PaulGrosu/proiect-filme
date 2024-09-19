document.addEventListener('DOMContentLoaded', function() {
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    const apiKey = 'f5d44386cd620242b1740754aaa259b6';
    let currentPage = 1;
    const moviesContainer = document.getElementById('movies');
    const pageNumSpan = document.querySelector('.page-num');

    function loadMovies(page) {
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${page}`, options)
            .then(response => response.json())
            .then(response => {
                const movies = response.results;
                moviesContainer.innerHTML = '';
                    movies.forEach(movie => {
                    const movieElement = document.createElement('div');
                    movieElement.classList.add('col-md-3', 'movie');
                    movieElement.innerHTML = `
                        <a href="movie-details.html?id=${movie.id}">
                            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="img-fluid rounded shadow mb-2">
                        </a>
                        <h3>${movie.title}</h3>
                        <p>${movie.overview}</p>
                    `;
                    moviesContainer.appendChild(movieElement);
                });

                pageNumSpan.textContent = page;
                window.scrollTo({ top: 0, behavior: 'smooth' });
            })
            .catch(err => console.error(err));
    }

    loadMovies(currentPage);

    document.querySelector('.prev-page').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            loadMovies(currentPage);
        }
    });

    document.querySelector('.next-page').addEventListener('click', function() {
        currentPage++;
        loadMovies(currentPage);
    });
});
