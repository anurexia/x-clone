import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // - this will add information in the current session
  callbacks: {
    async session({ token, session }) {
      // - add new property to session, split the name using the space, then join it again but this time all lowercase
      session.user.username = session.user.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();
      session.user.userId = token.sub;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
