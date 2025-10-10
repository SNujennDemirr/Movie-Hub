import React from 'react';
import styles from './HeroBanner.module.css';

const HeroBanner = ({ movie, onPlayClick, onInfoClick }) => {
  if (!movie) return null;

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '/img/default-backdrop.jpg';

  return (
    <section 
      className={styles.heroSection}
      style={{ backgroundImage: `url(${backdropUrl})` }}
    >
      <div className={styles.heroOverlay}></div>
      <div className={styles.heroContent}>
        <div className={styles.heroInfo}>
          <h1 className={styles.heroTitle}>
            {movie.title || movie.name}
          </h1>
          <p className={styles.heroDescription}>
            {movie.overview || 'No description available.'}
          </p>
          <div className={styles.heroButtons}>
            <button 
              className={styles.playButton}
              onClick={() => onPlayClick && onPlayClick(movie)}
            >
              ▶ Play
            </button>
            <button 
              className={styles.infoButton}
              onClick={() => onInfoClick && onInfoClick(movie)}
            >
              ℹ More Info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;