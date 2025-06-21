import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

function NavBar() {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchInput = useDebounce(searchInput, 500);
  const navigate = useNavigate();
  const location = useLocation();

  const isAutoSearchPage =
    location.pathname === "/" || location.pathname.startsWith("/search");

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchInput) {
      navigate(`/search?query=${searchInput}`);
    }
  };

  useEffect(() => {
    if (debouncedSearchInput && isAutoSearchPage) {
      navigate(`/search?query=${debouncedSearchInput}`);
    }
  }, [debouncedSearchInput, isAutoSearchPage, navigate]);

  return (
    <nav className="bg-gray-950 text-white px-4 sm:px-6 lg:px-12 py-6 pb-10">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* 로고 */}
        <div
          className="text-5xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          🎬 Pickflix
        </div>

        {/* 검색창 */}
        <div className="flex-1 min-w-[200px] flex justify-center">
          <input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="🔍 영화 제목을 검색하세요"
            className="w-full max-w-sm px-6 py-2 rounded-full bg-gray-200 text-black placeholder:text-gray-600"
          />
        </div>

        {/* 버튼 영역 */}
        <div className="flex space-x-2">
          <button className="bg-sky-400 hover:bg-sky-500 text-black px-6 py-3 rounded-md text-lg font-semibold">
            로그인
          </button>
          <button className="bg-sky-400 hover:bg-sky-500 text-black px-6 py-3 rounded-md text-lg font-semibold">
            회원가입
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
