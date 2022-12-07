// api.js: handling API requests
import { config } from './config.js';

const baseURL = config.api_base_url;
const apiKey = config.api_key;

async function getPopularMovies() {
  try {
    const url = `${baseURL}movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    const response = await fetch(url);
    const { results } = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

async function searchForMovies(title) {
  try {
    const url = `${baseURL}search/movie?api_key=${apiKey}&query=${title}&language=en-US&page=1&include_adult=false`;
    const response = await fetch(url);
    const { results } = await response.json();
    return results;
  } catch (error) {
    console.error(error);
  }
}

export const API = {
  getPopularMovies,
  searchForMovies
};
