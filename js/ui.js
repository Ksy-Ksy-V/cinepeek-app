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

//Highlight active link
function highlightActiveLink(e) {
	const links = document.querySelectorAll('.nav-link');
	links.forEach((link) => {
		if (link.getAttribute('href') === global.currentPage) {
			link.classList.add('active');
		}
	});
}
