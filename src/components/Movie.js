import { useDispatch } from "react-redux";
import { getMovieDetails } from "../store";

export default function Movie({ movie }) {
  const dispatch = useDispatch();

  return (
    <li onClick={() => dispatch(getMovieDetails(movie.imdbID))}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <div>
        <h4>{movie.Title}</h4>
        <p>{movie.Year}</p>
      </div>
      <></>
    </li>
  );
}
