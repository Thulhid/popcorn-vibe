import { useEffect } from "react";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import Logo from "./components/Logo";
import Search from "./components/Search";
import MovieDetails from "./components/MovieDetails";
import NumResults from "./components/NumResults";
import MovieBox from "./components/MovieBox";
import RatedBox from "./components/RatedBox";
import MovieList from "./components/MovieList";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const { isLoading, error, selectedId, starList } = useSelector(
    (store) => store.movie
  );

  useEffect(
    function () {
      localStorage.setItem("starred", JSON.stringify(starList));
    },
    [starList]
  );

  return (
    <div className="container">
      <nav className="nav-bar">
        <Logo />
        <Search />
        <NumResults />
      </nav>
      <main className="main">
        {!isLoading && !error ? (
          <MovieBox> {selectedId ? <MovieDetails /> : <MovieList />}</MovieBox>
        ) : error ? (
          <ErrorMessage />
        ) : (
          <Loader />
        )}
        <RatedBox />
      </main>
    </div>
  );
}
