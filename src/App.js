import { useEffect, useState } from "react";

const KEY = "a2647f3c";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  function handleSelected(id) {
    setSelectedId(id);
  }
  function handleBackToListBtn() {
    setSelectedId(null);
  }
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) {
            setError("Something went wrong with fetching movies");
            return;
          }
          const data = await res.json();
          console.log(data.Response);
          if (data.Response === "False") {
            setError("Movie not found!");
            return;
          }
          setMovies(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
            console.log(err.message);
            console.log(err);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <div className="container">
      <nav className="nav-bar">
        <Logo />
        <Search query={query} onQuery={setQuery} />
        <NumResults />
      </nav>
      <main className="main">
        {!isLoading && !error ? (
          <MovieBox>
            {" "}
            {selectedId ? (
              <MovieDetails
                selectedId={selectedId}
                onBackToListBtn={handleBackToListBtn}
              />
            ) : (
              <MovieList movies={movies} onSelected={handleSelected} />
            )}
          </MovieBox>
        ) : error ? (
          <Error error={error} />
        ) : (
          <Loader />
        )}
        <RatedBox />
      </main>
    </div>
  );
}

function Loader() {
  return (
    <div className="loader">
      <h1> 🔃Loading...</h1>
    </div>
  );
}
function Error({ error }) {
  return (
    <div className="error">
      <h1> {error} :( </h1>
    </div>
  );
}
function Logo() {
  return (
    <div className="logo">
      <h2>PopcornVibe</h2>
      <span role="img">🍿</span>
    </div>
  );
}
function NumResults() {
  return <div className="num-results">founded X</div>;
}
function MovieBox({ children }) {
  return <section className="movie-box">{children}</section>;
}

function MovieList({ movies, onSelected }) {
  return (
    <ul className="movie-list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelected={onSelected} />
      ))}
    </ul>
  );
}
function Movie({ movie, onSelected }) {
  return (
    <li onClick={(e) => onSelected(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <div>
        <h4>{movie.Title}</h4>
        <p>{movie.Year}</p>
      </div>
      <></>
    </li>
  );
}
function RatedBox() {
  return (
    <section className="rated-box">
      <div className="summary">
        <h2>Star Box</h2>
      </div>
    </section>
  );
}

function Search({ query, onQuery }) {
  return (
    <input
      type="text"
      placeholder="Search..."
      className="search"
      value={query}
      onChange={(e) => onQuery(e.target.value)}
    />
  );
}

function MovieDetails({ selectedId, onBackToListBtn }) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchMovieDetails() {
        if (selectedId) {
          setIsLoading(true);
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );
          const data = await res.json();
          setMovieDetails(data);
          setIsLoading(false);
        }
      }
      fetchMovieDetails();
    },
    [selectedId]
  );
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
  console.log(movieDetails);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onBackToListBtn}>
          &larr;
        </button>
        <h1>{title}</h1>
        <p>{year}</p>
        <p>{genre}</p>
      </header>
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
