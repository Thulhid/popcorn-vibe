import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
const KEY = "a2647f3c";

const getStarList = () => {
  const storeData = localStorage.getItem("starred");
  return storeData ? JSON.parse(storeData) : [];
};
const initialState = {
  movies: [],
  movieDetails: {},
  query: "",
  selectedId: null,
  isLoading: false,
  error: "",
  starList: getStarList(),
};
function movieReducer(state = initialState, action) {
  switch (action.type) {
    case "movies/get":
      return {
        ...state,
        movies: action.payload,
        isLoading: false,
        error: "",
      };
    case "movies/error":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "movies/search":
      return {
        ...state,
        query: action.payload,
      };
    case "movies/selectID":
      return {
        ...state,
        selectedId: action.payload,
      };
    case "movies/loading":
      return {
        ...state,
        isLoading: true,
      };
    case "movies/starList":
      return {
        ...state,
        starList: [...state.starList, action.payload],
        selectedId: null,
      };
    case "movies/removeFromStarList":
      return {
        ...state,
        starList: state.starList.filter(
          (starMovie) => starMovie.imdbID !== action.payload
        ),
      };
    case "movies/getMovie":
      return {
        ...state,
        isLoading: false,
        movieDetails: action.payload.movie,
        selectedId: action.payload.imdbID,

        error: "",
      };
    default:
      return state;
  }
}

export function getMovies() {
  return async function (dispatch, getState) {
    const { movie } = getState();
    // console.log(state);
    if (movie.query.length < 3) return;
    dispatch({ type: "movies/loading" });
    const controller = new AbortController();

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${KEY}&s=${movie.query}`,
        {
          signal: controller.signal,
        }
      );
      if (!res.ok) throw new Error("Something went wrong with fetching movies");

      const data = await res.json();
      if (data.Response === "False") throw new Error("Movie not found!");

      dispatch({ type: "movies/get", payload: data.Search });
    } catch (err) {
      if (err.name === "AbortError") return;
      dispatch({ type: "movies/error", payload: err.message });
    }
  };
}

export function getMovieDetails(imdbID) {
  return async function (dispatch, setState) {
    // if (!selectedId) return;

    dispatch({ type: "movies/loading" });
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${KEY}&i=${imdbID}`
      );
      const data = await res.json();
      dispatch({ type: "movies/getMovie", payload: { movie: data, imdbID } });
    } catch (err) {
      dispatch({ type: "movies/error", payload: err.message });
    }
  };
}

export function searchMovies(query) {
  return { type: "movies/search", payload: query };
}

export function selectId(id) {
  return { type: "movies/selectID", payload: id };
}

export function addStarList(newRatedMovie) {
  return { type: "movies/starList", payload: newRatedMovie };
}
export function removeFromStarList(id) {
  return { type: "movies/removeFromStarList", payload: id };
}

const rootReducer = combineReducers({
  movie: movieReducer,
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
