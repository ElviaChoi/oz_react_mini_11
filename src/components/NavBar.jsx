import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

function NavBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 가져오기

  // 검색어가 입력될 때 상태 업데이트
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 엔터와 searchTerm 발생하면 검색 실행
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm) {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  useEffect(() => {
    let isSearch = false;

    if (location.pathname === "/" || location.pathname.includes("/search")) {
      isSearch = true;
    }

    if (debouncedSearchTerm && isSearch) {
      navigate(`/search?query=${debouncedSearchTerm}`);
    }
  }, [debouncedSearchTerm, navigate, location.pathname]);

  return (
    <nav className="bg-black text-white px-6 py-4 flex items-center justify-between">
      {/* 로고 */}
      <div className="text-xl font-bold">영화 추천</div>

      {/* 검색창 */}
      <div className="flex-1 px-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="영화 제목을 검색하세요"
          className="w-full max-w-md px-4 py-2 rounded-full bg-gray-200 text-black"
        />
      </div>

      {/* 버튼 */}
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
