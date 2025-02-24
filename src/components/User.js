import { useNavigate } from "react-router-dom";
import { useAuthor } from "../contexts/FakeAuthorContext";
import styles from "./User.module.css";

function User() {
  const { logout, user } = useAuthor();
  const navigate = useNavigate();
  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
