import { useDispatch } from "react-redux";
import { removeFromStarList } from "../store";

export default function RatedMovie({ movie }) {
  const dispatch = useDispatch();
  return (
    <li className="rated-list-item">
      <img src={movie.poster} alt={`Poster of ${movie.title} movie`} />
      <div className="rated-list-item-body">
        <h4>{movie.title}</h4>
        <h4>🌟 {movie.userRating}</h4>
        <p>imdb: {movie.imdbRating}⭐</p>
        <p>{movie.year}</p>
        <button
          className="btn-delete"
          onClick={() => dispatch(removeFromStarList(movie.imdbID))}
        >
          X
        </button>
      </div>
    </li>
  );
}
