"use client";

import { Message, Spinner } from "@/components";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

const LoginContent = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const router = useRouter();
	const searchParams = useSearchParams();
	const submitFn = async (e: FormEvent) => {
		e.preventDefault();
		if (email && email.includes("@") && password) {
			setLoading(true);
			const data = await signIn("credentials", { email, password, redirect: false });
			if (data?.error) {
				setError(data.error);
				setLoading(false);
			} else if (!data?.error) {
				if (searchParams.get("redirect")) {
					router.replace(searchParams.get("redirect") as string);
				} else {
					router.replace("/");
				}
			}
		}
	};
	return (
		<div className="container mx-auto h-full p-10 md:p-20 grid place-items-center">
			<form method="POST" className="w-full md:w-3/4 xl:w-1/2 flex flex-col gap-6" onSubmit={submitFn}>
				{error && <Message type="error">{error}</Message>}
				<h1 className="text-4xl font-semibold text-center">Login</h1>
				<input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
				<p className="text-gray-500">
					Don't have an account?{" "}
					<Link href="/register" className="text-mainColor underline">
						Register
					</Link>
				</p>
				<button className="bg-mainColor w-full text-white py-3 cursor-pointer rounded-xl" type="submit" name="submit">
					{loading ? <Spinner size={24} /> : "Login"}
				</button>
			</form>
		</div>
	);
};

export default LoginContent;
