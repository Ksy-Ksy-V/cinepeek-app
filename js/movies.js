// Display 20 most popular movies
async function displaylayPopularMovies() {
	const { results } = await fetchAPIDate('movie/popular');

	results.forEach((movie) => {
		const div = document.createElement('div');
		div.classList.add('card');
		div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
      ${
			movie.poster_path
				? `<img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
      />`
				: `<img
      src="../images/no-image.jpg"
      class="card-img-top"
      alt="${movie.title}"
    />`
		}
    </a>
    <div class="card-body">
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}</small>
      </p>
    </div>
    `;

		document.querySelector('#popular-movies').appendChild(div);
	});
}

// Display movie details

async function displayMovieDetails() {
	const movieId = window.location.search.split('=')[1];

	const movie = await fetchAPIDate(`movie/${movieId}`);

	// Overlay for background image
	displayBackgroundImage('movie', movie.backdrop_path);

	const div = document.createElement('div');

	div.innerHTML = ` 
  <div class="details-top">
    <div>
    ${
		movie.poster_path
			? `<img
      src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
      class="card-img-top"
      alt="${movie.title}"
    />`
			: `<img
    src="../images/no-image.jpg"
    class="card-img-top"
    alt="${movie.title}"
  />`
	}
    </div>
    <div>
    <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
        ${movie.overview}
      </p>

      <ul class="list-group">
      <div>
      ${
			movie.genres && movie.genres.length > 0
				? `<h5>Genres:</h5>
             <span>${movie.genres.map((genre) => genre.name).join(', ')}</span>`
				: ''
		}
      </div>
      </ul>
      
      <a href="${
			movie.homepage
		}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
			movie.budget
		)} </li>
      <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
			movie.revenue
		)} </li>
      <li><span class="text-secondary">Runtime:</span> ${
			movie.runtime
		} minutes</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
      </ul>
    <h4>Production Companies</h4>
    <div class="list-group">  ${movie.production_companies
		.map((company) => `<span>${company.name}</span>`)
		.join(', ')}</div>
  </div>`;

	document.querySelector('#movie-details').appendChild(div);
}
