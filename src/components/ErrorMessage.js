import { useSelector } from "react-redux";
import styles from "./ErrorMessage.module.css";
export default function ErrorMessage() {
  const { error } = useSelector((store) => store.movie);
  return (
    <div className={styles.error}>
      <h1> {error} :( </h1>
    </div>
  );
}
