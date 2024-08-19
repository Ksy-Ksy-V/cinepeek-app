const global = {
	currentPage: window.location.pathname,
	search: {
		term: '',
		type: '',
		page: 1,
		totalPages: 1,
		totalResults: 0,
	},
	api: {
		apiKey: 'c9953b66ef21cf52774520b2b553fe55',
		apiUrl: 'https://api.themoviedb.org/3/',
	},
};

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

// Display backdrop on details pages
function displayBackgroundImage(type, backgroundPath) {
	const overlayDiv = document.createElement('div');
	overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
	overlayDiv.style.backgroundSize = 'cover';
	overlayDiv.style.backgroundPosition = 'center';
	overlayDiv.style.backgroundRepeat = 'no-repeat';
	overlayDiv.style.height = '100vh';
	overlayDiv.style.width = '100vw';
	overlayDiv.style.backgroundAttachment = 'fixed';
	overlayDiv.style.position = 'fixed';
	overlayDiv.style.top = '0';
	overlayDiv.style.left = '0';
	overlayDiv.style.zIndex = '-1';
	overlayDiv.style.opacity = '0.1';

	if (type === 'movie') {
		document.querySelector('#movie-details').appendChild(overlayDiv);
	} else {
		document.querySelector('#show-details').appendChild(overlayDiv);
	}
}

// Search Movies/shows

async function search() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);

	global.search.type = urlParams.get('type');
	global.search.term = urlParams.get('search-term');

	if (global.search.term !== '' && global.search.term !== null) {
		const { results, total_pages, page, total_results } =
			await searchAPIDate();

		global.search.page = page;
		global.search.totalPages = total_pages;
		global.search.totalResults = total_results;

		if (results.length === 0) {
			showAlert('No results found');
			return;
		}

		displaySearchResults(results);
	} else {
		showAlert('Please enter a search term');
	}
}

document.querySelectorAll('input[name="type"]').forEach((input) => {
	input.addEventListener('change', () => {
		document.querySelector('.search-form').submit();
	});
});

function setSelectedSearchOptions() {
	const urlParams = new URLSearchParams(window.location.search);
	const searchType = urlParams.get('type');
	const searchTerm = urlParams.get('search-term');

	if (searchType) {
		document.getElementById(searchType).checked = true;
	}

	if (searchTerm) {
		document.getElementById('search-term').value = searchTerm;
	}
}

function displaySearchResults(results) {
	//Clear prev res

	document.querySelector('#search-results').innerHTML = '';
	document.querySelector('#search-results-heading').innerHTML = '';
	// document.querySelector("#pagination").innerHTML = "";
	document.querySelector('#pagination-top').innerHTML = '';
	document.querySelector('#pagination-bottom').innerHTML = '';

	results.forEach((result) => {
		const div = document.createElement('div');
		div.classList.add('card');
		div.innerHTML = `
    <a href="${global.search.type}-details.html?id=${result.id}">
    ${
		result.poster_path
			? `<img
      src="https://image.tmdb.org/t/p/w500${result.poster_path}"
      class="card-img-top"
      alt="${global.search.type === 'movie' ? result.title : result.name}"
    />`
			: `<img
    src="../images/no-image.jpg"
    class="card-img-top"
    alt="${global.search.type === 'movie' ? result.title : result.name}"
    />`
	}
  </a>
  <div class="card-body">
    <h5 class="card-title">${
		global.search.type === 'movie' ? result.title : result.name
	}</h5>
    <p class="card-text">
      <small class="text-muted">Release: ${
			global.search.type === 'movie'
				? result.release_date
				: result.first_air_date
		}</small>
    </p>
  </div>
  `;

		document.querySelector('#search-results-heading').innerHTML = `
    <h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>
  `;

		document.querySelector('#search-results').appendChild(div);
	});

	displayPagination();
}

//Pagination for search

