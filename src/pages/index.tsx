import styles from "./styles.module.scss";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const imagePeopleWorking: string = "/images/people-working.png";

  return (
    <>
      <Head>
        <title>To Do List</title>
      </Head>
      <main className={styles.contentContainer}>
        <Image
          src={imagePeopleWorking}
          width={450}
          height={350}
          alt="people working"
        />
        <section className={styles.callToAction}>
          <h1>
            Uma ferramenta para seu dia a dia Escreva, planeje e organize-se..
          </h1>
          <p>
            <span>100% Gratuita</span> e online.
          </p>
        </section>
      </main>
    </>
  );
}
