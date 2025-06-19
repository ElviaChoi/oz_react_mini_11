import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";
import SearchResult from "./pages/SearchResult";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MovieList />} />
        <Route path="/details/:id" element={<MovieDetail />} />
        <Route path="/search" element={<SearchResult />} />
      </Route>
    </Routes>
  );
}

export default App;
