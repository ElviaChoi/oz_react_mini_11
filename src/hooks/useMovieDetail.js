import { useState, useEffect } from 'react';
import { getMovieDetailUrl } from '../utils/apiUrls';
import { TMDB_GET_OPTION } from '../constants';

const useMovieDetail = (movieId) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(getMovieDetailUrl(movieId), TMDB_GET_OPTION);
        if (!res.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [movieId]);

  return { movie, loading, error };
};

export default useMovieDetail;
