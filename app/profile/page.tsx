import { authOptions } from "@/utils/auth";
import { getTitle } from "@/utils/functions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ProfileContent from "./content";
import { Navbar } from "@/components";

export const metadata = {
	title: getTitle("Profile"),
};

const Profile = async () => {
	const session = await getServerSession(authOptions);
	if (!session) redirect("/");
	return (
		<>
			<Navbar />
			<ProfileContent />
		</>
	);
};

export default Profile;
