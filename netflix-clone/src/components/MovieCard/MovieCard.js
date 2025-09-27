import React from 'react';
import PropTypes from 'prop-types';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie, onOpenModal }) => {
  return (
    <div className={styles.movieCard}>
      <div className={styles.movieCardImageContainer}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} 
          alt={movie.title} 
          className={styles.movieCardImage}
        />
      </div>
      <h3 className={styles.movieTitle}>{movie.title}</h3>
      <div className={styles.movieCardContent}>
        <button 
          className={styles.detailsButton} 
          onClick={() => onOpenModal(movie)}
        >
          Detaylar
        </button>
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
