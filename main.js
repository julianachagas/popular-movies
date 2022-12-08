import {
  renderPopularMovies,
  searchMovie,
  clearAllMovies,
  renderFavoriteMovies
} from './modules/movies.js';

const onlyFavoritesCheckbox = document.querySelector('#only-favorites');
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('#movie-name');

function checkCheckboxStatus() {
  return document.querySelector('#only-favorites').checked;
}

function handleCheckbox() {
  const isChecked = checkCheckboxStatus();
  clearAllMovies();
  if (isChecked) {
    renderFavoriteMovies();
  } else {
    renderPopularMovies();
  }
}

document.addEventListener('DOMContentLoaded', renderPopularMovies);

// show favorites only
onlyFavoritesCheckbox.addEventListener('change', handleCheckbox);

// search movie
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  searchMovie();
});

// render movies when input is empty
searchInput.addEventListener('input', e => {
  if (e.target.value !== '') return;
  const isChecked = checkCheckboxStatus();
  if (isChecked) return;
  clearAllMovies();
  renderPopularMovies();
});
