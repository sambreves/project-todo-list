import styles from "./styles.module.scss";
import { FaGithub } from "react-icons/fa";

export default function LoginButton() {
  const session = false;

  return session ? (
    <button type="button" className={styles.signInButton}></button>
  ) : (
    <button type="button" className={styles.signInButton}>
      <FaGithub color="#FFB800" />
      Entrar com GitHub
    </button>
  );
}
