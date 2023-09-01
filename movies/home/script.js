const apiKey = "2d226abf329b9bdd81cb132489e6a1a6";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";

// ${url}/trending/all/week?api_key=${apikey}&language=en-US

const apiPath = {
  fetchAllCategories: `${url}/genre/tv/list?api_key=${apiKey}`,

  fectchMovieList: (id) =>
    `${url}/discover/movie?api_key=${apiKey}&with_genres=${id}`,

  fetchTrendingMovies: `${url}/trending/movie/week?api_key=${apiKey}`,
};

function init() {
  fetchTrendingMovies();
  fethAndBuildAllSection();
}

async function fetchTrendingMovies() {
  try {
    const res = await fetch(apiPath.fetchTrendingMovies);
    // console.log(res);
    const data = await res.json();
    // console.log(data);
    const randomIndex = Math.floor(Math.random() * data.results.length);
    // console.log(randomIndex);
    const randomMovie = data.results[randomIndex];
    bulidBannerSection(randomMovie);
  } catch (err) {
    console.log(err);
  }
}

// Build Banner Section

function bulidBannerSection(movie) {
  const bannerSectionEl = document.getElementById("banner-section");
  bannerSectionEl.style.backgroundImage = `url(
    '${imgUrl}${movie.backdrop_path}'
  )`;
  bannerSectionEl.style.color = "red";
  const bannerContent = `
    <div class="banner-content">
        <h2 class="banner-title">${movie.original_title}</h2>
        <p class="banner-info">Trending Movie Realeaed "${movie.release_date}"</p>
        <p class="banner-overview">${movie.overview}</p>
        <div class="button-container">
            <button class="play">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="ltr-0 e1mhci4z1" data-name="Play" aria-hidden="true">
                    <path
                        d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z"
                        fill="currentColor"></path>
                </svg>Play
            </button>
            <button class="more-info">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="ltr-0 e1mhci4z1" data-name="CircleI" aria-hidden="true">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z"
                        fill="currentColor"></path>
                </svg>
                More Info
            </button>
    </div>
    </div>
    <div class="banner-feedBottom"></div>`;
  bannerSectionEl.innerHTML = bannerContent;
}

async function fethAndBuildAllSection() {
  try {
    const res = await fetch(apiPath.fetchAllCategories);
    const data = await res.json();
    const categories = data.genres;
    if (Array.isArray(categories) && categories.length > 0) {
      categories.forEach((cat) => {
        fetchAdndBuildMovieSection(cat.id, cat.name);
      });
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function fetchAdndBuildMovieSection(id, name) {
  try {
    const res = await fetch(apiPath.fectchMovieList(id));
    const data = await res.json();
    const movies = data.results;
    console.log(movies);
    if (Array.isArray(movies) && movies.length > 0) {
      buildMovieSection(movies, name);
    }
  } catch (error) {
    console.log(error);
  }
}

function buildMovieSection(movies, categoriName) {
  const movieContainerEl = document.getElementById("movie-container");
  const movieSectionHTML = `
            <h2 class="movie-section-heading">${categoriName}</h2>
            <div class="movie-row">
               ${movies.map(
                 (d) => `<img class="movie-item"
               src="${imgUrl}/${d.backdrop_path}"
               alt="">`
               )}
            </div>
    `;

  const section = document.createElement("section");
  section.className = "movie-section";
  section.innerHTML = movieSectionHTML;
  movieContainerEl.appendChild(section);
}

init();

// Navbar scrolling effect
window.addEventListener("scroll", () => {
  const navbarEL = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbarEL.classList.add("navbar-theme-black");
  } else {
    navbarEL.classList.remove("navbar-theme-black");
  }
});

// Side Navbar
const hamburgerEl = document.getElementById("hamburger");
const sideNavbarEl = document.getElementById("side-navbar");

hamburgerEl.addEventListener("click", () => {
  sideNavbarEl.classList.toggle("side-navbar-slide");
});
