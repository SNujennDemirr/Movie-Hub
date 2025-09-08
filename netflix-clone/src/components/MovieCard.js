import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';

const MovieCard = ({ movie, onOpenModal }) => {
  return (
    <div className="movie-card">
      <div className="movie-card-image-container">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} 
          alt={movie.title} 
          className="movie-card-image"
        />
      </div>
      <h3>{movie.title}</h3> { }
      <div className="movie-card-content">
        <button onClick={() => onOpenModal(movie)}>Detaylar</button>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    backdrop_path: PropTypes.string,
  }).isRequired,
  onOpenModal: PropTypes.func.isRequired, 
};

export default MovieCard;
