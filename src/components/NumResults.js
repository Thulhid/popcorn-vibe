import { useSelector } from "react-redux";

export default function NumResults() {
  const { movies } = useSelector((store) => store.movie);
  const results = movies.length;
  return (
    <div className="num-results">
      Founded <span>{results}</span> results
    </div>
  );
}
