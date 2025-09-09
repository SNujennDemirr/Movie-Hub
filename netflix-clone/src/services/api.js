import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY; 
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovieGenres = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching movie genres:", error);
    throw error;
  }
};

export const fetchMoviesByGenre = async (genreId) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching movies by genre (ID: ${genreId}):`, error);
    throw error; 
  }
};

export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

// ESLint uyarısı almamak için export'u değiştir
const api = { fetchMovieGenres, fetchMoviesByGenre, fetchPopularMovies };
export default api;
