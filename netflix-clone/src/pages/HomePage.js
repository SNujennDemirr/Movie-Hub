import React, { useEffect, useState, useRef } from 'react';
import { fetchMovieGenres, fetchMoviesByGenre } from '../services/api';
import MovieCard from '../components/MovieCard';
import '../styles/App.css';

const HomePage = () => {
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [genres, setGenres] = useState([]);
  const [modalData, setModalData] = useState(null);
  const carouselRef = useRef(null);

 //baslilklarim
  const genreTitles = {
    "28": "Sınır Tanımayan Aksiyon",      // Aksiyon
    "35": "Süper Kahramanlar ve Kafalar", // Komedi
    "18": "İçsel Mücadele",               // Dram
    "878": "Yarının Dünyasında",          // Bilim Kurgu
    "27": "Geceyi Aydınlatan Korkular",   // Korku
    "10749": "Aşkın Büyüsü",              // Romantik
    "80": "Suçun Karanlık Yüzü",          // Suç
    "16": "Hayal Gücünün Sınırlarında",   // Animasyon
    "99": "Gerçek Hayat Hikayeleri",      // Belgesel
  };

  useEffect(() => {
    const getGenres = async () => {
      try {
        const genreList = await fetchMovieGenres();
        setGenres(genreList);

        for (let genre of genreList) {
          const movies = await fetchMoviesByGenre(genre.id);
          setMoviesByGenre(prevState => ({
            ...prevState,
            [genre.id]: movies,
          }));
        }
      } catch (error) {
        console.error('Error fetching genres:', error);
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

  const scrollCarousel = (direction) => {
    const carousel = carouselRef.current;
    const cardWidth = 220;
    carousel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div className="home-page">
      <h1 style={{ color: 'white' }}>Ana Sayfa</h1>

      {/* Türleri listele */}
      {genres.map(genre => (
        <div key={genre.id} className="genre-section">
          <h2 style={{ color: 'white' }}>{genreTitles[genre.id] || genre.name}</h2>

          { }
          {moviesByGenre[genre.id] && moviesByGenre[genre.id].length > 0 && (
            <div className="carousel-container">
              <button className="carousel-button left" onClick={() => scrollCarousel(-1)}>&lt;</button>
              <div className="carousel" ref={carouselRef}>
                {moviesByGenre[genre.id].map(movie => (
                  <MovieCard key={movie.id} movie={movie} onOpenModal={openModal} />
                ))}
              </div>
              <button className="carousel-button right" onClick={() => scrollCarousel(1)}>&gt;</button>
            </div>
          )}
        </div>
      ))}

      {/* Modal */}
      {modalData && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{modalData.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w500${modalData.backdrop_path}`} alt={modalData.title} className="modal-image" />
            <p>{modalData.overview}</p>
          </div>
        </div>
      )}

      <footer>
        <p>© 2024 Uygulama Adı. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
};

export default HomePage;
