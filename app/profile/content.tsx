"use client";

import { ShowCard, Stat } from "@/components";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
	user: {
		_id: string;
		name: string;
		username: string;
		email: string;
		admin: boolean;
		date_joined: Date | string;
	};
	watchlist: {
		_id: string;
		name: string;
		image: string;
		type: string;
		rating: number;
	}[];
}

const ProfileContent = ({ user, watchlist }: Props) => {
	const router = useRouter();
	const logoutFn = async () => {
		await signOut({ redirect: false });
		router.replace("/login?redirect=/profile");
	};
	return (
		<div className="container py-4">
			{/* INFO */}
			<div className="my-6">
				<h3 className="text-2xl text-gray-300 flex justify-between items-center">
					@{user.username}
					<div className="flex gap-3 text-mainColor">
						{user.admin && (
							<Link href="admin" className="underline">
								Admin
							</Link>
						)}
						<button onClick={logoutFn} className="underline">
							Logout
						</button>
					</div>
				</h3>
				<h1 className="text-4xl font-semibold">
					{user.name}
					<span className="text-xl font-normal text-gray-300"> Member since {new Date(user.date_joined).toLocaleString("en-US", { month: "short" }) + " " + new Date(user.date_joined).getFullYear()}</span>
				</h1>
			</div>
			{/* OVERVIEW */}
			<div className="mt-6">
				<h1 className="text-4xl font-semibold">Overview</h1>
				{/* STATS */}
				<div className="flex mt-4 flex-wrap gap-5">
					<Stat name="Watchlist" number={watchlist.length} />
					<Stat name="Reviews" number={0} />
				</div>
			</div>
			{/* WATCHLIST */}
			<div>
				<h1 className="text-4xl font-semibold mt-6">Watchlist</h1>
				{/* GRID */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5 gap-6">
					{watchlist.map((show, idx) => (
						<ShowCard key={idx} {...show} />
					))}
				</div>
			</div>
		</div>
	);
};

export default ProfileContent;
