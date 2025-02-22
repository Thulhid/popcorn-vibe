import { useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { addStarList, selectId } from "../store";

export default function MovieDetails() {
  const { selectedId, starList, movieDetails, isLoading } = useSelector(
    (store) => store.movie
  );
  const dispatch = useDispatch();

  const [userRating, setUserRating] = useState("");
  const isSelected = starList?.some((st) => st.imdbID === selectedId);

  const {
    Title: title,
    Poster: poster,
    Year: year,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieDetails;
  const newRatedMovie = {
    imdbID: selectedId,
    title,
    poster,
    year,
    imdbRating,
    userRating,
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="details">
      <header>
        <button className="btn-back" onClick={() => dispatch(selectId(null))}>
          &larr;
        </button>
        <h1>{title}</h1>
        <p>{year}</p>
        <p>{genre}</p>
      </header>
      <section className="details-star">
        {isSelected ? (
          <p className="already-rated">You already rated this movie</p>
        ) : (
          <div className={`rating ${userRating ? "expanded" : ""}`}>
            <StarRating
              size={24}
              messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
              onSetRating={setUserRating}
            />
          </div>
        )}
        {userRating > 0 && (
          <button
            className="btn-add"
            onClick={(e) => dispatch(addStarList(newRatedMovie))}
          >
            Add to ⭐⭐⭐
          </button>
        )}
      </section>
      <section className="details-body">
        <img src={poster} alt={`Poster of ${title}  movie`} />
        <div className="details-body-info">
          <p>⭐ {imdbRating}</p>
          <p>Director: {director}</p>
          <p>Top cast: {actors}</p>
          <p>{released}</p>
          <p>{runtime}</p>
          <h2>Plot summary</h2>
          <p className="plot">&bull; {plot}</p>
        </div>
      </section>
    </div>
  );
}
