document.addEventListener('DOMContentLoaded', function() {
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    const apiKey = 'f5d44386cd620242b1740754aaa259b6';
    const movieListSection = document.querySelector('.movie-list .row');
    let currentPage = 1;

    function loadMovies(page) {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`, options)
            .then(response => response.json())
            .then(data => {
                const movies = data.results;
                let movieItems = '';
                movies.forEach(movie => {
                    movieItems += `
                        <div class="col-md-3 mb-4">
                            <a href="movie-details.html?id=${movie.id}">
                                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="img-fluid rounded shadow mb-2">
                            </a>
                            <h3>${movie.title}</h3>
                            <p>${movie.overview}</p>
                        </div>
                    `;
                });
                movieListSection.innerHTML = movieItems;

                document.querySelector('.page-num').textContent = page;
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
