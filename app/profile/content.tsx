"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProfileContent = () => {
	const router = useRouter();
	const {data: session} = useSession();
	const logoutFn = async () => {
		await signOut({ redirect: false });
		router.replace("/login?redirect=/profile");
	};
	return (
		<div className="container">
			{session?.user?.admin && (
				<Link href="/admin" className="py-2 px-4 bg-mainColor rounded-lg">
					Admin
				</Link>
			)}
			<br />
			<br />
			<button onClick={() => logoutFn()} className="py-2 px-4 bg-mainColor rounded-lg">
				Logout
			</button>
		</div>
	);
};

export default ProfileContent;
