import { getSession } from "next-auth/react";
import Image from "next/image";
import styles from "./styles.module.scss";
import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { collection, doc, setDoc } from "firebase/firestore";
import db from "../../services/firebaseConnection";

interface UserProps {
  user: {
    name: string;
    email: string;
    image: string;
  };
}

export default function Donate({ user }: UserProps) {
  const imagePeopleWorking: string = "/images/people-working.png";
  const [vip, setVip] = useState(false);

  async function handleSaveDonate() {
    await setDoc(doc(db, "supporters", user.email), {
      email: user.email,
    }).then(() => setVip(true));
  }

  return (
    <main className={styles.container}>
      <Image src={imagePeopleWorking} width={450} height={350} alt="people working" />
      {vip && (
        <div className={styles.vip}>
          <Image
            width={50}
            height={50}
            src={user.image}
            alt="Foto de perfil do usuario"
          />
          <span>Parabéns você é um novo apoiador!</span>
        </div>
      )}
      <h1>Seja um apoiador deste projeto 🏆</h1>
      <h3>
        Contribua com apenas <span>R$ 1,00</span>
      </h3>
      <strong>Apareça na nossa home, tenha funcionalidades exclusivas.</strong>
      <PayPalButtons
        createOrder={async (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "1",
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          return actions.order?.capture().then(() => handleSaveDonate());
        }}
      />
    </main>
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

  const user = {
    email: session?.user.email,
    name: session?.user.name,
    image: session?.user.image,
  };

  return {
    props: {
      user,
    },
  };
}
