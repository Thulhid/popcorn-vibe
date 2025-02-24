import PageNav from "../components/PageNav";
import styles from "./About.module.css";
function About() {
  return (
    <div className={styles.about}>
      <PageNav />
      <section>
        <div className={styles.txtContainer}>
          <h2>
            Welcome to <em>PopcornVibe</em> Your Ultimate Movie Companion!
          </h2>
          <p>
            Movies have the power to inspire, entertain, and connect us. With
            <em>PopcornVibe</em>, you can keep track of every film you've
            watched, rate your favorites, and discover new recommendations—all
            in one place!
          </p>
          <h4>
            ❔
            <u>
              <em>What We Offer</em>
            </u>
          </h4>
          <p>
            <p>
              <strong> Ratings & Reviews</strong> – Share your opinions.
              <p>
                <p>
                  <strong> Personalized Movie Tracking</strong>– Save and
                  organize your watched movies effortlessly.
                </p>
                <strong>Explore New Films</strong> – Find trending,top-rated,
                and hidden gems.
              </p>
            </p>
            <p>
              <strong>OMDb API Integration</strong> – Access detailed movie
              information instantly.
            </p>
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
