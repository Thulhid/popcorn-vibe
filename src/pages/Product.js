import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

function Product() {
  return (
    <div className={styles.product}>
      <PageNav />
      <section className={styles.txtContainer}>
        <h2>The Ultimate Movie Rating Experience!</h2>

        <h4>✨ Key Features</h4>
        <p>
          <p>
            ✅ Rate & Review Movies – Express your thoughts and help others
            discover great films.
          </p>
          <p>✅ Personal Watchlist – Save movies you want to watch later.</p>
          <p>
            ✅ Detailed Movie Info – Powered by OMDb API, get insights on cast,
            plot, ratings, and more.
          </p>

          <p>
            ✅ User-Friendly Interface – Simple, sleek, and easy to navigate.
          </p>
        </p>
      </section>
    </div>
  );
}

export default Product;
