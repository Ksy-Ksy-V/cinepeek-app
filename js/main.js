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
