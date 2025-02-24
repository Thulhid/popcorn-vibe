import { useDispatch, useSelector } from "react-redux";
import { getMovies, searchMovies } from "../store";
import { useEffect } from "react";
import styles from "./Search.module.css";
export default function Search() {
  const { query } = useSelector((store) => store.movie);
  const dispatch = useDispatch();
  useEffect(
    function () {
      dispatch(getMovies());
    },
    [query, dispatch]
  );
  return (
    <input
      type="text"
      placeholder="Search..."
      className={styles.search}
      value={query}
      onChange={(e) => dispatch(searchMovies(e.target.value))}
    />
  );
}
