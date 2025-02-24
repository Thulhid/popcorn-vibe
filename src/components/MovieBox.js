import styles from "./MovieBox.module.css";
export default function MovieBox({ children }) {
  return <section className={styles.movieBox}>{children}</section>;
}
