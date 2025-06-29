import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext, useSupabaseAuth } from "../../supabase";
import Avatar from "../common/Avatar";

function UserMenu() {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();
  const { logout } = useSupabaseAuth();

  const [isLogin, setIsLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsLogin(!!user);
  }, [user]);

  if (!isLogin) {
    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={() => navigate("/login")}
          className="bg-sky-400 hover:bg-sky-500 text-black mt-1.5 mr-4 px-4 py-1 sm:px-5 sm:py-2 rounded-full font-semibold text-sm sm:text-base"
        >
          로그인
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="bg-sky-400 hover:bg-sky-500 text-black mt-1.5 px-4 py-1 sm:px-5 sm:py-2 rounded-full font-semibold text-sm sm:text-base"
        >
          회원가입
        </button>
      </div>
    );
  }
  return (
    <div className="relative">
      <Avatar
        user={user}
        size="md"
        onClick={() => setMenuOpen((prev) => !prev)}
      />
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow z-50">
          <button
            onClick={() => {
              navigate("/mypage");
              setMenuOpen(false);
            }}
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
  );
}

export default UserMenu;
