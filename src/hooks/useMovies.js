import { useState, useEffect, useCallback } from 'react';
import { getPopularMoviesUrl } from '../utils/apiUrls';
import { TMDB_GET_OPTION } from '../constants';
import { filterSafeMovies } from '../utils/filterMovies';
import useThrottle from './useThrottle';

const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async (pageNum) => {
    setLoading(true);
    setError(null);
    try {
      const fetchPromise = fetch(getPopularMoviesUrl(pageNum), TMDB_GET_OPTION)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch movies');
          return res.json();
        });

      const minDelayPromise = new Promise(resolve => setTimeout(resolve, 300)); // 300ms minimum delay

      const [data] = await Promise.all([fetchPromise, minDelayPromise]);

      const filtered = filterSafeMovies(data.results);

      if (filtered.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prev) => {
          const newMovies = [...prev, ...filtered];
          return Array.from(new Map(newMovies.map((m) => [m.id, m])).values());
        });
      }
    } catch (err) {
      setError(err);
      console.error("Failed to fetch movies:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(page);
  }, [page, fetchMovies]);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.scrollHeight;

    if (scrollTop + windowHeight >= fullHeight - 300 && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, loading]);

  const throttledScroll = useThrottle(handleScroll, 300);

  useEffect(() => {
    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [throttledScroll]);

  return { movies, loading, error, hasMore };
};

export default useMovies;
