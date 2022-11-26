import styles from "./styles.module.scss";
import Link from "next/link";
import LoginButton from "../LoginButton";
import Image from "next/image";

export default function Header() {
  const logo: string = "/images/logo.png";

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <Image src={logo} width={80} height={80} alt="Logo Meu board" />
        </Link>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/board">Meu board</Link>
        </nav>

        <LoginButton />
      </div>
    </header>
  );
}
