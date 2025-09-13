import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout/index";

// Lazy-loaded page components
const MovieList = lazy(() => import("./pages/movies/MovieList"));
const MovieDetail = lazy(() => import("./pages/movies/MovieDetail"));
const SearchResult = lazy(() => import("./pages/search/SearchResult"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const Login = lazy(() => import("./pages/auth/Login"));
const MyPage = lazy(() => import("./pages/mypage/MyPage"));

import { useSupabaseAuth, useUserContext } from "./supabase";
import useSearchStore from "./store/searchStore";
import { PATHS } from "./constants";

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
    if (!location.pathname.startsWith(PATHS.SEARCH)) {
      setSearchQuery("");
      setSearchResults([]);
    }
  }, [location.pathname, setSearchQuery, setSearchResults]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={PATHS.SIGNUP} element={<Signup />} />
        <Route path={PATHS.LOGIN} element={<Login />} />

        <Route element={<Layout />}>
          <Route path={PATHS.HOME} element={<MovieList />} />
          <Route path={`${PATHS.MOVIE_DETAIL}/:id`} element={<MovieDetail />} />
          <Route path={PATHS.SEARCH} element={<SearchResult />} />
          <Route path={PATHS.MYPAGE} element={<MyPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
