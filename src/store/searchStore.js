import { create } from 'zustand';
import axios from 'axios';
import { getSearchMoviesUrl } from '../utils/apiUrls';
import { TMDB_GET_OPTION } from '../constants';
import { filterSafeMovies } from '../utils/filterMovies';

const useSearchStore = create((set) => ({
  searchQuery: '',
  searchResults: [],
  isLoading: false,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchResults: (results) => set({ searchResults: results }),
  fetchSearchResults: async (query) => {
    set({ isLoading: true });
    try {
      const url = getSearchMoviesUrl(query);
      const response = await axios.get(url, TMDB_GET_OPTION);
      set({ searchResults: filterSafeMovies(response.data.results), isLoading: false });
    } catch (error) {
      console.error("Failed to fetch search results:", error);
      set({ searchResults: [], isLoading: false });
    }
  },
}));

export default useSearchStore;
