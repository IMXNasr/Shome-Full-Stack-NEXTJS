import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getTitle } from "@/utils/functions";
import { notFound, redirect } from "next/navigation";
import ProfileContent from "./content";

export const metadata = {
	title: getTitle("Profile"),
};

const Profile = async () => {
	const session = await getServerSession(authOptions);
	if (!session) {
		return redirect("/login?redirect=/profile");
	}
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/watchlist/${session.user._id}`, { cache: "no-store" });
	const data = await res.json();
	if (res.status !== 200) notFound();
	return <ProfileContent user={session.user} watchlist={data} />;
};

export default Profile;
