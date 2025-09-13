import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { getMovieDetailUrl } from '../utils/apiUrls';
import { TMDB_GET_OPTION } from '../constants';

const useBookmarkedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarkIds, setBookmarkIds] = useState([]);

  const syncBookmarks = useCallback(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarkIds(saved);
  }, []);

  useEffect(() => {
    syncBookmarks();
  }, [syncBookmarks]);

  useEffect(() => {
    if (bookmarkIds.length === 0) {
      setMovies([]);
      setLoading(false);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const bookmarkFetchTasks = bookmarkIds.map(id =>
          axios.get(getMovieDetailUrl(id), TMDB_GET_OPTION)
        );
        const responses = await Promise.all(bookmarkFetchTasks);
        const movieData = responses.map(res => res.data).filter(Boolean);
        setMovies(movieData);
      } catch (err) {
        setError(err);
        console.error("Error fetching bookmarked movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [bookmarkIds]);

  return { movies, loading, error, syncBookmarks };
};

export default useBookmarkedMovies;
