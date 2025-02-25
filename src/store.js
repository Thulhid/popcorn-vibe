import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
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

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    getMovies(state, action) {
      state.isLoading = false;
      state.movies = action.payload;
    },
    error(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.movies = [];
    },
    search(state, action) {
      state.query = action.payload;
    },
    selectID(state, action) {
      state.selectedId = action.payload;
    },
    loading(state) {
      state.isLoading = true;
      state.error = "";
    },
    addStarList(state, action) {
      state.starList.push(action.payload);
      state.selectedId = null;
    },
    removeFromStarList(state, action) {
      state.starList = state.starList.filter(
        (starMovie) => starMovie.imdbID !== action.payload
      );
    },
    //BUG:
    getMovieDetails: {
      prepare(movie, imdbID) {
        return {
          payload: { movie, imdbID },
        };
      },
      reducer(state, action) {
        state.isLoading = false;
        state.movieDetails = action.payload.movie;
        state.selectedId = action.payload.imdbID;
      },
    },

    initial(state) {
      state.movies = [];
      state.error = "";
    },
  },
});
export const {
  error,
  search,
  selectID,
  loading,
  addStarList,
  removeFromStarList,
  initial,
} = movieSlice.actions;

export function getMovies() {
  return async function (dispatch, getState) {
    const { movie } = getState();
    if (movie.query.length < 3) return dispatch({ type: "movie/initial" });
    dispatch({ type: "movie/loading" });
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

      dispatch({ type: "movie/getMovies", payload: data.Search });
    } catch (err) {
      if (err.name === "AbortError") return;
      dispatch({ type: "movie/error", payload: err.message });
    }
  };
}
export function getMovieDetails(imdbID) {
  return async function (dispatch, setState) {
    // if (!selectedId) return;

    dispatch({ type: "movie/loading" });
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${KEY}&i=${imdbID}`
      );
      const data = await res.json();
      dispatch({
        type: "movie/getMovieDetails",
        payload: { movie: data, imdbID },
      });
    } catch (err) {
      dispatch({ type: "movie/error", payload: err.message });
    }
  };
}
const store = configureStore({
  reducer: {
    movie: movieSlice.reducer,
  },
});

export default store;
// function movieReducer(state = initialState, action) {
//   switch (action.type) {
//     case "movies/get":
//       return {
//         ...state,
//         movies: action.payload,
//         isLoading: false,
//         error: "",
//       };
//     case "movies/error":
//       return {
//         ...state,
//         isLoading: false,
//         error: action.payload,
//       };

//     case "movies/search":
//       return {
//         ...state,
//         query: action.payload,
//       };
//     case "movies/selectID":
//       return {
//         ...state,
//         selectedId: action.payload,
//       };
//     case "movies/loading":
//       return {
//         ...state,
//         isLoading: true,
//         error: "",
//       };
//     case "movies/starList":
//       return {
//         ...state,
//         starList: [...state.starList, action.payload],
//         selectedId: null,
//       };
//     case "movies/removeFromStarList":
//       return {
//         ...state,
//         starList: state.starList.filter(
//           (starMovie) => starMovie.imdbID !== action.payload
//         ),
//       };
//     case "movies/getMovie":
//       return {
//         ...state,
//         isLoading: false,
//         movieDetails: action.payload.movie,
//         selectedId: action.payload.imdbID,

//         error: "",
//       };
//     case "movies/initial":
//       return {
//         ...state,
//         movies: [],
//         error: "",
//       };
//     default:
//       return state;
//   }
// }

// export function getMovies() {
//   return async function (dispatch, getState) {
//     const { movie } = getState();
//     if (movie.query.length < 3) return dispatch({ type: "movies/initial" });
//     dispatch({ type: "movies/loading" });
//     const controller = new AbortController();

//     try {
//       const res = await fetch(
//         `https://www.omdbapi.com/?apikey=${KEY}&s=${movie.query}`,
//         {
//           signal: controller.signal,
//         }
//       );
//       if (!res.ok) throw new Error("Something went wrong with fetching movies");

//       const data = await res.json();
//       if (data.Response === "False") throw new Error("Movie not found!");

//       dispatch({ type: "movies/get", payload: data.Search });
//     } catch (err) {
//       if (err.name === "AbortError") return;
//       dispatch({ type: "movies/error", payload: err.message });
//     }
//   };
// }

// export function getMovieDetails(imdbID) {
//   return async function (dispatch, setState) {
//     // if (!selectedId) return;

//     dispatch({ type: "movies/loading" });
//     try {
//       const res = await fetch(
//         `https://www.omdbapi.com/?apikey=${KEY}&i=${imdbID}`
//       );
//       const data = await res.json();
//       dispatch({ type: "movies/getMovie", payload: { movie: data, imdbID } });
//     } catch (err) {
//       dispatch({ type: "movies/error", payload: err.message });
//     }
//   };
// }

// export function searchMovies(query) {
//   return { type: "movies/search", payload: query };
// }

// export function selectId(id) {
//   return { type: "movies/selectID", payload: id };
// }

// export function addStarList(newRatedMovie) {
//   return { type: "movies/starList", payload: newRatedMovie };
// }
// export function removeFromStarList(id) {
//   return { type: "movies/removeFromStarList", payload: id };
// }
