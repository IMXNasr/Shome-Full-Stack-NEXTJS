"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProfileContent = () => {
	const router = useRouter();
	const logoutFn = () => {
		signOut();
		router.replace("/");
	};
	return (
		<div className="container">
			<button onClick={logoutFn} className="py-2 px-4 bg-mainColor rounded-lg">
				Logout
			</button>
		</div>
	);
};

export default ProfileContent;
