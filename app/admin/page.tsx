import { IoTv } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { GiSwordman } from "react-icons/gi";
import { MdAddReaction } from "react-icons/md";
import { ShowCard } from "@/components/admin";
import { getTitle } from "@/utils/functions";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
	title: getTitle("Admin"),
};

const Admin = async () => {
	const session = await getServerSession(authOptions);
	if (!session) {
		return redirect("/login?redirect=/admin");
	} else if (!session.user.admin) {
		return redirect("/");
	}
	const iconSize = 25;
	return (
		<main className="container mt-6">
			<h1 className="text-3xl font-bold">All Databases:</h1>
			{/* Grid */}
			<div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2">
				<ShowCard icon={<FaUser size={iconSize} />} name="Users" link="/admin/users" />
				<ShowCard icon={<IoTv size={iconSize} />} name="Shows" link="/admin/shows" />
				<ShowCard icon={<GiSwordman size={iconSize} />} name="Actors" link="/admin/actors" />
				<ShowCard icon={<MdAddReaction size={iconSize} />} name="Acting" link="/admin/acting" />
			</div>
		</main>
	);
};

export default Admin;
