const localStorageKey = 'favoriteMovies';

function getFavoriteMovies() {
  return JSON.parse(localStorage.getItem(localStorageKey));
}

function addMovieToLocalStorage(movie) {
  const arrayOfMovies = getFavoriteMovies() || [];
  arrayOfMovies.push(movie);
  localStorage.setItem(localStorageKey, JSON.stringify(arrayOfMovies));
}

function removeMovieFromLocalStorage(id) {
  const arrayOfMovies = getFavoriteMovies();
  const index = arrayOfMovies.findIndex(movie => movie.id === id);
  arrayOfMovies.splice(index, 1);
  localStorage.setItem(localStorageKey, JSON.stringify(arrayOfMovies));
}

function checkMovieInLocalStorage(id) {
  const arrayOfMovies = getFavoriteMovies() || [];
  return arrayOfMovies.find(movie => movie.id === id);
}

export const LocalStorage = {
  getFavoriteMovies,
  addMovieToLocalStorage,
  removeMovieFromLocalStorage,
  checkMovieInLocalStorage
};
