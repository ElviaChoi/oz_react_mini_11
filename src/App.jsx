import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout/index";
import MovieList from "./pages/movies/MovieList";
import MovieDetail from "./pages/movies/MovieDetail";
import SearchResult from "./pages/search/SearchResult";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import MyPage from "./pages/mypage/MyPage";

import { useSupabaseAuth, useUserContext } from "./supabase";
import useSearchStore from "./store/searchStore";

function App() {
  const { getUserInfo } = useSupabaseAuth();
  const { setUser } = useUserContext();
  const location = useLocation();
  const { setSearchQuery, setSearchResults } = useSearchStore();

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUserInfo();
      if (userInfo?.user) {
        setUser(userInfo.user);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!location.pathname.startsWith("/search")) {
      setSearchQuery("");
      setSearchResults([]);
    }
  }, [location.pathname, setSearchQuery, setSearchResults]);

  return (
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />

      <Route element={<Layout />}>
        <Route path='/' element={<MovieList />} />
        <Route path='/details/:id' element={<MovieDetail />} />
        <Route path='/search' element={<SearchResult />} />
        <Route path='/mypage' element={<MyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
