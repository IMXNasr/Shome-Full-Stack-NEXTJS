import { getTitle } from "@/utils/functions";
import AddActingContent from "./content";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
	title: getTitle("Admin Acting"),
};

const AddActingPage = async () => {
	const session = await getServerSession(authOptions);
	if (!session) {
		return redirect("/login?redirect=/admin/acting");
	} else if (!session.user.admin) {
		return redirect("/");
	}
	const shows = await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shows?type=all`)).json();
	const actors = await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/actors`)).json();
	return <AddActingContent shows={shows} actors={actors} />;
};

export default AddActingPage;
