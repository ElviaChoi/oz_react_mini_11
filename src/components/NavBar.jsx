import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

function NavBar() {
  const [searchInput, setSearchInput] = useState(""); // 사용자 입력값
  const debouncedSearchInput = useDebounce(searchInput, 500); // 확정된 자동 검색어

  const navigate = useNavigate();
  const location = useLocation();

  // 현재 페이지에서 자동 검색을 해도 되는지 판단
  const isAutoSearchPage =
    location.pathname === "/" || location.pathname.startsWith("/search");

  // 입력창에서 값이 바뀔 때
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // 엔터를 누르면 바로 검색 실행
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchInput) {
      navigate(`/search?query=${searchInput}`);
    }
  };

  // 자동 검색: 입력을 멈춘 후 0.5초가 지나면 실행
  useEffect(() => {
    if (debouncedSearchInput && isAutoSearchPage) {
      navigate(`/search?query=${debouncedSearchInput}`);
    }
  }, [debouncedSearchInput, isAutoSearchPage, navigate]);

  return (
    <nav className="bg-black text-white px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-bold">영화 추천</div>

      <div className="flex-1 px-6">
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="영화 제목을 검색하세요"
          className="w-full max-w-md px-4 py-2 rounded-full bg-gray-200 text-black"
        />
      </div>

      <div className="space-x-2">
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded">
          로그인
        </button>
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded">
          회원가입
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
