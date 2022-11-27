import styles from "./styles.module.scss";
import { FcGoogle } from "react-icons/fc";
import { BsPersonCircle } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  console.log(session);

  return session ? (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signOut()}
    >
      <div>
        {/* <Image
          fill
          src={session.user.image}
          alt="Foto do usuario"
        /> */}
        <BsPersonCircle />
      </div>
      Olá, Samuel
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signIn()}
    >
      <FcGoogle />
      Entrar com Google
    </button>
  );
}
