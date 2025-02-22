import { useSelector } from "react-redux";

export default function ErrorMessage() {
  const { error } = useSelector((store) => store);
  return (
    <div className="error">
      <h1> {error} :( </h1>
    </div>
  );
}
