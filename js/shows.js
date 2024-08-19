// Display 20 most popular TV shows
async function displaylayPopularShows() {
	const { results } = await fetchAPIDate('tv/popular');

	results.forEach((show) => {
		const div = document.createElement('div');
		div.classList.add('card');
		div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
          ${
				show.poster_path
					? `<img
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="${show.name}"
          />`
					: `<img
          src="../images/no-image.jpg"
          class="card-img-top"
          alt="${show.name}"
        />`
			}
        </a>
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">
            <small class="text-muted">Air data: ${show.first_air_data}</small>
          </p>
        </div>
        `;

		document.querySelector('#popular-shows').appendChild(div);
	});
}

// Display TV Shows details
async function displayShowDetails() {
	const showId = window.location.search.split('=')[1];

	const show = await fetchAPIDate(`tv/${showId}`);

	// Overlay for background image
	displayBackgroundImage('tv', show.backdrop_path);

	const div = document.createElement('div');

	div.innerHTML = ` 
<div class="details-top">
  <div>
  ${
		show.poster_path
			? `<img
    src="https://image.tmdb.org/t/p/w500${show.poster_path}"
    class="card-img-top"
    alt="${show.name}"
  />`
			: `<img
  src="../images/no-image.jpg"
  class="card-img-top"
  alt="${show.name}"
/>`
  }
  </div>
  <div>
      <h2>${show.name}</h2>
        <p>
          <i class="fas fa-star text-primary"></i>
          ${show.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">Air data: ${show.last_air_date}</p>
        <p>
          ${show.overview}
        </p> 
      
        <ul class="list-group">
        <div>
        ${
			show.genres && show.genres.length > 0
				? `<div>
                 <h5>Genres:</h5>
                 <span>${show.genres
						.map((genre) => genre.name)
						.join(', ')}</span>
               </div>`
				: ''
		}
        </div>
        </ul>

        <a href="${
			show.homepage
		}" target="_blank" class="btn">Visit Show Homepage</a>
      </div>
  </div>

  <div class="details-bottom">
    <h2>Show Info</h2>
   <ul>
    <li><span class="text-secondary">Number of Episodes:</span> ${
		show.number_of_episodes
	} </li>
    <li><span class="text-secondary">Last Episode To Air:</span> ${
		show.last_episode_to_air.name
	}</li>
    <li><span class="text-secondary">Status:</span> ${show.status}</li>
    </ul>
  <h4>Production Companies</h4>
  <div class="list-group">  ${show.production_companies
		.map((company) => `<span>${company.name}</span>`)
		.join(', ')}</div>
</div>`;

	document.querySelector('#show-details').appendChild(div);
}
