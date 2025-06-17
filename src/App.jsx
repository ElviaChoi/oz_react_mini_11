import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MovieList />} />
        <Route path="/details" element={<MovieDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
