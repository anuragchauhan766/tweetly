import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    provider: string;
    user: {
      id: string;
      username: string;
      access_token?: string;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    username: string;
    access_token?: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    username: string;
    access_token?: string;
    provider: string;
    id: string;
  }
}
