import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

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
				const config = {
					method: "POST",
					body: JSON.stringify(credentials),
				};
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, config);
				const data = await res.json();
				if (res.status !== 200) throw new Error(data);
				return data;
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
