import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";
import SearchResult from "./pages/SearchResult";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

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
      </Route>
    </Routes>
  );
}

export default App;
