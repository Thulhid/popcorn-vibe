import Logo from "./Logo";
import NumResults from "./NumResults";
import Search from "./Search";
import styles from "./NavBar.module.css";
import User from "./User";

function NavBar() {
  return (
    <nav className={styles.navBar}>
      <Logo />
      <Search />
      <NumResults />
      <User />
    </nav>
  );
}

export default NavBar;
