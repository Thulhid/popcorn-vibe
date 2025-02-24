import { useSelector } from "react-redux";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import MovieBox from "./MovieBox";
import MovieDetails from "./MovieDetails";
import MovieList from "./MovieList";
import RatedBox from "./RatedBox";
import { useEffect } from "react";
import styles from "./Main.module.css";
function Main() {
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
    <main className={styles.main}>
      {!isLoading && !error ? (
        <MovieBox> {selectedId ? <MovieDetails /> : <MovieList />}</MovieBox>
      ) : error ? (
        <ErrorMessage />
      ) : (
        <Loader />
      )}
      <RatedBox />
    </main>
  );
}

export default Main;
