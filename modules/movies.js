import { config } from './config.js';
import { API } from './api.js';
import { LocalStorage } from './local-storage.js';

function toggleClassFavorite(element) {
  element.classList.toggle('favorite');
}

function markMovieAsFavorite(event, movie) {
  const movieElement = event.target.closest('.movie');
  if (movieElement.classList.contains('favorite')) {
    LocalStorage.removeMovieFromLocalStorage(movie.id);
    const onlyFavoritesCheckbox = document.querySelector('#only-favorites');
    if (onlyFavoritesCheckbox.checked) {
      setTimeout(() => {
        movieElement.remove();
      }, 700);
    }
  } else {
    LocalStorage.addMovieToLocalStorage(movie);
  }
  toggleClassFavorite(movieElement);
}

function renderMovie(movie) {
  const { poster_path, title, vote_average, release_date, overview } = movie;

  const year = release_date === '' ? '?' : release_date.split('-')[0];
  const image = poster_path
    ? `${config.image_base_url}${poster_path}`
    : `assets/images/not-found.jpg`;

  // movies container
  const container = document.querySelector('.movies');

  // movie element
  const movieElement = document.createElement('div');
  movieElement.classList.add('movie');

  // movie info
  const info = document.createElement('div');
  info.classList.add('movie__info');

  // image
  const imageContainer = document.createElement('div');
  imageContainer.classList.add('movie__img');
  imageContainer.innerHTML = `<img alt="" width="120" height="120">`;
  imageContainer.querySelector('img').src = image;

  // text
  const movieText = document.createElement('div');
  movieText.classList.add('movie__text');
  const movieTitle = document.createElement('p');
  movieTitle.classList.add('movie__title');
  movieTitle.textContent = `${title} (${year})`;
  const movieDetails = document.createElement('div');
  movieDetails.classList.add('movie__details');

  // rating
  const movieRatingContainer = document.createElement('div');
  movieRatingContainer.classList.add('movie__rating');
  const ratingIcon = document.createElement('img');
  ratingIcon.src = 'assets/icons/star.svg';
  ratingIcon.alt = '';
  const movieRating = document.createElement('span');
  movieRating.textContent = `${vote_average}`;
  movieRatingContainer.append(ratingIcon, movieRating);

  // favorite button
  const favoriteBtn = document.createElement('button');
  favoriteBtn.classList.add('mark-favorite');
  favoriteBtn.innerHTML = `<svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg"
  class="favorite-icon">
  <path
    d="M19.4578 2.54219C18.9691 2.05327 18.3889 1.66542 17.7503 1.40081C17.1117 1.1362 16.4272 1 15.7359 1C15.0446 1 14.3601 1.1362 13.7215 1.40081C13.0829 1.66542 12.5026 2.05327 12.0139 2.54219L10.9997 3.55639L9.98554 2.54219C8.99842 1.55507 7.6596 1.00051 6.26361 1.00051C4.86761 1.00051 3.52879 1.55507 2.54168 2.54219C1.55456 3.52931 1 4.86812 1 6.26412C1 7.66012 1.55456 8.99894 2.54168 9.98605L3.55588 11.0003L10.9997 18.4441L18.4436 11.0003L19.4578 9.98605C19.9467 9.49737 20.3346 8.91714 20.5992 8.27851C20.8638 7.63989 21 6.95539 21 6.26412C21 5.57285 20.8638 4.88835 20.5992 4.24973C20.3346 3.6111 19.9467 3.03088 19.4578 2.54219V2.54219Z"
    stroke="#BA0707" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
  Favorite`;
  favoriteBtn.addEventListener('click', e => markMovieAsFavorite(e, movie));

  // append elements created to movie__info
  movieDetails.append(movieRatingContainer, favoriteBtn);
  movieText.append(movieTitle, movieDetails);
  info.append(imageContainer, movieText);

  // movie description
  const descriptionContainer = document.createElement('div');
  descriptionContainer.classList.add('movie__description');
  descriptionContainer.textContent = overview;

  // append to the movie element
  movieElement.append(info, descriptionContainer);
  // append to the movies container
  container.appendChild(movieElement);

  // check if movie is stored in localStorage(as a favorite), then add class favorite to the element;
  LocalStorage.checkMovieInLocalStorage(movie.id) &&
    movieElement.classList.add('favorite');
}

export function clearAllMovies() {
  document.querySelector('.movies').replaceChildren();
}

export function renderFavoriteMovies() {
  const movies = LocalStorage.getFavoriteMovies() || [];
  movies.forEach(movie => renderMovie(movie));
}

export async function renderPopularMovies() {
  const movies = await API.getPopularMovies();
  movies.forEach(movie => renderMovie(movie));
}

export async function searchMovie() {
  const movieName = document.querySelector('#movie-name').value.trim();
  if (movieName.length === 0) return;
  clearAllMovies();
  const movies = await API.searchForMovies(movieName);
  movies.forEach(movie => renderMovie(movie));
  document.querySelector('#only-favorites').checked = false;
}
