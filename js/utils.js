// Spinner

function showSpinner() {
	document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
	document.querySelector('.spinner').classList.remove('show');
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

// Show Alert

function showAlert(message, className = 'error') {
	const alertEl = document.createElement('div');
	alertEl.classList.add('alert', className);
	alertEl.appendChild(document.createTextNode(message));
	document.querySelector('#alert').appendChild(alertEl);

	setTimeout(() => alertEl.remove(), 3000);
}

//Numbers

function addCommasToNumber(number) {
	return number.toLocaleString();
}

//NumbersSelect Options

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
