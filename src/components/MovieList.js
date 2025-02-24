import { useSelector } from "react-redux";
import Movie from "./Movie";
import styles from "./MovieList.module.css";
export default function MovieList() {
  const { movies } = useSelector((store) => store.movie);
  return (
    <ul className={styles.movieList}>
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
