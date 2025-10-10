import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 

const MovieDetail = () => {
    const { id } = useParams(); 
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL;

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
                setMovie(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Hata:', err);
                setError(true);
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id, API_KEY, BASE_URL]);

    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    if (error) {
        return <div>Film detayları yüklenemedi. Lütfen daha sonra tekrar deneyin.</div>;
    }

    return (
        <div className="movie-detail">
            {movie && (
                <>
                    <h1>{movie.title}</h1>
                    <img 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        alt={movie.title} 
                        className="movie-poster"
                    />
                    <p><strong>Vizyon Tarihi:</strong> {movie.release_date}</p>
                    <p><strong>Özet:</strong> {movie.overview}</p>
                </>
            )}
        </div>
    );
};

export default MovieDetail;
