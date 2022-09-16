// import NextAuth, { Account, Profile, Session, User } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "../../../lib/mongodb";
// import { JWT } from "next-auth/jwt";

// export default NextAuth({
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//     // ...add more providers here
//   ],

//   pages: {
//     signIn: "/auth/login",
//   },

//   session: {
//     maxAge: 2592000, /// 30d
//     strategy: "jwt",
//     updateAge: 86400, // cada día
//   },

//   secret: process.env.SECRET,

//   callbacks: {
//     async signIn({ user, account, profile, email, credentials }) {
//       if (!user?.role) {
//         user.role = "Client";
//       }
//       return true;
//     },
//     async jwt(
//       token: JWT,
//       user: User | undefined,
//       account: Account | undefined,
//       role: Profile | undefined,
//       isNewUser: boolean | undefined
//     ) {
//       if (account?.accessToken) {
//         token.accessToken = account.accessToken;
//       }
//       if (user?.role) {
//         token.role = user.role;
//       }

//       return token;
//     },
//     async session(session: Session, token: JWT) {
//       if (token?.accessToken) {
//         session.accessToken = token.accessToken;
//       }

//       if (token?.role) {
//         session.user!.role = token.role;
//       }

//       return session;
//     },
//   },
// });

// import NextAuth, {
//   Account,
//   NextAuthOptions,
//   Profile,
//   Session,
//   User,
// } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "../../../lib/mongodb";

// export const authOptions: NextAuthOptions = {
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//     // ...add more providers here
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/auth/login",
//   },

//   callbacks: {
//     async signIn({ user, account, profile, email, credentials }) {
//       if (!user?.role) {
//         user.role = "Client";
//       }
//       return true;
//     },
//     async session({ session, token, user }: any) {
//       session.user.username = session.user.name
//         .split(" ")
//         .join("")
//         .toLocaleLowerCase();
//       session.user.uid = token.sub;
//       return session;
//     },
//   },
// };

// export default NextAuth(authOptions);

import NextAuth, { Account, Profile, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import { JWT } from "next-auth/jwt";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],

  pages: {
    signIn: "/auth/login",
  },

  session: {
    maxAge: 2592000, /// 30d
    strategy: "jwt",
    updateAge: 86400, // cada día
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!user?.role) {
        user.role = "Client";
      }
      return true;
    },

    async session({ session, token }: any) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },

    async jwt(
      token: JWT,
      user?: User | undefined,
      account?: Account | undefined,
      profile?: Profile | undefined,
      isNewUser?: boolean | undefined
    ) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }

      return token;
    },
  },
  adapter: MongoDBAdapter(clientPromise),

  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_PUBLIC_SECRET,
});
