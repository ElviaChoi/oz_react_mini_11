import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { useUserContext, useSupabaseAuth } from "../supabase";

function NavBar() {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchInput = useDebounce(searchInput, 500);
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, setUser } = useUserContext();
  const { logout } = useSupabaseAuth();

  const onHomeOrSearchPage =
    location.pathname === "/" || location.pathname.startsWith("/search");

  const handleInputChange = (e) => setSearchInput(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchInput) {
      navigate(`/search?query=${searchInput}`);
    }
  };

  useEffect(() => {
    if (!debouncedSearchInput) return;
    if (!onHomeOrSearchPage) return;
    if (location.pathname === "/") return;

    navigate(`/search?query=${debouncedSearchInput}`);
  }, [debouncedSearchInput, onHomeOrSearchPage, location.pathname, navigate]);

  useEffect(() => {
    setIsLogin(!!user);
  }, [user]);

  return (
    <nav className="bg-gray-950 text-white px-4 py-6 shadow-md relative z-50">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* 로고 */}
        <div
          className="text-6xl mb-4 md:text-5xl font-bold cursor-pointer"
          onClick={() => {
            setSearchInput("");
            navigate("/");
          }}
        >
          🎬 Pickflix
        </div>

        {/* 검색창 */}
        <div className="w-full ml-4 mr-2.5 md:flex-1 md:px-8 flex justify-center">
          <input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="🔍 영화 제목을 검색하세요"
            className="w-full max-w-md px-5 py-2 rounded-full bg-gray-200 text-black placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
          />
        </div>

        {/* 로그인 상태에 따라 UI 변경 */}
        <div className="flex items-center space-x-2 relative">
          {!isLogin ? (
            <>
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
            </>
          ) : (
            <div className="relative">
              <img
                src={user?.profileImageUrl || "/images/profile.png"}
                alt="profile"
                className="w-20 h-20 rounded-full cursor-pointer"
                onClick={() => setMenuOpen((prev) => !prev)}
              />
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow z-50">
                  <button
                    onClick={() => alert("마이페이지 이동")}
                    className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    마이페이지
                  </button>
                  <button
                    onClick={async () => {
                      await logout();
                      setUser(null);
                      setMenuOpen(false);
                      navigate("/");
                    }}
                    className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
