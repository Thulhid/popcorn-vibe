import { useDispatch } from "react-redux";
import { removeFromStarList } from "../store";
import styles from "./RatedMovie.module.css";
export default function RatedMovie({ movie }) {
  const dispatch = useDispatch();
  return (
    <li className={styles.ratedListItem}>
      <img src={movie.poster} alt={`Poster of ${movie.title} movie`} />
      <div className={styles.ratedListItemBody}>
        <h4>{movie.title}</h4>
        <h4>🌟 {movie.userRating}</h4>
        <p>imdb: {movie.imdbRating}⭐</p>
        <p>{movie.year}</p>
        <button
          className={styles.btnDelete}
          onClick={() => dispatch(removeFromStarList(movie.imdbID))}
        >
          X
        </button>
      </div>
    </li>
  );
}
