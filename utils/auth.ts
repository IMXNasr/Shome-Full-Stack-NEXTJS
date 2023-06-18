import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "Email" },
				password: { label: "Password", type: "password", placeholder: "Password" },
			},
			authorize: async (credentials) => {
				const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, credentials);
				if (data.error) throw new Error(data.error);
				if (data.success) return data.user;
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			return { ...token, ...user };
		},
		session: async ({ session, token }: any) => {
			session.user = token;
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
};
