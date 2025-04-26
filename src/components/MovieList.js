import { useSelector } from "react-redux";
import Movie from "./Movie";
import styles from "./MovieList.module.css";
export default function MovieList() {
  const { movies, query } = useSelector((store) => store.movie);
  return (
    <>
      {query.length <= 2 ? (
        <p className={styles.initialMsg}>
          Start searching for movies you love 🔍
        </p>
      ) : (
        <ul className={styles.movieList}>
          {movies?.map((movie) => (
            <Movie movie={movie} key={movie.imdbID} />
          ))}
        </ul>
      )}
    </>
  );
}
