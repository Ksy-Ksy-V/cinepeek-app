const global = {
    currentPage: window.location.pathname,
  };

  async function displaylayPopularMovies () {
    const { results } = await fetchAPIDate("movie/popular")
    
    results.forEach(movie => {
        const div = document.createElement("div");
        div.classList.add("card");
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

      document.querySelector("#popular-movies").appendChild(div);
    });
}

  // Fecht data from TMDN API 
  async function fetchAPIDate(endpoint) {
    const API_KEY = "c9953b66ef21cf52774520b2b553fe55";
    const API_URL = 'https://api.themoviedb.org/3/';

    const response = await fetch(
        `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`, 
        );

    const data = await response.json();

    return data;
  }

  //Highlight active link 
  function highlightActiveLink(e) {
     const links = document.querySelectorAll(".nav-link");
     links.forEach((link) => {
        if (link.getAttribute("href") === global.currentPage) {
            link.classList.add("active");
            }
     })
  }

  // Init App 

function init() {
    switch (global.currentPage) {
        case "/":
        case "/index.html":
            displaylayPopularMovies();
            break;
        case "/shows.html":
            console.log("Shows");
            break;   
        case "/movie-details.html":
            console.log("Movie Details");
            break;   
        case "/tv-details.html":
            console.log("TV Details");
            break; 
        case "/search.html":
            console.log("Search");
            break;  
    }

    highlightActiveLink(); 
}

document.addEventListener("DOMContentLoaded", init);


