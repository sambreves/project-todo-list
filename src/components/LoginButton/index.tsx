import styles from "./styles.module.scss";
import { FcGoogle } from "react-icons/fc";
import { BsPersonCircle } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function LoginButton() {
  const { data: session } = useSession();

  const logoPerfil: string = "/images/logo-perfil.png";

  return session ? (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signOut()}
    >
      <div>
        <Image
          width={35}
          height={35}
          src={session.user?.image ? session.user.image : logoPerfil}
          alt="Foto do usuario"
        />
      </div>
      Olá, {session.user?.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signIn("google")}
    >
      <FcGoogle />
      Entrar com Google
    </button>
  );
}
