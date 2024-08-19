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
