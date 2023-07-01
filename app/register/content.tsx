"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, useReducer, useState } from "react";

const RegisterContent = () => {
	const [name, setName] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	const submitFn = async (e: FormEvent) => {
		e.preventDefault();
		if (email && email.includes("@") && username && password && name) {
			setLoading(true);
			const config = {
				method: "POST",
				body: JSON.stringify({ name, email, username, password }),
			};
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, config);
			if (res.status === 200) {
				await signIn("credentials", { email, password, redirect: false });
				if (searchParams.get("redirect")) {
					router.replace(searchParams.get("redirect") as string);
				} else {
					router.replace("/");
				}
			}
			setLoading(false);
		}
	};
	return (
		<div className="container mx-auto h-full p-10 md:p-20 grid place-items-center">
			<form method="POST" className="w-full md:w-3/4 xl:w-1/2 flex flex-col gap-6" onSubmit={submitFn}>
				{/* {error && <Message type="error">{error}</Message>} */}
				<h1 className="text-4xl font-semibold text-center">Register</h1>
				<input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
				<input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
				<input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
				<p className="text-gray-500">
					Have an account?{" "}
					<Link href="/login" className="text-mainColor underline">
						Login
					</Link>
				</p>
				<button className="bg-mainColor w-full text-white py-3 cursor-pointer rounded-xl" type="submit" name="submit">
					{loading ? "Loading..." : "Register"}
				</button>
			</form>
		</div>
	);
};

export default RegisterContent;
