import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      <h2>PopcornVibe</h2>
      <span role="img">🍿</span>
    </Link>
  );
}
