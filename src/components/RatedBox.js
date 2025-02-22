import { useSelector } from "react-redux";
import RatedMovie from "./RatedMovie";

export default function RatedBox() {
  const { starList } = useSelector((store) => store.movie);
  return (
    <section className="rated-box">
      <div className="summary">
        <h2>🌟Star Box</h2>
      </div>
      <ul className="rated-list">
        {starList?.map((movie) => (
          <RatedMovie movie={movie} key={movie.imdbID} />
        ))}
      </ul>
    </section>
  );
}
