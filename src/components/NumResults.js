import { useSelector } from "react-redux";
import styles from "./NumResults.module.css";
export default function NumResults() {
  const { movies } = useSelector((store) => store.movie);

  const results = movies.length;
  return (
    <div className={styles.numResults}>
      <em>
        Founded <span>{results}</span> results
      </em>
    </div>
  );
}
