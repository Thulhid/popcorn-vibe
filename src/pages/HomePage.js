import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <div className={styles.txtContainer}>
          <h2>
            Dive into the world of cinema and keep track of every movie you
            watch. Rate, review, and build your own collection of favorites!
          </h2>
        </div>

        <Link to="/login" className={styles.startLink}>
          Start Rating Now
        </Link>
      </section>
    </main>
  );
}

export default HomePage;