function displayPagination() {
	if (global.search.totalPages <= 1) {
		return;
	}

	const div = document.createElement('div');
	div.classList.add('pagination');
	div.innerHTML = `
  <button class="btn btn-primary" id="prev-bottom">Prev</button>
  <button class="btn btn-primary" id="next-bottom">Next</button>
  <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div> 
  `;

	const divTop = document.createElement('div');
	divTop.classList.add('pagination');
	divTop.innerHTML = `
  <button class="btn btn-primary" id="prev-top">Prev</button>
  <button class="btn btn-primary" id="next-top">Next</button>
  <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div> 
  `;

	document.querySelector('#pagination-top').appendChild(divTop);
	document.querySelector('#pagination-bottom').appendChild(div);

	if (global.search.page === 1) {
		document.querySelector('#prev-top').disabled = true;
		document.querySelector('#prev-bottom').disabled = true;
	}

	if (global.search.page === global.search.totalPages) {
		document.querySelector('#next-top').disabled = true;
		document.querySelector('#next-bottom').disabled = true;
	}

	//Next page
	document.querySelector('#next-top').addEventListener('click', async () => {
		global.search.page++;
		const { results } = await searchAPIDate();
		displaySearchResults(results);
		topFunction();
	});

	// Prev page
	document.querySelector('#prev-top').addEventListener('click', async () => {
		global.search.page--;
		const { results } = await searchAPIDate();
		displaySearchResults(results);
		topFunction();
	});

	document
		.querySelector('#next-bottom')
		.addEventListener('click', async () => {
			global.search.page++;
			const { results } = await searchAPIDate();
			displaySearchResults(results);
			topFunction();
		});

	// Prev page
	document
		.querySelector('#prev-bottom')
		.addEventListener('click', async () => {
			global.search.page--;
			const { results } = await searchAPIDate();
			displaySearchResults(results);
			topFunction();
		});
}

// Display Slider Movies

async function displaySlider() {
	const { results } = await fetchAPIDate('movie/now_playing');
	results.forEach((movie) => {
		const div = document.createElement('div');
		div.classList.add('swiper-slide');

		div.innerHTML = `  
    <a href="movie-details.html?id=${movie.id}">
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
			movie.title
		}" />
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(
			1
		)} / 10
    </h4>
    `;

		document.querySelector('.swiper-wrapper').appendChild(div);

		initSwiper();
	});
}

function initSwiper() {
	const swiper = new Swiper('.swiper', {
		slidesPerView: 1,
		spaceBetween: 30,
		freeMode: true,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		breakpoints: {
			500: {
				slidesPerView: 2,
			},
			700: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4,
			},
		},
	});
}

// Fecht data from TMDN API
async function fetchAPIDate(endpoint) {
	const API_KEY = global.api.apiKey;
	const API_URL = global.api.apiUrl;

	showSpinner();

	const response = await fetch(
		`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
	);

	const data = await response.json();

	hideSpinner();

	return data;
}

// Make request to screach
async function searchAPIDate() {
	const API_KEY = global.api.apiKey;
	const API_URL = global.api.apiUrl;

	showSpinner();

	const response = await fetch(
		`${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
	);

	const data = await response.json();

	hideSpinner();

	return data;
}

// Spinner

function showSpinner() {
	document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
	document.querySelector('.spinner').classList.remove('show');
}

//Highlight active link
function highlightActiveLink(e) {
	const links = document.querySelectorAll('.nav-link');
	links.forEach((link) => {
		if (link.getAttribute('href') === global.currentPage) {
			link.classList.add('active');
		}
	});
}

// Show Alert
function showAlert(message, className = 'error') {
	const alertEl = document.createElement('div');
	alertEl.classList.add('alert', className);
	alertEl.appendChild(document.createTextNode(message));
	document.querySelector('#alert').appendChild(alertEl);

	setTimeout(() => alertEl.remove(), 3000);
}

function addCommasToNumber(number) {
	return number.toLocaleString();
}

// Top button:

function topBtn() {
	const topButton = document.getElementById('top-button');

	window.onscroll = function () {
		scrollFunction();
	};

	function scrollFunction() {
		if (
			document.body.scrollTop > 40 ||
			document.documentElement.scrollTop > 40
		) {
			topButton.classList.add('show');
		} else {
			topButton.classList.remove('show');
		}
	}
}

function topFunction() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
}

// Init App

function init() {
	switch (global.currentPage) {
		case '/':
		case '/index.html':
			displaySlider();
			displaylayPopularMovies();
			break;
		case '/shows.html':
			displaylayPopularShows();
			break;
		case '/movie-details.html':
			displayMovieDetails();
			break;
		case '/tv-details.html':
			displayShowDetails();
			break;
		case '/search.html':
			search();
			break;
	}

	highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);

document.addEventListener('DOMContentLoaded', topBtn);

document.addEventListener('DOMContentLoaded', setSelectedSearchOptions);
