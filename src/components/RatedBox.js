import { useSelector } from "react-redux";
import RatedMovie from "./RatedMovie";
import styles from "./RatedBox.module.css";
export default function RatedBox() {
  const { starList } = useSelector((store) => store.movie);
  return (
    <section className={styles.ratedBox}>
      <div className={styles.summary}>
        <h2>🌟Star Box</h2>
      </div>
      <ul className={styles.ratedList}>
        {starList?.map((movie) => (
          <RatedMovie movie={movie} key={movie.imdbID} />
        ))}
      </ul>
    </section>
  );
}
