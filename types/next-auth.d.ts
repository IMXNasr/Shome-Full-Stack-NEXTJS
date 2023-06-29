import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      name: string;
      username: string;
      email: string;
      admin: boolean;
      date_joined: Date | string;
    }
  }
}