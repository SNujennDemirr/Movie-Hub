import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PopularMoviesPage from './pages/PopularMoviesPage';
import LoginPage from './pages/Login';
import SignupPage from './pages/SignUp';
import MovieCard from './components/MovieCard';

const App = () => {
  const [modalData, setModalData] = useState(null);

  const movies = [];

  const openModal = (movie) => {
    setModalData(movie);
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/popular" element={<PopularMoviesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>

      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onOpenModal={openModal} />
        ))}
      </div>

      {modalData && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{modalData.title}</h2>
            <p>{modalData.overview}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;