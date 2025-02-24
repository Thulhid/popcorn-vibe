import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthor } from "../contexts/FakeAuthorContext";

function Login() {
  const { login, isAuthenticated } = useAuthor();
  const navigate = useNavigate();
  const [email, setEmail] = useState("thulhid@gmail.com");
  const [password, setPassword] = useState("12345678");
  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }
  return (
    <div className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button className={styles.btnLogin}>Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
