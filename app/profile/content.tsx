"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProfileContent = () => {
	const router = useRouter();
	const signOutFn = () => {
		signOut();
		router.replace("/");
	};
	return (
		<div className="container">
			<button className="bg-mainColor px-4 py-2 rounded-md" onClick={signOutFn}>
				Logout
			</button>
		</div>
	);
};

export default ProfileContent;
