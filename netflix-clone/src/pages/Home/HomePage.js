import React, { useEffect, useState } from 'react';
import { fetchMovieGenres, fetchMoviesByGenre } from '../../services/api';
import MovieCard from '../../components/MovieCard';
import HeroBanner from '../../components/HeroBanner';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [genres, setGenres] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [heroMovie, setHeroMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const genreTitles = {
    "28": "Sınır Tanımayan Aksiyon",      // Aksiyon
    "35": "Süper Kahramanlar ve Kafalar", // Komedi
    "18": "İçsel Mücadele",               // Dram
    "878": "Yarının Dünyasında",          // Bilim Kurgu
    "27": "Korku Meraklılarına",   
    "10749": "Aşkın Büyüsü",              // Romantik
    "80": "Suçun Karanlık Yüzü",          // Suç
    "16": "Hayal Gücünün Sınırlarında",   // Animasyon
    "99": "Gerçek Hayat Hikayeleri",      // Belgesel
  };

  // Random hero movie fonksiyonu
  const selectRandomHeroMovie = (moviesData) => {
    const allMovies = Object.values(moviesData).flat();
    if (allMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * allMovies.length);
      return allMovies[randomIndex];
    }
    return null;
  };

  useEffect(() => {
    const getGenres = async () => {
      try {
        setLoading(true);
        const genreList = await fetchMovieGenres();
        setGenres(genreList);

        const moviePromises = genreList.map(async (genre) => {
          const movies = await fetchMoviesByGenre(genre.id);
          return { [genre.id]: movies };
        });

        const movieResults = await Promise.all(moviePromises);
        const moviesData = movieResults.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        setMoviesByGenre(moviesData);
        
        // Random  movie seç
        const randomHero = selectRandomHeroMovie(moviesData);
        setHeroMovie(randomHero);
      } catch (error) {
        console.error('Error fetching genres:', error);
        setError('Filmler yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    getGenres();
  }, []);

  const openModal = (movie) => {
    setModalData(movie);
  };

  const closeModal = () => {
    setModalData(null);
  };

  const scrollCarousel = (direction, genreId) => {
    const carousel = document.querySelector(`[data-genre="${genreId}"]`);
    if (carousel) {
      const cardWidth = 240; 
      carousel.scrollBy({
        left: direction * cardWidth * 3, 
        behavior: 'smooth',
      });
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div>Filmler yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.homePage}>
      <HeroBanner 
        movie={heroMovie}
        onPlayClick={openModal}
        onInfoClick={openModal}
      />
  
      {/* Original Header - sadece hero yoksa göster */}
      {!heroMovie && (
        <div className={styles.header}>
          <h1 className={styles.title}>Movie Hub</h1>
          <p className={styles.subtitle}>En iyi filmleri keşfet</p>
        </div>
      )}

    
      {genres.map(genre => (
        <div key={genre.id} className={styles.genreSection}>
          <h2 className={styles.genreTitle}>
            {genreTitles[genre.id] || genre.name}
          </h2>

          {moviesByGenre[genre.id] && moviesByGenre[genre.id].length > 0 && (
            <div className={styles.carouselContainer}>
              <button 
                className={`${styles.carouselNav} ${styles.navLeft}`}
                onClick={() => scrollCarousel(-1, genre.id)}
                aria-label="Önceki filmler"
              >
                ‹
              </button>
              
              <div 
                className={styles.carousel} 
                data-genre={genre.id}
              >
                {moviesByGenre[genre.id].map(movie => (
                  <MovieCard 
                    key={movie.id} 
                    movie={movie} 
                    onOpenModal={openModal} 
                  />
                ))}
              </div>
              
              <button 
                className={`${styles.carouselNav} ${styles.navRight}`}
                onClick={() => scrollCarousel(1, genre.id)}
                aria-label="Sonraki filmler"
              >
                ›
              </button>
            </div>
          )}
        </div>
      ))}
      {modalData && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.modalClose} 
              onClick={closeModal}
              aria-label="Kapat"
            >
              ×
            </button>
            <h2 className={styles.modalTitle}>{modalData.title}</h2>
            <img 
              src={`https://image.tmdb.org/t/p/w500${modalData.backdrop_path}`} 
              alt={modalData.title} 
              className={styles.modalImage} 
            />
            <p className={styles.modalDescription}>{modalData.overview}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
