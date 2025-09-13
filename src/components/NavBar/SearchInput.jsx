import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSearchStore from '../../store/searchStore';
import useDebounce from '../../hooks/useDebounce';

function SearchInput() {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchQuery, setSearchQuery, fetchSearchResults } = useSearchStore();
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const prevQueryRef = useRef(debouncedSearchQuery);

  useEffect(() => {
    if (debouncedSearchQuery && debouncedSearchQuery !== prevQueryRef.current) {
      navigate(`/search?query=${debouncedSearchQuery}`);
      fetchSearchResults(debouncedSearchQuery);
    }
    prevQueryRef.current = debouncedSearchQuery;
  }, [debouncedSearchQuery, fetchSearchResults, navigate]);

  const handleSearch = () => {
    if (searchQuery) {
      fetchSearchResults(searchQuery);
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <div className="w-full sm:flex-1 mb-3 sm:px-6 flex justify-center">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          placeholder="영화 제목을 검색하세요"
          className="w-full pl-5 pr-10 py-2 rounded-full bg-gray-200 text-black placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
        />
        <button
          onClick={handleSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-sky-500 text-xl cursor-pointer"
        >
          🔍
        </button>
      </div>
    </div>
  );
}

export default SearchInput;
