const options = {
    method: 'POST',
    headers: { accept: 'application/json' }
};

fetch('http://localhost:5269', options)
.then(response => console.log(response));

fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=f5d44386cd620242b1740754aaa259b6&language=en-US', options)
    .then(response => response.json())
    .then(response => {
        const movies = response.results;
        let carouselInner = document.querySelector('.carousel-inner');

        movies.forEach((movie, index) => {
            let activeClass = index === 0 ? 'active' : '';
            let carouselItem = `
                <div class="carousel-item ${activeClass}">
                    <img class="d-block w-100" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                </div>
            `;
            carouselInner.innerHTML += carouselItem;
        });
    })
    .catch(err => console.error(err));