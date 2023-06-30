import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getTitle } from "@/utils/functions";
import { redirect } from "next/navigation";
import ProfileContent from "./content";

export const metadata = {
	title: getTitle("Profile"),
};

const Profile = async () => {
	const session = await getServerSession(authOptions);
	if (!session) {
		return redirect("/");
	}
	return <ProfileContent />;
};

export default Profile;
