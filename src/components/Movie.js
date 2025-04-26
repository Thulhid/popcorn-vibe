import { useDispatch } from "react-redux";
import { getMovieDetails } from "../store";

export default function Movie({ movie }) {
  const dispatch = useDispatch();

  return (
    <li>
      <img
        src={movie.Poster}
        alt={`${movie.Title} poster`}
        onClick={() => dispatch(getMovieDetails(movie.imdbID))}
      />
      <div>
        <h4>{movie.Title}</h4>
        <p>{movie.Year}</p>
      </div>
      <></>
    </li>
  );
}
