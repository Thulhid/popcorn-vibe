import { useSelector } from "react-redux";
import Movie from "./Movie";

export default function MovieList() {
  const { movies } = useSelector((store) => store.movie);
  return (
    <ul className="movie-list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
