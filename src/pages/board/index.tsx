import styles from "./styles.module.scss";
import { FiPlus } from "react-icons/fi";
import Head from "next/head";
import { useState } from "react";

export default function Board() {
  const [input, setInput] = useState("");

  function handleAddTask() {
    //TODO code
  }

  return (
    <>
      <Head>
        <title>To do List</title>
      </Head>
      <main className={styles.container}>
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Write your tasks..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <FiPlus color="#17181f" />
          </button>
        </form>
        <h1>You have 2 tasks!</h1>
      </main>
    </>
  );
}
