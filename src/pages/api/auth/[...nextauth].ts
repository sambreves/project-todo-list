import { collection, doc, getDocs, query, where } from "firebase/firestore";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import db from "../../../services/firebaseConnection";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token, user }) {
      try {
        const q = query(collection(db, "supporters"));
        const respDonate = await getDocs(q);
        const isSupporter: boolean =
          respDonate.docs[0].data().email === user.email ? true : false;
        return {
          ...session,
          supporter: isSupporter,
        };
      } catch (e) {
        return {
          ...session,
          supporter: false,
        };
      }
    },
  },
};

export default NextAuth(authOptions);
