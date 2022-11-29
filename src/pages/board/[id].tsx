import { format } from "date-fns";
import { collection, DocumentData, getDocs, query } from "firebase/firestore";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { FiCalendar } from "react-icons/fi";
import db from "../../services/firebaseConnection";
import styles from "./task.module.scss";

type Task = {
  id: string;
  created: string | Date;
  createdFormated?: string;
  task: string;
  email: string;
  name: string;
};

interface TaskListProps {
  data: string;
}

export default function Task({ data }: TaskListProps) {
  const task: Task = JSON.parse(data);

  return (
    <>
      <Head>
        <title>To Do List</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.actions}>
          <div>
            <FiCalendar size={30} color="#FFF" />
            <span>Tarefa criada:</span>
            <time>{task.createdFormated}</time>
          </div>
        </div>
        <p>{task.task}</p>
      </div>
    </>
  );
}

export async function getServerSideProps({ req, params }: { req: any; params: any }) {
  const { id } = params;
  const session: any = await getSession({ req });

  if (!session?.supporter) {
    return {
      redirect: {
        destination: "/board",
        permanent: false,
      },
    };
  }

  const q = query(collection(db, "tasks"));
  const tasks: any = await getDocs(q);
  const data: DocumentData | undefined = tasks.docs
    .find((doc: any) => doc.id === id)
    ?.data();

  //createdFormated: format(doc.data().created.toDate(), "dd MMMM yyyy")

  if (!data) {
    return {
      redirect: {
        destination: "/board",
        permanent: false,
      },
    };
  }

  data.createdFormated = format(data.created.toDate(), "dd MMMM yyyy");

  return {
    props: {
      data: JSON.stringify(data),
    },
  };
}
