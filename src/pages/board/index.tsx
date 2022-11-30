import styles from "./styles.module.scss";
import { FiCalendar, FiClock, FiEdit2, FiPlus, FiTrash, FiX } from "react-icons/fi";
import Head from "next/head";
import { useState, FormEvent } from "react";
import db from "../../services/firebaseConnection";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  orderBy,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { format } from "date-fns";
import Link from "next/link";
import { SupportButton } from "../../components/SupportButton";

type TaskList = {
  id: string;
  created: string | Date;
  createdFormated?: string;
  task: string;
  email: string;
  name: string;
};

interface BoardProps {
  user: {
    name: string;
    email: string;
    vip: boolean;
  };
  data: string;
}

export default function Board({ user, data }: BoardProps) {
  const [input, setInput] = useState("");
  const [taskList, setTaskList] = useState<TaskList[]>(JSON.parse(data));
  const [taskEdit, setTaskEdit] = useState<TaskList | null>(null);

  console.log(user);

  //Add tasks to Firestore Database
  async function handleAddTask(e: FormEvent) {
    e.preventDefault();

    if (input === "") {
      alert("Add some tasks!");
      return;
    }

    if (taskEdit) {
      try {
        const taskRef = doc(db, "tasks", taskEdit.id);
        await setDoc(taskRef, {
          task: input,
          created: new Date(),
        }).then(() => {
          const data = taskList;
          const taskIndex = taskList.findIndex((task) => task.id === taskEdit.id);

          data[taskIndex].task = input;

          setTaskList(data);
          setTaskEdit(null);
          setInput("");
        });
        return;
      } catch (error) {
        return;
      }
    }

    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        created: new Date(),
        task: input,
        email: user.email,
        name: user.name,
      }).then((doc) => {
        const data: TaskList = {
          id: doc.id,
          created: new Date(),
          createdFormated: format(new Date(), "dd MMMM yyyy"),
          task: input,
          email: user.email,
          name: user.name,
        };

        setTaskList([...taskList, data]);
        setInput("");
      });

      console.log("Document registered with sucess!");
    } catch (e) {
      console.error("Error adding document : ", e);
    }
  }

  //Delete tasks
  async function handleDelete(id: string) {
    try {
      await deleteDoc(doc(db, "tasks", id));
      const newTasks = taskList.filter((task) => task.id !== id);
      setTaskList(newTasks);
    } catch (e) {
      return;
    }
  }

  //Edit tasks
  function handleEditTask(task: TaskList) {
    setTaskEdit(task);
    setInput(task.task);
  }

  //Cancel Edit
  function handleCancelEdit() {
    setInput("");
    setTaskEdit(null);
  }

  return (
    <>
      <Head>
        <title>To do List</title>
      </Head>

      <main className={styles.container}>
        {taskEdit && (
          <span className={styles.warnText}>
            <button onClick={handleCancelEdit}>
              <FiX size={30} color="#FF3636" />
            </button>
            Você está editando uma tarefa!
          </span>
        )}

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

        <h1>
          Você tem {taskList.length} {taskList.length === 1 ? "Tarefa" : "Tarefas"}!
        </h1>

        <section>
          {taskList.map((task) => (
            <article key={task.id} className={styles.taskList}>
              <Link href={`/board/${task.id}`}>
                <p>{task.task}</p>
              </Link>
              <div className={styles.actions}>
                <div>
                  <div>
                    <FiCalendar size={20} color="#FFB800" />
                    <time>{task.createdFormated}</time>
                  </div>
                  {user.vip && (
                    <button onClick={() => handleEditTask(task)}>
                      <FiEdit2 size={20} color="#FFF" />
                      <span>Editar</span>
                    </button>
                  )}
                </div>
                <button onClick={() => handleDelete(task.id)}>
                  <FiTrash size={20} color="#FF3636" />
                  <span>Excluir</span>
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>

      {user.vip && (
        <div className={styles.vipContainer}>
          <h3>Obrigado por apoiar esse projeto.</h3>
          <div>
            <FiClock size={28} color="#FFF" />
          </div>
        </div>
      )}

      <SupportButton />
    </>
  );
}

export async function getServerSideProps({ req }: { req: any }) {
  const session: any = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const q = query(
    collection(db, "tasks"),
    where("email", "==", session?.user.email),
    orderBy("created", "asc"),
  );
  const tasks = await getDocs(q);
  const data = JSON.stringify(
    tasks.docs.map((doc) => {
      return {
        id: doc.id,
        createdFormated: format(doc.data().created.toDate(), "dd MMMM yyyy"),
        ...doc.data(),
      };
    }),
  );

  const user = {
    name: session?.user.name,
    email: session?.user.email,
    vip: session?.supporter,
  };

  return {
    props: {
      user,
      data,
    },
  };
}
