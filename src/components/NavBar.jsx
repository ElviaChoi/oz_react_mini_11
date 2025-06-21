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

  const handleInputChange = (e) => setSearchInput(e.target.value);

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
    <nav className="bg-gray-950 text-white px-4 py-6 shadow-md">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* 로고 */}
        <div
          className="text-3xl md:text-4xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          🎬 Pickflix
        </div>

        {/* 검색창 */}
        <div className="w-full md:flex-1 md:px-8 flex justify-center">
          <input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="🔍 영화 제목을 검색하세요"
            className="w-full max-w-md px-5 py-2 rounded-full bg-gray-200 text-black placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
          />
        </div>

        {/* 버튼 영역 */}
        <div className="flex space-x-2">
          <button
            onClick={() => navigate("/login")}
            className="bg-sky-400 hover:bg-sky-500 text-black px-5 py-2 rounded-full font-semibold text-sm md:text-base"
          >
            로그인
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-sky-400 hover:bg-sky-500 text-black px-5 py-2 rounded-full font-semibold text-sm md:text-base"
          >
            회원가입
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
