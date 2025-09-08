import React, { useEffect, useState } from 'react';
import { fetchPopularMovies } from '../services/api';
import MovieCard from '../components/MovieCard';

const PopularMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null); 

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const popularMovies = await fetchPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getPopularMovies();
  }, []);

  const onOpenModal = (movie) => {
    setSelectedMovie(movie); 
  };

  const onCloseModal = () => {
    setSelectedMovie(null); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading popular movies. Please try again later.</div>;
  }

  return (
    <div className="popular-movies-page">
      <h1>Popular Movies</h1>
      <div className="movie-list">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} onOpenModal={onOpenModal} />
        ))}
      </div>

      {/* Modal */}
      {selectedMovie && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={onCloseModal}>×</span>
            <h2>{selectedMovie.title}</h2>
            <p>{selectedMovie.overview}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularMoviesPage;
