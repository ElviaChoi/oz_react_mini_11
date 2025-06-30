import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/index";
import MovieList from "./pages/movies/MovieList";
import MovieDetail from "./pages/movies/MovieDetail";
import SearchResult from "./pages/search/SearchResult";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import MyPage from "./pages/mypage/MyPage";

import { useSupabaseAuth, useUserContext } from "./supabase";

function App() {
  const { getUserInfo } = useSupabaseAuth();
  const { setUser } = useUserContext();

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUserInfo();
      if (userInfo?.user) {
        setUser(userInfo.user);
      }
    };
    fetchUser();
  }, []);

  return (
    <Routes>
      {/* NavBar 없는 회원가입/로그인 */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        {/* NavBar 있는 기본 페이지들 */}
        <Route path="/" element={<MovieList />} />
        <Route path="/details/:id" element={<MovieDetail />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/mypage" element={<MyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
