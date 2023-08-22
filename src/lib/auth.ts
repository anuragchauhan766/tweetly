import type { NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import GitHubProvider, { GithubProfile } from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },

      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          username: profile.email.split("@")[0],
          email: profile.email,
          name: profile.name,
          image: profile.picture,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile(profile: GithubProfile) {
        return {
          id: profile.id.toString(),
          username: profile.email?.split("@")[0] as string,
          email: profile.email,
          image: profile.avatar_url,
          name: profile.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        token.id = user.id;
        token.provider = account.provider;
        token.access_token = account.access_token;
        token.username = user.username;
      }
      return token;
    },
    session({ session, token }) {
      session.user.username = token.username;
      session.provider = token.provider;
      session.user.access_token = token.access_token;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
