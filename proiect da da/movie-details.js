document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'f5d44386cd620242b1740754aaa259b6';
    const movieId = new URLSearchParams(window.location.search).get('id');
    const movieTitle = document.getElementById('movie-title');
    const moviePoster = document.getElementById('movie-poster');
    const movieOverview = document.getElementById('movie-overview');
    const movieRating = document.getElementById('movie-rating');
    const movieGenre = document.getElementById('movie-genre');
    const movieReleaseDate = document.getElementById('movie-release-date');
    const movieTrailer = document.getElementById('movie-trailer');
    const actorsList = document.getElementById('actors-list');
    const commentsList = document.getElementById('comments-list');
    const commentForm = document.getElementById('comment-form');
    const ratingForm = document.getElementById('rating-form');

      fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
        .then(response => response.json())
        .then(movie => {
            movieTitle.textContent = movie.title;
            moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            moviePoster.alt = movie.title;
            movieOverview.textContent = movie.overview;
            movieRating.textContent = movie.vote_average;
            movieGenre.textContent = movie.genres.map(genre => genre.name).join(', ');
            movieReleaseDate.textContent = new Date(movie.release_date).toDateString();
        })
        .catch(err => console.error(err));

      fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`)
        .then(response => response.json())
        .then(data => {
            const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
            if (trailer) {
                movieTrailer.src = `https://www.youtube.com/embed/${trailer.key}`;
            } else {
                movieTrailer.parentElement.innerHTML = '<p>No trailer available.</p>';
            }
        })
        .catch(err => console.error(err));

      fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`)
        .then(response => response.json())
        .then(data => {
            const topActors = data.cast.slice(0, 4); 
               topActors.forEach(actor => {
                const actorCard = document.createElement('div');
                actorCard.className = 'col-md-3 mb-4';
                actorCard.innerHTML = `
                    <div class="card">
                        <img src="https://image.tmdb.org/t/p/w200${actor.profile_path}" class="card-img-top" alt="${actor.name}">
                        <div class="card-body">
                            <h5 class="card-title">${actor.name}</h5>
                            <p class="card-text">${actor.character}</p>
                            <p class="card-text"><small class="text-muted">${actor.gender === 1 ? 'Female' : actor.gender === 2 ? 'Male' : 'Unknown'}</small></p>
                        </div>
                    </div>
                `;
                actorsList.appendChild(actorCard);
            });
        })
        .catch(err => console.error(err));

       function loadComments() {
          commentsList.innerHTML = '<li>No comments yet.</li>';
    }

     commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const commentText = document.getElementById('comment').value;
          const commentItem = document.createElement('li');
        commentItem.textContent = commentText;
        commentsList.appendChild(commentItem);
        commentForm.reset();
    });

     ratingForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const ratingValue = document.getElementById('rating').value;
            console.log(`You rated this movie: ${ratingValue}`);
        ratingForm.reset();
    });

    loadComments();
});
